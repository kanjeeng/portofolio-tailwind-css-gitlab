output "runner_public_ip" {
  description = "IP publik EC2 Runner (untuk SSH pengembang)"
  value       = aws_eip.runner.public_ip
}

output "runner_ssh_command" {
  description = "Perintah SSH ke EC2 Runner"
  value       = "ssh -i ~/.ssh/aws-infra-staging-runner ubuntu@${aws_eip.runner.public_ip}"
}

output "stage_private_ip" {
  description = "IP privat Server Staging -> isi ke Environment variable SSH_HOST (Staging)"
  value       = aws_instance.stage.private_ip
}

output "stage_public_ip" {
  description = "IP publik Server Staging (akses pengguna)"
  value       = aws_eip.stage.public_ip
}

output "stage_app_url" {
  description = "URL aplikasi Staging"
  value       = "http://${aws_eip.stage.public_ip}:${var.app_port}"
}

output "vpc_id" {
  description = "ID VPC Staging"
  value       = aws_vpc.staging.id
}
