output "runner_public_ip" {
  description = "IP publik EC2 Runner"
  value       = aws_eip.runner.public_ip
}

output "deploy_private_ip" {
  description = "IP privat Server Deployment (isi ke variabel DEPLOY_HOST)"
  value       = aws_instance.deploy.private_ip
}

output "deploy_public_ip" {
  description = "IP publik Server Deployment (isi ke variabel DEPLOY_PUBLIC_IP)"
  value       = aws_eip.deploy.public_ip
}

output "staging_url" {
  value = "http://${aws_eip.deploy.public_ip}:3001"
}

output "production_url" {
  value = "http://${aws_eip.deploy.public_ip}:3000"
}

output "ssh_runner_command" {
  description = "Perintah SSH ke EC2 Runner"
  value       = "ssh -i ${trimsuffix(var.developer_public_key_path, ".pub")} ubuntu@${aws_eip.runner.public_ip}"
}
