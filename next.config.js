/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  /* async redirects() {
    return [
      {
        source: "/",
        destination: "/Login/Login",
        permanent: false, // true para redirección 308 permanente, false para 307 temporal
      },
    ];
  }, */
};

module.exports = nextConfig;
