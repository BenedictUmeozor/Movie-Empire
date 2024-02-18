"use client";

import { Lock, Menu, Sun } from "react-feather";
import Headroom from "react-headroom";
import MovieSearch from "./MovieSearch";
import Link from "next/link";

const Header = ({ term }: { term?: string }) => {
  return (
    <>
      <Headroom className="z-[999999]">
        <header className="flex  z-[1000] items-center justify-between bg-dark text-white px-4 py-4">
          <div className="flex-1">
            <Sun className="w-5 text-white" />
          </div>
          <div className="flex flex-[2] items-center justify-between gap-4 max-md:flex-[5]">
            <MovieSearch term={term ? term : ""} />
            <div className="flex-1 flex items-center justify-end">
              <Link
                href="/login"
                className="flex items-center gap-2 max-md:hidden"
              >
                <span className="text-[0.9rem]">Login</span>{" "}
                <Lock className="w-4 text-white" />
              </Link>
              <Menu className="w-5 md:hidden" />
            </div>
          </div>
        </header>
      </Headroom>
    </>
  );
};
export default Header;
