#!/bin/bash
# User Data - EC2 Agen Runner (Ubuntu 22.04)
# Menginstal: Docker Engine + Buildx, dependensi runner, user khusus "runner", swap 2 GB
# Registrasi runner ke GitHub dilakukan manual (token berlaku singkat) - lihat BAB 2.
set -euxo pipefail
exec > >(tee /var/log/user-data.log) 2>&1
export DEBIAN_FRONTEND=noninteractive

echo ">>> [1/6] Update paket APT"
apt-get update -y
apt-get upgrade -y
apt-get install -y ca-certificates curl gnupg git jq unzip tar openssh-client libicu-dev

echo ">>> [2/6] Swap 2 GB (build Next.js membutuhkan RAM > 1 GB pada t2/t3.micro)"
if [ ! -f /swapfile ]; then
  fallocate -l 2G /swapfile
  chmod 600 /swapfile
  mkswap /swapfile
  swapon /swapfile
  echo '/swapfile none swap sw 0 0' >> /etc/fstab
fi

echo ">>> [3/6] Tambah repositori resmi Docker"
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
chmod a+r /etc/apt/keyrings/docker.asc
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" \
  > /etc/apt/sources.list.d/docker.list

echo ">>> [4/6] Instal Docker Engine + Buildx"
apt-get update -y
apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
systemctl enable --now docker
usermod -aG docker ubuntu

echo ">>> [5/6] Buat user khusus runner (non-root) dan akses Docker"
if ! id runner >/dev/null 2>&1; then
  useradd -m -s /bin/bash runner
fi
usermod -aG docker runner
mkdir -p /home/runner/actions-runner
chown -R runner:runner /home/runner/actions-runner
chmod 755 /home/runner

echo ">>> [6/6] Selesai"
docker --version
touch /var/lib/cloud/instance/user-data-finished
echo ">>> User Data selesai"
