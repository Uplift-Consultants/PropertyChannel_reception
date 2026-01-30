/** @type {import('next').NextConfig} */

const nextConfig = {
  serverExternalPackages: ["puppeteer-core", "@sparticuz/chromium-min"],
  turbopack: {
    resolveAlias: {
      '@components': './components',
      '@icons': './assets/icons',
      '@css': './assets/css',
      '@lib': './lib',
    },
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js'
      }
    }
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dckv23kh44p25.cloudfront.net',
      },
    ],
  },
};
export default nextConfig;