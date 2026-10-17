# Grup keamanan dibuat kosong dahulu; aturan dibuat sebagai resource terpisah
# agar tidak terjadi circular dependency (kedua grup saling merujuk).

resource "aws_security_group" "runner" {
  name        = "${var.project_name}-runner-sg"
  description = "Security group untuk EC2 GitLab Runner"
  vpc_id      = aws_vpc.main.id

  tags = { Name = "${var.project_name}-runner-sg" }
}

resource "aws_security_group" "deploy" {
  name        = "${var.project_name}-deploy-sg"
  description = "Security group untuk EC2 Server Deployment"
  vpc_id      = aws_vpc.main.id

  tags = { Name = "${var.project_name}-deploy-sg" }
}

# ---------------- runner-sg ----------------
resource "aws_vpc_security_group_ingress_rule" "runner_ssh_developer" {
  security_group_id = aws_security_group.runner.id
  description       = "SSH hanya dari IP pengembang"
  cidr_ipv4         = var.developer_cidr
  from_port         = 22
  to_port           = 22
  ip_protocol       = "tcp"
}

resource "aws_vpc_security_group_egress_rule" "runner_https" {
  security_group_id = aws_security_group.runner.id
  description       = "HTTPS ke GitLab, registry, dan repositori paket"
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 443
  to_port           = 443
  ip_protocol       = "tcp"
}

resource "aws_vpc_security_group_egress_rule" "runner_http" {
  security_group_id = aws_security_group.runner.id
  description       = "HTTP untuk mirror APT"
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 80
  to_port           = 80
  ip_protocol       = "tcp"
}

resource "aws_vpc_security_group_egress_rule" "runner_ssh_to_deploy" {
  security_group_id            = aws_security_group.runner.id
  description                  = "SSH ke Server Deployment (deploy-sg)"
  referenced_security_group_id = aws_security_group.deploy.id
  from_port                    = 22
  to_port                      = 22
  ip_protocol                  = "tcp"
}

# ---------------- deploy-sg ----------------
resource "aws_vpc_security_group_ingress_rule" "deploy_ssh_from_runner" {
  security_group_id            = aws_security_group.deploy.id
  description                  = "SSH hanya dari runner-sg"
  referenced_security_group_id = aws_security_group.runner.id
  from_port                    = 22
  to_port                      = 22
  ip_protocol                  = "tcp"
}

resource "aws_vpc_security_group_ingress_rule" "deploy_app_production" {
  security_group_id = aws_security_group.deploy.id
  description       = "Aplikasi production"
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 3000
  to_port           = 3000
  ip_protocol       = "tcp"
}

resource "aws_vpc_security_group_ingress_rule" "deploy_app_staging" {
  security_group_id = aws_security_group.deploy.id
  description       = "Aplikasi staging"
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 3001
  to_port           = 3001
  ip_protocol       = "tcp"
}

resource "aws_vpc_security_group_egress_rule" "deploy_all" {
  security_group_id = aws_security_group.deploy.id
  description       = "Semua egress (pull image dan update paket)"
  cidr_ipv4         = "0.0.0.0/0"
  ip_protocol       = "-1"
}
