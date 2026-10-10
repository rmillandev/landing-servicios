import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NEXO Servicios | Soluciones para cada espacio",
  description:
    "Landing de demostración para profesionales y empresas de mantenimiento, electricidad, plomería y climatización. Solicita una cotización por WhatsApp.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}
