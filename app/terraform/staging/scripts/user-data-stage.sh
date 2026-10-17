#!/bin/bash
# User Data - EC2 Server Staging (Ubuntu 22.04)
# Menginstal: Docker Engine, Docker Compose plugin, curl, jq
set -euxo pipefail
exec > >(tee /var/log/user-data.log) 2>&1
export DEBIAN_FRONTEND=noninteractive

echo ">>> [1/4] Update paket APT"
apt-get update -y
apt-get upgrade -y
apt-get install -y ca-certificates curl gnupg git jq unzip

echo ">>> [2/4] Tambah repositori resmi Docker"
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
chmod a+r /etc/apt/keyrings/docker.asc
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" \
  > /etc/apt/sources.list.d/docker.list

echo ">>> [3/4] Instal Docker Engine"
apt-get update -y
apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
systemctl enable --now docker

echo ">>> [4/4] Beri akses Docker ke user deploy (ubuntu)"
usermod -aG docker ubuntu

docker --version
touch /var/lib/cloud/instance/user-data-finished
echo ">>> User Data selesai"
