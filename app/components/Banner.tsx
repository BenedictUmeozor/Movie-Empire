"use client";

import { useMovieContext } from "@/contexts/MovieContext";
import Image from "next/image";
import Link from "next/link";

const Banner = () => {
  const context = useMovieContext();

  return (
    <>
      {context?.movies && context.movies.length > 0 && !context.loading && (
        <Link
          href={"/movie/" + context.movies[0].id}
          className="relative h-[400px] block w-[95%] mx-auto rounded"
        >
          <Image
            src={
              context?.movies[0].backdrop_path
                ? "https://image.tmdb.org/t/p/w1280" +
                  context?.movies[0].backdrop_path
                : "/image2.jpg"
            }
            alt={context?.movies[0].title}
            width={500}
            height={500}
            priority={false}
            className="h-full absolute top-0 rounded left-0 max-w-full w-full"
          />
          <div
            style={{ background: "rgba(0,0,0,0.5)" }}
            className="absolute top-0 left-0 h-full w-full z-10 flex items-end p-4"
          >
            <div className="p-4">
              <h2 className="text-white mb-2 text-lg">
                {context?.movies[0].title}
              </h2>
              <p className="text-xs text-gray-300 w-[80%] max-w-96">
                {context?.movies[0].overview}
              </p>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};
export default Banner;
