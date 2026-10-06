/** @type {import('next').NextConfig} */
const nextConfig = {
  // Project previews are served at quality 90 so screenshots stay crisp.
  images: {
    qualities: [75, 90],
  },
  // The Projects page used to live at /skills-projects; keep old links working.
  async redirects() {
    return [
      { source: "/skills-projects", destination: "/projects", permanent: true },
      { source: "/skills-projects/:id", destination: "/projects/:id", permanent: true },
    ];
  },
};

module.exports = nextConfig
