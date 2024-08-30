/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains: ['static.wixstatic.com'], 
    },
};

module.exports = {
  reactStrictMode: true,  
  experimental: {
      concurrentFeatures: true,
      serverComponents: true,
    },
  };

  
export default nextConfig;
