output "dev_public_ip" {
  description = "IP publik server Dev -> isi ke Environment variable SSH_HOST (Development)"
  value       = aws_eip.dev.public_ip
}

output "dev_ssh_command" {
  description = "Perintah SSH untuk mengakses server Dev"
  value       = "ssh -i ~/.ssh/aws-infra-dev ubuntu@${aws_eip.dev.public_ip}"
}

output "dev_app_url" {
  description = "URL aplikasi Dev"
  value       = "http://${aws_eip.dev.public_ip}:${var.app_port}"
}

output "vpc_id" {
  description = "ID VPC Development"
  value       = aws_vpc.dev.id
}
