"use client";

import Link from "next/link";
import { Menu, Video, X } from "react-feather";
import MovieSearch from "./MovieSearch";

type Props = {
  showNav: () => void;
  term?: string;
};

export default function MobileHeader({
  term,
  showNav,
}: Props) {
  return (
    <>
      <header className="flex sticky top-0 z-[1000] items-center justify-between bg-dark text-white px-4 py-4 md:hidden">
        <Link href={"/"} className="flex-1">
          <Video fill="#AC1B1B" className="w-5 text-primary" />
        </Link>

        <div className="flex-[3]">
          <MovieSearch term={term ? term : ""} />
        </div>

        <div className="flex-1 flex items-center justify-end">
          <Menu
            onClick={showNav}
            className="w-5 cursor-pointer z-[999] md:hidden"
          />
        </div>
      </header>
    </>
  );
}
