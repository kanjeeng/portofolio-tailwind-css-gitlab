variable "aws_region" {
  description = "Region AWS tempat seluruh resource dibuat"
  type        = string
  default     = "ap-southeast-1"
}

variable "project_name" {
  description = "Prefix penamaan resource"
  type        = string
  default     = "aws-infra-dev"
}

variable "vpc_cidr" {
  description = "CIDR block VPC Development"
  type        = string
  default     = "10.0.0.0/16"
}

variable "public_subnet_cidr" {
  description = "CIDR block subnet publik Development"
  type        = string
  default     = "10.0.1.0/24"
}

variable "instance_type" {
  description = "Tipe instans EC2 (t2.micro / t3.micro)"
  type        = string
  default     = "t3.micro"
}

variable "root_volume_size" {
  description = "Ukuran root volume (GiB)"
  type        = number
  default     = 20
}

variable "app_port" {
  description = "Port aplikasi portofolio (Next.js)"
  type        = number
  default     = 3000
}

variable "ssh_allowed_cidrs" {
  description = <<-EOT
    CIDR yang boleh mengakses SSH (port 22). Karena IP GitHub-hosted runner
    bersifat dinamis, nilai default 0.0.0.0/0 diperlukan agar pipeline berjalan.
    Autentikasi tetap hanya memakai kunci SSH (tanpa password).
  EOT
  type        = list(string)
  default     = ["0.0.0.0/0"]
}

variable "public_key_path" {
  description = "Lokasi kunci publik SSH yang didaftarkan sebagai key pair EC2 Dev"
  type        = string
  default     = "~/.ssh/aws-infra-dev.pub"
}
