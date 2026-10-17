#!/bin/bash
# User Data - EC2 GitLab Runner (Ubuntu 22.04)
set -euxo pipefail
exec > >(tee -a /var/log/user-data.log) 2>&1

export DEBIAN_FRONTEND=noninteractive
export NEEDRESTART_MODE=a

# 1. Paket dasar
apt-get update -y
apt-get upgrade -y
apt-get install -y curl git jq ca-certificates gnupg lsb-release fail2ban

# 2. Swap 2 GB (pencegah Out of Memory saat npm run build)
if [ ! -f /swapfile ]; then
  fallocate -l 2G /swapfile
  chmod 600 /swapfile
  mkswap /swapfile
  swapon /swapfile
  echo '/swapfile none swap sw 0 0' >> /etc/fstab
fi

# 3. Docker Engine + Buildx
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
chmod a+r /etc/apt/keyrings/docker.asc
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" > /etc/apt/sources.list.d/docker.list
apt-get update -y
apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
systemctl enable --now docker

# 4. GitLab Runner dari repositori resmi GitLab
curl -fsSL https://packages.gitlab.com/install/repositories/runner/gitlab-runner/script.deb.sh | bash
apt-get install -y gitlab-runner

# 5. Izinkan job menjalankan Docker tanpa root
usermod -aG docker gitlab-runner

# 6. Hardening SSH
systemctl enable --now fail2ban

# 7. Penanda selesai
touch /var/lib/cloud/instance/user-data-finished
echo "User Data Runner selesai: $(date)"
