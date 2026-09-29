import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Chrome opens this dev server at 127.0.0.1. Next only allowlists
  // localhost unless this host is included, and a blocked HMR socket
  // prevents the page from hydrating.
  allowedDevOrigins: ["127.0.0.1"],
}

export default nextConfig
