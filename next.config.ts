import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["clientes.andromedacrea.com"], // Prueba agregando esto
    remotePatterns: [
      {
        protocol: "https",
        hostname: "clientes.andromedacrea.com",
        port: "", // Si usas otro puerto, agrégalo aquí
        pathname: "/livingsoulbackend/images/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "",
        pathname: "/mascotas/images/**",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
