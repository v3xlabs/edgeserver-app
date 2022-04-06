/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'nl', 'hr'],
  },
  compiler: {
    styledComponents: true
  }
}

module.exports = nextConfig
