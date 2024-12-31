import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
 images:{
  remotePatterns:[{
    hostname: "img.daisyui.com"
  }]
 }
};

export default nextConfig;
