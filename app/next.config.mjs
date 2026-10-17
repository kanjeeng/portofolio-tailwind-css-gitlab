/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone", // BENAR: Dipindah ke luar
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;