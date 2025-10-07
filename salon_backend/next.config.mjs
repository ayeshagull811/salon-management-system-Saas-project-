/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    domains: ["encrypted-tbn0.gstatic.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "beautycastleparlour.com",
        pathname: "/uploads/**",
      },
    ],
  },
  experimental: {
    optimizeCss: false, // disable lightningcss
  },
  // Agar turbopack disable karna ho:
  // experimental: {
  //   turbo: false,
  // },
};

export default nextConfig;
