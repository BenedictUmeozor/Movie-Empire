"use client"

import Link from "next/link";
import { Lock, Menu, Sun } from "react-feather";
import Movies from "./components/Movies";
import Banner from "./components/Banner";
import Pagination from "./components/Pagination";
import MovieSearch from "./components/MovieSearch";
import RemoveStates from "./components/RemoveStates";
import Headroom from "react-headroom";

function Home() {
  return (
    <div>
      {/* header  */}
      <RemoveStates />
      <Headroom className="z-[999999]">
        <header className="flex  z-[1000] items-center justify-between bg-dark text-white px-4 py-4">
          <div className="flex-1">
            <Sun className="w-5 text-white" />
          </div>
          <div className="flex flex-[2] items-center justify-between gap-4 max-md:flex-[5]">
            <MovieSearch />
            <div className="flex-1 flex items-center justify-end">
              <Link href="/" className="flex items-center gap-2 max-md:hidden">
                <span className="text-[0.9rem]">Login</span>{" "}
                <Lock className="w-4 text-white" />
              </Link>
              <Menu className="w-5 md:hidden" />
            </div>
          </div>
        </header>
      </Headroom>

      {/* banner  */}
      <Banner />

      {/* Movies  */}
      <Movies />

      {/* Pagination  */}
      <Pagination />
    </div>
  );
}

export default Home;
