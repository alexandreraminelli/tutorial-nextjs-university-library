import type { NextConfig } from "next"

// Configuração do Next.js
const nextConfig: NextConfig = {
  images: {
    // Provedores externos de imagens
    remotePatterns: [
      { protocol: "https", hostname: "placehold.co" },
      { protocol: "https", hostname: "m.media-amazon.com" },
      { protocol: "https", hostname: "ik.imagekit.io" },
    ],
  },
  typescript: {
    ignoreBuildErrors: true, // Ignorar erros de compilação do TypeScript
  },
  eslint: {
    ignoreDuringBuilds: true, // Ignorar erros de linting durante a construção
  },
}

export default nextConfig
