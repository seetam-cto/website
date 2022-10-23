/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: { domains: ['switchoff-assets.fra1.digitaloceanspaces.com']}
}
// module.exports = { images: { domains: ['switchoff-assets.fra1.digitaloceanspaces.com']}, }
module.exports = nextConfig
