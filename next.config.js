/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ['@prisma/client','shiki', 'vscode-oniguruma']
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'slog.website',
        port: '',
        pathname: '/api/static/**'
      },
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com'
      }
    ]
  }
};

module.exports = nextConfig;
