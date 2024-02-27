"use client";

import Link from "next/link";
import { genres } from "./Genres";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Lock, Video, X } from "react-feather";
import MovieSearch from "./MovieSearch";

type Props = {
  hideNav: () => void;
};

export default function Nav({ hideNav }: Props) {
  const pathname = usePathname();
  const { status } = useSession();

  const logout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <nav className="h-screen fixed top-0 left-0 w-full bg-dark z-[9999] px-2 pb-4 overflow-y-auto">
      <header className="flex  items-center justify-between bg-dark text-white px-4 py-4 md:hidden">
        <Link href={"/"} className="flex-1 px-2">
          <Video fill="#AC1B1B" className="w-5 text-primary" />
        </Link>

        <div className="flex-[3]">
          <MovieSearch />
        </div>

        <div className="flex-1 flex items-center justify-end">
          <X
            onClick={hideNav}
            className="w-5 cursor-pointer z-[999] md:hidden"
          />
        </div>
      </header>
      <div className="mb-10">
        {status === "authenticated" ? (
          <>
            <button
              className="px-6 py-2 text-[0.9rem] text-white bg-primary rounded "
              onClick={logout}
            >
              Log out
            </button>
          </>
        ) : (
          <Link href="/login" className="flex items-center gap-2">
            <span className="text-[0.9rem]">Login</span>{" "}
            <Lock className="w-4 text-white" />
          </Link>
        )}
      </div>
      <p className="text-[0.9rem] text-gray-400 mb-8 mt-12">Genres</p>
      <ul className="flex items-center gap-4 flex-wrap">
        {genres.map((genre) => (
          <li key={genre.id}>
            <Link
              className={
                "flex items-center  gap-2 rounded-md p-2 mb-1 transition-all duration-150 ease-linear cursor-pointer text-[0.85rem] hover:bg-slate-900 " +
                (pathname.split("/").includes(String(genre.id))
                  ? "bg-primary text-white"
                  : "bg-transparent text-white")
              }
              href={`/genres/${genre.id}`}
            >
              {genre.name}
            </Link>
          </li>
        ))}
      </ul>
      <p className="text-xs text-center text-gray-400 mb-4 mt-8">
        &copy; Benedict
      </p>
    </nav>
  );
}
