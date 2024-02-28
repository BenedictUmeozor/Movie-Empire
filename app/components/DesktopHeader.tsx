"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Lock, Video } from "react-feather";
import MovieSearch from "./MovieSearch";
import toast from "react-hot-toast";

export default function DesktopHeader({ term }: { term?: string }) {
  const { status } = useSession();

  const logout = async () => {
    await signOut({ callbackUrl: "/" });
    return toast.success("You are logged out")
  };

  return (
    <header className="flex sticky top-0 z-[1000] items-center justify-between bg-dark text-white px-4 py-4 max-md:hidden">
      <Link href={"/"} className="flex-1">
        <Video fill="#AC1B1B" className="w-5 text-primary" />
      </Link>
      <div className="flex flex-[2] items-center justify-between gap-4 max-md:flex-[6]">
        <MovieSearch term={term ? term : ""} />
        <div className="flex-1 flex items-center justify-end">
          {status === "authenticated" ? (
            <>
              <button
                className="px-6 py-2 text-[0.9rem] text-white bg-primary rounded max-md:hidden"
                onClick={logout}
              >
                Log out
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 max-md:hidden"
            >
              <span className="text-[0.9rem]">Login</span>{" "}
              <Lock className="w-4 text-white" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
