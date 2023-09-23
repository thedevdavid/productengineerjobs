/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    logging: {
      level: "verbose",
    },
  },
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    domains: ["productengineerjobs.co", "cdn.sanity.io"],
  },
  swcMinify: true,
};

module.exports = nextConfig;
