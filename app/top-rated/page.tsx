import { Lock, Sun } from "react-feather";
import MovieSearch from "../components/MovieSearch";
import Link from "next/link";
import Movies from "../components/Movies";
import Pagination from "../components/Pagination";
import RemoveStates from "../components/RemoveStates";
import PageBanner from "../components/PageBanner";

export default function Page() {
  return (
    <div>
      {/* header  */}
      <RemoveStates />
      <header className="flex sticky top-0 z-[100] items-center justify-between bg-dark text-white px-4 py-4">
        <div className="flex-1">
          <Sun className="w-5 text-white" />
        </div>
        <div className="flex flex-[2] items-center justify-between gap-4">
          <MovieSearch />
          <div className="flex-1 flex items-center justify-end">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-[0.9rem]">Login</span>{" "}
              <Lock className="w-4 text-white" />
            </Link>
          </div>
        </div>
      </header>

      {/* banner  */}
      <PageBanner />

      {/* Movies  */}
      <Movies />

      {/* Pagination  */}
      <Pagination />
    </div>
  );
}
