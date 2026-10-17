############################################################
# Lingkungan STAGING - Self-hosted runner (outbound polling
# + SSH internal via IP privat)
# Region: ap-southeast-1
############################################################

terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project     = "portofolio-tailwind-css"
      Environment = "staging"
      ManagedBy   = "terraform"
    }
  }
}

data "aws_availability_zones" "available" {
  state = "available"
}

data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"] # Canonical

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

# ---------- Jaringan ----------
resource "aws_vpc" "staging" {
  cidr_block           = var.vpc_cidr
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = { Name = "${var.project_name}-vpc" }
}

resource "aws_internet_gateway" "staging" {
  vpc_id = aws_vpc.staging.id

  tags = { Name = "${var.project_name}-igw" }
}

resource "aws_subnet" "public" {
  vpc_id                  = aws_vpc.staging.id
  cidr_block              = var.public_subnet_cidr
  availability_zone       = data.aws_availability_zones.available.names[0]
  map_public_ip_on_launch = true

  tags = { Name = "${var.project_name}-public-subnet" }
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.staging.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.staging.id
  }

  tags = { Name = "${var.project_name}-public-rt" }
}

resource "aws_route_table_association" "public" {
  subnet_id      = aws_subnet.public.id
  route_table_id = aws_route_table.public.id
}

# ---------- Security Groups ----------
# Dibuat tanpa aturan inline; aturan dipasang lewat resource terpisah
# agar tidak terjadi dependensi melingkar (runner-sg <-> stage-sg).
resource "aws_security_group" "runner" {
  name        = "runner-sg"
  description = "SG Agen Runner: SSH dari pengembang, keluar HTTPS"
  vpc_id      = aws_vpc.staging.id

  tags = { Name = "runner-sg" }
}

resource "aws_security_group" "stage" {
  name        = "stage-sg"
  description = "SG Server Staging: SSH hanya dari Runner, aplikasi port 3000"
  vpc_id      = aws_vpc.staging.id

  tags = { Name = "stage-sg" }
}

# --- runner-sg: inbound ---
resource "aws_vpc_security_group_ingress_rule" "runner_ssh_dev" {
  security_group_id = aws_security_group.runner.id
  description       = "SSH hanya dari IP pengembang"
  ip_protocol       = "tcp"
  from_port         = 22
  to_port           = 22
  cidr_ipv4         = var.developer_ip_cidr
}

# --- runner-sg: outbound ---
resource "aws_vpc_security_group_egress_rule" "runner_https" {
  security_group_id = aws_security_group.runner.id
  description       = "HTTPS ke Internet (GitHub API, Docker Hub, repo Docker)"
  ip_protocol       = "tcp"
  from_port         = 443
  to_port           = 443
  cidr_ipv4         = "0.0.0.0/0"
}

resource "aws_vpc_security_group_egress_rule" "runner_http" {
  security_group_id = aws_security_group.runner.id
  description       = "HTTP ke Internet (mirror APT Ubuntu)"
  ip_protocol       = "tcp"
  from_port         = 80
  to_port           = 80
  cidr_ipv4         = "0.0.0.0/0"
}

resource "aws_vpc_security_group_egress_rule" "runner_ssh_to_stage" {
  security_group_id            = aws_security_group.runner.id
  description                  = "SSH internal menuju Server Staging (deploy)"
  ip_protocol                  = "tcp"
  from_port                    = 22
  to_port                      = 22
  referenced_security_group_id = aws_security_group.stage.id
}

# --- stage-sg: inbound ---
resource "aws_vpc_security_group_ingress_rule" "stage_ssh_from_runner" {
  security_group_id            = aws_security_group.stage.id
  description                  = "SSH hanya dari Agen Runner (IP privat internal)"
  ip_protocol                  = "tcp"
  from_port                    = 22
  to_port                      = 22
  referenced_security_group_id = aws_security_group.runner.id
}

resource "aws_vpc_security_group_ingress_rule" "stage_app" {
  security_group_id = aws_security_group.stage.id
  description       = "Akses aplikasi portofolio"
  ip_protocol       = "tcp"
  from_port         = var.app_port
  to_port           = var.app_port
  cidr_ipv4         = "0.0.0.0/0"
}

# --- stage-sg: outbound (pull image Docker Hub, apt) ---
resource "aws_vpc_security_group_egress_rule" "stage_all" {
  security_group_id = aws_security_group.stage.id
  description       = "Trafik keluar (pull image, update paket)"
  ip_protocol       = "-1"
  cidr_ipv4         = "0.0.0.0/0"
}

# ---------- Key pair (kunci privat tidak masuk Terraform state) ----------
resource "aws_key_pair" "runner" {
  key_name   = "${var.project_name}-runner-key"
  public_key = file(pathexpand(var.runner_public_key_path))
}

resource "aws_key_pair" "deploy" {
  key_name   = "${var.project_name}-deploy-key"
  public_key = file(pathexpand(var.deploy_public_key_path))
}

# ---------- EC2 1: Agen Runner ----------
resource "aws_instance" "runner" {
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = var.runner_instance_type
  subnet_id              = aws_subnet.public.id
  vpc_security_group_ids = [aws_security_group.runner.id]
  key_name               = aws_key_pair.runner.key_name
  user_data              = file("${path.module}/scripts/user-data-runner.sh")

  user_data_replace_on_change = true

  metadata_options {
    http_tokens   = "required"
    http_endpoint = "enabled"
  }

  root_block_device {
    volume_type           = "gp3"
    volume_size           = var.runner_volume_size
    encrypted             = true
    delete_on_termination = true
  }

  tags = { Name = "${var.project_name}-runner" }

  depends_on = [aws_internet_gateway.staging]
}

# ---------- EC2 2: Server Aplikasi Staging ----------
resource "aws_instance" "stage" {
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = var.stage_instance_type
  subnet_id              = aws_subnet.public.id
  vpc_security_group_ids = [aws_security_group.stage.id]
  key_name               = aws_key_pair.deploy.key_name
  user_data              = file("${path.module}/scripts/user-data-stage.sh")

  user_data_replace_on_change = true

  metadata_options {
    http_tokens   = "required"
    http_endpoint = "enabled"
  }

  root_block_device {
    volume_type           = "gp3"
    volume_size           = var.stage_volume_size
    encrypted             = true
    delete_on_termination = true
  }

  tags = { Name = "${var.project_name}-app-server" }

  depends_on = [aws_internet_gateway.staging]
}

# Elastic IP: IP publik tetap untuk Runner (SSH pengembang) dan Staging (akses pengguna)
resource "aws_eip" "runner" {
  domain   = "vpc"
  instance = aws_instance.runner.id

  tags = { Name = "${var.project_name}-runner-eip" }

  depends_on = [aws_internet_gateway.staging]
}

resource "aws_eip" "stage" {
  domain   = "vpc"
  instance = aws_instance.stage.id

  tags = { Name = "${var.project_name}-app-eip" }

  depends_on = [aws_internet_gateway.staging]
}
