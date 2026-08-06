import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true }, // no Next image server on CF Pages static hosting
};

export default nextConfig;
