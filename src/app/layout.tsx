import { ChakraUIProvider } from "@/providers/ChakraUIProvider";
import type { Metadata } from "next";
import { Inter, KoHo } from "next/font/google";
import "./globals.css";
import TanstackProvider from "@/providers/TanstackProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const koHo = KoHo({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-koho",
});

export const metadata: Metadata = {
  title: "Oasís Marítimo",
  description: "Sistema de Gerenciamento do Oasís Marítimo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${inter.variable} ${koHo.variable}`}>
        <TanstackProvider>
          <ChakraUIProvider>
            {children}
          </ChakraUIProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}

