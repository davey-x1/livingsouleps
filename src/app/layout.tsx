import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "./globals.css";
import Header from "@/componentes/header/header";
import Footer from "@/componentes/footer/footer";
import Whatsapp from "@/componentes/whatsapp/whatsapp";

const onset = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Living Soul | La mejor EPS para mascotas en Colombia",
  description:
    "Protege la salud de tu mascota con Living Soul, la mejor EPS para perros y gatos en Colombia. Atención integral, cobertura nacional y planes accesibles. Descubre más ahora.",
  openGraph: {
    title: "Living Soul | La mejor EPS para mascotas en Colombia",
    description:
      "Protege la salud de tu mascota con Living Soul, la mejor EPS para perros y gatos en Colombia. Atención integral, cobertura nacional y planes accesibles. Descubre más ahora.",
    url: "https://www.livingsoul.com", // Cambia esto con la URL de tu sitio web
    siteName: "Living Soul",
    images: [
      {
        url: "https://www.livingsoul.com/imagen-destacada.jpg", // Cambia esto con la URL de la imagen de portada
        width: 1200,
        height: 630,
        alt: "Imagen destacada de Living Soul",
      },
    ],
    type: "website", // Tipo de contenido (puedes usar 'article' si es un artículo)
  },
  twitter: {
    card: "summary_large_image", // Usa 'summary_large_image' para obtener una tarjeta visualmente atractiva
    title: "Living Soul | La mejor EPS para mascotas en Colombia",
    description: "Protege la salud de tu mascota con Living Soul, la mejor EPS para perros y gatos en Colombia. Atención integral, cobertura nacional y planes accesibles. Descubre más ahora.",
    images: ["https://www.livingsoul.com/imagen-destacada.jpg"], // URL de la imagen que se usará en Twitter
  },
  robots: {
    index: true, // Permite a los motores de búsqueda indexar la página
    follow: true, // Permite a los motores de búsqueda seguir los enlaces de la página
  },
  keywords:
    "EPS para mascotas, salud de mascotas, seguro para perros y gatos, cobertura nacional para mascotas, atención integral para mascotas, plan de salud para animales",
  authors: [{ name: "Living Soul" }],
  applicationName: "Living Soul EPS para Mascotas",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-CO">
      <body className={`${onset.variable}`}>
        <Header />
        {children}
        <Whatsapp />
        <Footer />
      </body>
    </html>
  );
}
