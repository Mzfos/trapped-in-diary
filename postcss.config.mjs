export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/trapped-in-diary',
};

export default nextConfig;