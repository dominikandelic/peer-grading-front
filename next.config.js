/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      // Redirect to Django Admin dashboard
      {
        source: "/admin",
        destination: "http://localhost:8000/admin",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
