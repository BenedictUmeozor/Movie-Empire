"use client";

import useScrollPosition from "@/hooks/useScrollPosition";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Activity, Globe, Star, Video } from "react-feather";

export default function FooterNav() {
  const pathname = usePathname();
  const { status } = useSession();
  const [isAuthPage, setIsAuthPage] = useState(false);

  useEffect(() => {
    if (pathname === "/login" || pathname === "/register") {
      setIsAuthPage(true);
    } else {
      setIsAuthPage(false);
    }
  }, [pathname]);

  return (
    <div
      style={{ background: "rgba(0,0,0,0.9)" }}
      className={
        "md:hidden fixed bottom-0 left-0 w-full z-[999] pb-2 " +
        (isAuthPage && "hidden")
      }
    >
      <ul className="mt-4 flex items-center justify-between">
        <li>
          <Link
            href="/"
            className={
              "flex flex-col items-center gap-1 " +
              (pathname === "/" ? "text-primary" : " text-white")
            }
          >
            <Globe
              className={
                "w-24  md:hidden lg:block" +
                (pathname === "/" ? "text-primary" : " text-white")
              }
            />
            <span className="text-xs">Browse</span>
          </Link>
        </li>
        <li>
          <Link
            href="/trending"
            className={
              "flex flex-col items-center gap-1 " +
              (pathname === "/trending" ? "text-primary" : " text-white")
            }
          >
            <Activity
              className={
                "w-24  md:hidden lg:block" +
                (pathname === "/trending" ? "text-primary" : " text-white")
              }
            />
            <span className="text-xs">Trending</span>
          </Link>
        </li>
        <li>
          <Link
            href="/top-rated"
            className={
              "flex flex-col items-center gap-1 " +
              (pathname === "/top-rated" ? "text-primary" : " text-white")
            }
          >
            <Star
              className={
                "w-24  md:hidden lg:block" +
                (pathname === "/top-rated" ? "text-primary" : " text-white")
              }
            />
            <span className="text-xs">Top Rated</span>
          </Link>
        </li>
        {status === "authenticated" && (
          <li>
            <Link
              href="/my-videos"
              className={
                "flex flex-col items-center gap-1 " +
                (pathname === "/my-videos" ? "text-primary" : " text-white")
              }
            >
              <Video
                className={
                  "w-24  md:hidden lg:block" +
                  (pathname === "/my-videos" ? "text-primary" : " text-white")
                }
              />
              <span className="text-xs">My Videos</span>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}
