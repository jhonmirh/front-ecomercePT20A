/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains: ['static.wixstatic.com'], 
    },
};

module.exports = {
    experimental: {
      concurrentFeatures: true,
      serverComponents: true,
    },
  };

  
export default nextConfig;
