"use client";

import { MoonLoader } from "react-spinners";
import Movie from "./Movie";
import { useMovieContext } from "@/contexts/MovieContext";
import { useEffect, useRef, useState } from "react";
import { Movie as MovieType } from "@/types/types";
import { usePathname } from "next/navigation";
import { removeFirstItem } from "@/utils/functions";

function Movies() {
  const context = useMovieContext();
  const pathname = usePathname();
  const [movies, setMovies] = useState<MovieType[] | null>(null);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      context &&
      context.movies &&
      context.movies.length > 0 &&
      context.trendingMovies &&
      context.topMovies
    ) {
      if (pathname === "/") {
        setMovies(context.movies);
      } else if (pathname === "/trending") {
        setMovies(context.trendingMovies);
      } else if (pathname === "/top-rated") {
        setMovies(context.topMovies);
      }
    }
  }, [
    context,
    context?.movies,
    context?.trendingMovies,
    context?.topMovies,
    pathname,
  ]);

  if (context?.loading) {
    return (
      <div className="flex items-center justify-center mt-8">
        <MoonLoader color="#AC1B1B" size={100} />
      </div>
    );
  }

  return (
    <>
      {movies && !context?.movieBankLoading && (
        <>
          {movies.length > 1 && (
            <div
              ref={elementRef}
              className="text-2xl font-bold my-8 mt-12 px-6 text-white capitalize max-md:text-center"
            >
              {pathname === "/"
                ? "Discover..."
                : removeFirstItem(pathname.split("/")).join("") + "..."}
            </div>
          )}
          <div
            className="grid grid-cols-4 gap-8 px-6 my-4 max-lg:grid-cols-2 max-md:grid-cols-1
          "
          >
            {movies.length > 0 ? (
              movies.map((movie) => <Movie key={movie.id} movie={movie} />)
            ) : (
              <div className="text-white my-8"></div>
            )}
          </div>
        </>
      )}

      {!movies ||
        (!movies.length && (
          <div className="text-white text-center my-8">
            Oops! No results was found
          </div>
        ))}
    </>
  );
}

export default Movies;
