import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MovieContextProvider } from "@/contexts/MovieContext";
import Link from "next/link";
import Genres from "./components/Genres";
import "@smastrom/react-rating/style.css";
import LayoutLinks from "./components/LayoutLinks";

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
      <body className={inter.className + " bg-dark"}>
        <MovieContextProvider>
          <div className="h-screen grid grid-cols-5 text-white max-md:block">
            <div className="col-span-1 bg-dark text-white py-4 px-4 h-full overflow-y-auto border-r-2 border-gray-900 max-md:hidden">
              {/* header  */}
              <header className="flex items-center justify-center gap-4 mt-4">
                {/* <div className="h-8 w-8 rounded-[50%] bg-primary text-white font-semibold flex items-center justify-center text-center">
                  B
                </div> */}
                <Link href="/" className="text-2xl font-bold">
                  Movie.<span className="text-primary">Empire</span>
                </Link>
              </header>

              {/* news feed  */}
              <div className="mt-12">
                <p className="text-xs text-gray-400">News Feed</p>
                <LayoutLinks />
              </div>

              {/* divider  */}
              <div className="h-[2px] rounded w-full bg-gray-900 mb-4"></div>

              {/* Genres  */}
              <div>
                <p className="text-xs text-gray-400 mb-4">Genres</p>
                <Genres />
              </div>
            </div>
            <div className="col-span-4 bg-dark overflow-y-auto">{children}</div>
          </div>
        </MovieContextProvider>
      </body>
    </html>
  );
}
