/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpileOptions: {
    lazy: true,
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig