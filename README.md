# Berkas Pendukung - CI/CD GitLab Self-Hosted Runner

Isi paket (di luar kode aplikasi portofolio):

| Path | Fungsi |
| --- | --- |
| `.gitlab-ci.yml` | Pipeline build -> staging otomatis -> production manual |
| `.gitignore` | Mengecualikan state Terraform, kunci, dan rahasia |
| `app-tambahan/` | Dockerfile, .dockerignore, docker-compose.yml, endpoint /api/health (masuk ke `app/`) |
| `terraform/` | VPC, subnet, security group, 2 EC2, key pair, Elastic IP + skrip User Data |
| `scripts/generate-keys.sh` | Membuat kunci SSH dan menampilkan IP publik |
| `scripts/migrate.sh` | Migrasi otomatis GitHub -> GitLab (alternatif langkah manual BAB II) |
| `scripts/register-runner.sh` | Registrasi GitLab Runner di EC2 Runner |

Catatan: `next.config.mjs` pada proyek harus memuat `output: 'standalone'` (dijelaskan di BAB II).
