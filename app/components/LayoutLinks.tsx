"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, Globe, Star, Video } from "react-feather";

const LayoutLinks = () => {
  const pathname = usePathname();
  const { status } = useSession();

  return (
    <ul className="mt-4">
      <li>
        <Link
          href="/"
          className={
            "flex items-center gap-2 rounded-3xl p-4  mb-3 transition-all duration-150 ease-linear cursor-pointer text-[0.9rem] hover:bg-slate-900 max-md:p-3 max-md:rounded-2xl " +
            (pathname === "/"
              ? "bg-primary text-white"
              : "bg-transparent text-white")
          }
        >
          <Globe className="w-5 text-white md:hidden lg:block" />
          <span className="text-[0.9rem]">Browse</span>
        </Link>
      </li>
      <li>
        <Link
          href="/trending"
          className={
            "flex items-center  gap-2 rounded-3xl p-4  mb-3 transition-all duration-150 ease-linear cursor-pointer text-[0.9rem] hover:bg-slate-900 max-md:p-3 max-md:rounded-2xl " +
            (pathname === "/trending"
              ? "bg-primary text-white"
              : "bg-transparent text-white")
          }
        >
          <Activity className="w-5 text-white md:hidden lg:block" />
          <span className="text-[0.9rem]">Trending</span>
        </Link>
      </li>
      <li>
        <Link
          href="/top-rated"
          className={
            "flex items-center  gap-2 rounded-3xl p-4  mb-3 transition-all duration-150 ease-linear cursor-pointer text-[0.9rem] hover:bg-slate-900 max-md:p-3 max-md:rounded-2xl " +
            (pathname === "/top-rated"
              ? "bg-primary text-white"
              : "bg-transparent text-white")
          }
        >
          <Star className="w-5 text-white md:hidden lg:block" />
          <span className="text-[0.9rem]">Top Rated</span>
        </Link>
      </li>
      {status === "authenticated" && (
        <li>
          <Link
            href="/my-videos"
            className={
              "flex items-center  gap-2 rounded-3xl p-4  mb-3 transition-all duration-150 ease-linear cursor-pointer text-[0.9rem] hover:bg-slate-900 max-md:p-3 max-md:rounded-2xl " +
              (pathname === "/my-videos"
                ? "bg-primary text-white"
                : "bg-transparent text-white")
            }
          >
            <Video className="w-5 text-white md:hidden lg:block" />
            <span className="text-[0.9rem]">My Videos</span>
          </Link>
        </li>
      )}
    </ul>
  );
};
export default LayoutLinks;
