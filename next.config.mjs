/** @type {import('next').NextConfig} */
const nextConfig = {
  // Lar oss importere notes.md som ren tekst (speaker notes).
  webpack: (config) => {
    config.module.rules.push({ test: /\.md$/, type: "asset/source" });
    return config;
  },
};

export default nextConfig;
