import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/calculator',
        permanent: true,
      },
    ]
  },
async rewrites () {
    return [
        {
            source: '/api/:path*',
            destination: `http://localhost:3000/:path*`,
        },
    ];
},
};

export default nextConfig;

