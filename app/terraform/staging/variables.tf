variable "aws_region" {
  description = "Region AWS"
  type        = string
  default     = "ap-southeast-1"
}

variable "project_name" {
  description = "Prefix penamaan resource"
  type        = string
  default     = "aws-infra-staging"
}

variable "vpc_cidr" {
  description = "CIDR block VPC Staging"
  type        = string
  default     = "10.1.0.0/16"
}

variable "public_subnet_cidr" {
  description = "CIDR block subnet publik Staging"
  type        = string
  default     = "10.1.1.0/24"
}

variable "runner_instance_type" {
  description = "Tipe instans EC2 Runner (t2.micro / t3.micro)"
  type        = string
  default     = "t3.micro"
}

variable "stage_instance_type" {
  description = "Tipe instans EC2 Server Staging (t2.micro / t3.micro)"
  type        = string
  default     = "t3.micro"
}

variable "runner_volume_size" {
  description = "Ukuran root volume Runner (GiB); runner menyimpan layer image Docker"
  type        = number
  default     = 25
}

variable "stage_volume_size" {
  description = "Ukuran root volume Server Staging (GiB)"
  type        = number
  default     = 20
}

variable "app_port" {
  description = "Port aplikasi portofolio"
  type        = number
  default     = 3000
}

variable "developer_ip_cidr" {
  description = "IP publik pengembang dalam format CIDR, contoh 203.0.113.10/32 (untuk SSH ke Runner)"
  type        = string

  validation {
    condition     = can(cidrhost(var.developer_ip_cidr, 0)) && var.developer_ip_cidr != "0.0.0.0/0"
    error_message = "developer_ip_cidr harus berupa CIDR yang valid dan tidak boleh 0.0.0.0/0."
  }
}

variable "runner_public_key_path" {
  description = "Kunci publik SSH pengembang -> untuk login ke EC2 Runner"
  type        = string
  default     = "~/.ssh/aws-infra-staging-runner.pub"
}

variable "deploy_public_key_path" {
  description = "Kunci publik SSH deploy -> dipasang di EC2 Staging (kunci privatnya disimpan di GitHub Secret)"
  type        = string
  default     = "~/.ssh/aws-infra-staging-deploy.pub"
}
