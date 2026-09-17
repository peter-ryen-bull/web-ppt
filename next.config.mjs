/** @type {import('next').NextConfig} */
const nextConfig = {
  // Lar oss importere notes.md og copy.yaml som ren tekst.
  webpack: (config) => {
    config.module.rules.push({ test: /\.md$/, type: "asset/source" });
    config.module.rules.push({ test: /\.ya?ml$/, type: "asset/source" });
    return config;
  },
};

export default nextConfig;
