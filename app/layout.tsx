import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MovieContextProvider } from "@/contexts/MovieContext";

import "@smastrom/react-rating/style.css";

import LayoutToShow from "./components/LayoutToShow";
import AuthProvider from "./Providers";
import FooterNav from "./components/FooterNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The movie empire",
  description: "Website for movies",
};

// 7d7d2b16

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-dark overflow-x-hidden"}>
        <AuthProvider>
          <MovieContextProvider>
            <LayoutToShow>{children}</LayoutToShow>
            <FooterNav />
          </MovieContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
