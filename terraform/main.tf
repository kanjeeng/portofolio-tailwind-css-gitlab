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
      Project   = var.project_name
      ManagedBy = "terraform"
    }
  }
}

data "aws_availability_zones" "available" {
  state = "available"
}

# AMI Ubuntu Server 22.04 LTS terbaru (publisher: Canonical)
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

# ---------------- Jaringan ----------------
resource "aws_vpc" "main" {
  cidr_block           = var.vpc_cidr
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = { Name = "${var.project_name}-vpc" }
}

resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.main.id

  tags = { Name = "${var.project_name}-igw" }
}

resource "aws_subnet" "public" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = var.public_subnet_cidr
  availability_zone       = data.aws_availability_zones.available.names[0]
  map_public_ip_on_launch = true

  tags = { Name = "${var.project_name}-public-subnet" }
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }

  tags = { Name = "${var.project_name}-public-rt" }
}

resource "aws_route_table_association" "public" {
  subnet_id      = aws_subnet.public.id
  route_table_id = aws_route_table.public.id
}

# ---------------- Key pair (hanya kunci publik) ----------------
resource "aws_key_pair" "developer" {
  key_name   = "${var.project_name}-key"
  public_key = file(pathexpand(var.developer_public_key_path))
}

# ---------------- EC2 #1: GitLab Runner ----------------
resource "aws_instance" "runner" {
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = var.runner_instance_type
  subnet_id              = aws_subnet.public.id
  vpc_security_group_ids = [aws_security_group.runner.id]
  key_name               = aws_key_pair.developer.key_name

  user_data                   = file("${path.module}/scripts/user-data-runner.sh")
  user_data_replace_on_change = true

  metadata_options {
    http_endpoint               = "enabled"
    http_tokens                 = "required" # IMDSv2 wajib
    http_put_response_hop_limit = 1
  }

  root_block_device {
    volume_type           = "gp3"
    volume_size           = var.runner_volume_size
    encrypted             = true
    delete_on_termination = true
  }

  tags = { Name = "${var.project_name}-runner" }
}

# ---------------- EC2 #2: Server Deployment ----------------
resource "aws_instance" "deploy" {
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = var.deploy_instance_type
  subnet_id              = aws_subnet.public.id
  vpc_security_group_ids = [aws_security_group.deploy.id]
  key_name               = aws_key_pair.developer.key_name

  # Kunci publik deploy disuntikkan ke authorized_keys lewat templatefile
  user_data = templatefile("${path.module}/scripts/user-data-deploy.sh", {
    deploy_public_key = trimspace(file(pathexpand(var.deploy_public_key_path)))
  })
  user_data_replace_on_change = true

  metadata_options {
    http_endpoint               = "enabled"
    http_tokens                 = "required"
    http_put_response_hop_limit = 1
  }

  root_block_device {
    volume_type           = "gp3"
    volume_size           = var.deploy_volume_size
    encrypted             = true
    delete_on_termination = true
  }

  tags = { Name = "${var.project_name}-deploy" }
}

# ---------------- Elastic IP ----------------
resource "aws_eip" "runner" {
  domain     = "vpc"
  instance   = aws_instance.runner.id
  depends_on = [aws_internet_gateway.igw]

  tags = { Name = "${var.project_name}-runner-eip" }
}

resource "aws_eip" "deploy" {
  domain     = "vpc"
  instance   = aws_instance.deploy.id
  depends_on = [aws_internet_gateway.igw]

  tags = { Name = "${var.project_name}-deploy-eip" }
}
