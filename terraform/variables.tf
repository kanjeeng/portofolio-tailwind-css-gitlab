variable "aws_region" {
  description = "Region AWS"
  type        = string
  default     = "ap-southeast-1"
}

variable "project_name" {
  description = "Awalan nama untuk semua resource"
  type        = string
  default     = "portofolio-cicd"
}

variable "vpc_cidr" {
  description = "CIDR VPC"
  type        = string
  default     = "10.2.0.0/16"
}

variable "public_subnet_cidr" {
  description = "CIDR subnet publik"
  type        = string
  default     = "10.2.1.0/24"
}

variable "developer_cidr" {
  description = "IP publik pengembang dalam format x.x.x.x/32 (untuk SSH ke Runner)"
  type        = string

  validation {
    condition     = can(cidrhost(var.developer_cidr, 0)) && can(regex("/32$", var.developer_cidr)) && var.developer_cidr != "0.0.0.0/0"
    error_message = "developer_cidr harus berupa satu alamat IP (/32) dan tidak boleh 0.0.0.0/0."
  }
}

variable "developer_public_key_path" {
  description = "Path kunci publik pengembang -> Runner"
  type        = string
  default     = "~/.ssh/gitlab-infra-runner.pub"
}

variable "deploy_public_key_path" {
  description = "Path kunci publik deploy (Runner -> Server Deployment)"
  type        = string
  default     = "~/.ssh/gitlab-infra-deploy.pub"
}

variable "runner_instance_type" {
  description = "Tipe instans EC2 Runner"
  type        = string
  default     = "t3.small"
}

variable "deploy_instance_type" {
  description = "Tipe instans EC2 Server Deployment"
  type        = string
  default     = "t3.micro"
}

variable "runner_volume_size" {
  description = "Ukuran EBS gp3 Runner (GiB)"
  type        = number
  default     = 25
}

variable "deploy_volume_size" {
  description = "Ukuran EBS gp3 Server Deployment (GiB)"
  type        = number
  default     = 20
}
