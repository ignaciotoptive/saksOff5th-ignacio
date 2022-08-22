const S3ConfigProvider = require('./s3/S3ConfigProvider');
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = (phase) => {
  console.log('Starting at phase:', phase);
  // Create bucket at startup
  // source: https://github.com/vercel/next.js/discussions/15341#discussioncomment-2987699
  S3ConfigProvider().createBucket();
  return nextConfig;
};
