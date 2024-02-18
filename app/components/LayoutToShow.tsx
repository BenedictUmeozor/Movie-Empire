"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import LayoutLinks from "./LayoutLinks";
import Genres from "./Genres";

const LayoutToShow = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  if (pathname === "/login" || pathname === "/register") {
    return <div>{children}</div>;
  }

  return (
    <div className="h-screen grid grid-cols-5 overflow-x-hidden text-white max-md:block">
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
      <div className="col-span-4 bg-dark overflow-y-auto overflow-x-hidden">
        {children}
      </div>
    </div>
  );
};
export default LayoutToShow;
