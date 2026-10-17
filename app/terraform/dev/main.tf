############################################################
# Lingkungan DEVELOPMENT - GitHub-hosted runner (SSH inbound)
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
      Environment = "development"
      ManagedBy   = "terraform"
    }
  }
}

# ---------- Data source ----------
data "aws_availability_zones" "available" {
  state = "available"
}

# AMI Ubuntu Server 22.04 LTS (Canonical)
data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"]

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
resource "aws_vpc" "dev" {
  cidr_block           = var.vpc_cidr
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = { Name = "${var.project_name}-vpc" }
}

resource "aws_internet_gateway" "dev" {
  vpc_id = aws_vpc.dev.id

  tags = { Name = "${var.project_name}-igw" }
}

resource "aws_subnet" "public" {
  vpc_id                  = aws_vpc.dev.id
  cidr_block              = var.public_subnet_cidr
  availability_zone       = data.aws_availability_zones.available.names[0]
  map_public_ip_on_launch = true

  tags = { Name = "${var.project_name}-public-subnet" }
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.dev.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.dev.id
  }

  tags = { Name = "${var.project_name}-public-rt" }
}

resource "aws_route_table_association" "public" {
  subnet_id      = aws_subnet.public.id
  route_table_id = aws_route_table.public.id
}

# ---------- Security Group: dev-sg ----------
resource "aws_security_group" "dev" {
  name        = "dev-sg"
  description = "Security group server Dev: SSH (GitHub runner) dan aplikasi"
  vpc_id      = aws_vpc.dev.id

  ingress {
    description = "SSH dari GitHub-hosted runner (IP dinamis)"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = var.ssh_allowed_cidrs
  }

  ingress {
    description = "Akses aplikasi portofolio"
    from_port   = var.app_port
    to_port     = var.app_port
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    description = "Semua trafik keluar (apt, Docker Hub)"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = { Name = "dev-sg" }
}

# ---------- Key pair (kunci privat TIDAK disimpan di state) ----------
resource "aws_key_pair" "dev" {
  key_name   = "${var.project_name}-key"
  public_key = file(pathexpand(var.public_key_path))
}

# ---------- EC2: Dev App Server ----------
resource "aws_instance" "dev" {
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = var.instance_type
  subnet_id              = aws_subnet.public.id
  vpc_security_group_ids = [aws_security_group.dev.id]
  key_name               = aws_key_pair.dev.key_name
  user_data              = file("${path.module}/scripts/user-data-dev.sh")

  user_data_replace_on_change = true

  metadata_options {
    http_tokens   = "required" # IMDSv2
    http_endpoint = "enabled"
  }

  root_block_device {
    volume_type           = "gp3"
    volume_size           = var.root_volume_size
    encrypted             = true
    delete_on_termination = true
  }

  tags = { Name = "${var.project_name}-app-server" }

  depends_on = [aws_internet_gateway.dev]
}

# Elastic IP agar IP publik tetap (nilai SSH_HOST di GitHub tidak berubah)
resource "aws_eip" "dev" {
  domain   = "vpc"
  instance = aws_instance.dev.id

  tags = { Name = "${var.project_name}-eip" }

  depends_on = [aws_internet_gateway.dev]
}
