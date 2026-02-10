const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com', 'res.cloudinary.com'],
    // 开发环境下关闭优化，避免本地网络环境导致的图片请求报错
    unoptimized: process.env.NODE_ENV === 'development',
  },
  experimental: {
    typedRoutes: true,
  },
}

module.exports = withContentlayer(nextConfig)
