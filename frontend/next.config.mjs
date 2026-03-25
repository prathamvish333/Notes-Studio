/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  basePath: "/notes",
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
