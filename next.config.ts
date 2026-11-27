import type { NextConfig } from "next";

const pagesExport = process.env.PAGES_EXPORT === "true";
const basePath = pagesExport ? "/Sui" : "";

const nextConfig: NextConfig = {
  ...(pagesExport && { output: "export", basePath, trailingSlash: true }),
  env: { NEXT_PUBLIC_SITE_BASE_PATH: basePath },
};

export default nextConfig;
