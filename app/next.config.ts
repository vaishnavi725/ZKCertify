import type { NextConfig } from "next";

import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
  outputFileTracingRoot: path.join(__dirname, "../"),
  output: "standalone",
  webpack: (config) => {
    config.watchOptions = {
      ignored: [
        "**/node_modules",
        "**/.git",
        "C:\\DumpStack.log.tmp",
        "C:\\hiberfil.sys",
        "C:\\pagefile.sys",
        "C:\\swapfile.sys",
      ],
    };
    return config;
  },
};

export default nextConfig;
