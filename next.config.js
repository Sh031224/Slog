/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ['@prisma/client']
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'slog.website',
        port: '',
        pathname: '/api/static/**'
      }
    ]
  }
};

module.exports = nextConfig;
