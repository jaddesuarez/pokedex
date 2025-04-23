/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        pathname: "/PokeAPI/sprites/**",
      },
      {
        protocol: "https",
        hostname: "assets.pokemon.com",
        pathname: "/assets/cms2/img/pokedex/detail/**",
      },
    ],
  },
};

module.exports = nextConfig;
