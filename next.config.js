/** @type {import('next').NextConfig} */
const isGitHubPagesBuild = process.env.GITHUB_PAGES === 'true';

const nextConfig = {
  ...(isGitHubPagesBuild
    ? {
        output: 'export',
        basePath: '/trapped-in-diary',
        trailingSlash: true,
      }
    : {}),
};

module.exports = nextConfig;
