#!/bin/bash
# User Data - EC2 Server Deployment (Ubuntu 22.04)
# File ini diproses templatefile(): hanya variabel deploy_public_key yang disubstitusi.
set -euxo pipefail
exec > >(tee -a /var/log/user-data.log) 2>&1

export DEBIAN_FRONTEND=noninteractive
export NEEDRESTART_MODE=a

# 1. Paket dasar
apt-get update -y
apt-get upgrade -y
apt-get install -y curl ca-certificates gnupg lsb-release fail2ban

# 2. Docker Engine + Compose plugin
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
chmod a+r /etc/apt/keyrings/docker.asc
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" > /etc/apt/sources.list.d/docker.list
apt-get update -y
apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
systemctl enable --now docker

# 3. Pengguna ubuntu boleh memakai Docker
usermod -aG docker ubuntu

# 4. Direktori kerja
mkdir -p /opt/portofolio
chown ubuntu:ubuntu /opt/portofolio

# 5. Izinkan kunci deploy milik Runner masuk lewat SSH
install -d -m 700 -o ubuntu -g ubuntu /home/ubuntu/.ssh
echo "${deploy_public_key}" >> /home/ubuntu/.ssh/authorized_keys
chown ubuntu:ubuntu /home/ubuntu/.ssh/authorized_keys
chmod 600 /home/ubuntu/.ssh/authorized_keys

# 6. Hardening SSH
systemctl enable --now fail2ban

# 7. Penanda selesai
touch /var/lib/cloud/instance/user-data-finished
echo "User Data Deploy selesai: $(date)"
