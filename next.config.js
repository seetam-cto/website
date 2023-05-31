/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: { domains: ['switchoff-assets.fra1.digitaloceanspaces.com','via.placeholder.com']},
  env: {
    mapbox_key: 'pk.eyJ1Ijoic2VldGFtLWRpdmthciIsImEiOiJjbGgyY3QyNGgxY2dlM2VyenFzbzFua3F4In0.hB1jVykXYXRQA8lMnXY8ng',
    edenai_key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNGM0ZTk4MTgtMzY4Yy00YTI0LWIwYTgtZDM3YTNjMjViZTA5IiwidHlwZSI6ImZyb250X2FwaV90b2tlbiJ9.WOkE3H-sOURXSR8kzIcUnciN34zp96_9fpoAXmC51Yg',
    algolia_app: 'NFBUZHRPBK',
    algolia_key: '4f0ee3f3c1afdb94e4dabd4ab02760b3'
  }
}
// module.exports = { images: { domains: ['switchoff-assets.fra1.digitaloceanspaces.com']}, }
module.exports = nextConfig
