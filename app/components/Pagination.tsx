"use client";

import { useMovieContext } from "@/contexts/MovieContext";
import { Movie } from "@/types/types";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SkipBack, SkipForward } from "react-feather";

const Pagination = () => {
  const context = useMovieContext();
  const [movies, setMovies] = useState<Movie[] | null>(null);
  const pathname = usePathname();

  const skipForward = () => {
    context?._setPage(context.page + 1);
  };

  const skipBackward = () => {
    context?._setPage(context.page - 1);
  };

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

  return (
    <>
      {movies &&
        context &&
        movies.length > 0 &&
        !context.loading &&
        !context.trendingMoviesLoading &&
        !context.topMoviesLoading && (
          <div className="mt-8 mb-6">
            <div className="text-white flex items-center justify-center gap-4">
              <button
                className="flex items-center justify-center gap-1 bg-primary px-4 py-2 rounded transition-all duration-150 ease-linear hover:scale-95"
                disabled={
                  context.moviesList?.page === 1 ||
                  context.trendingMoviesList?.page === 1 ||
                  context.topRatedList?.page === 1
                }
                onClick={skipBackward}
              >
                <SkipBack className="w-4" />
                <span className="text-xs">PREV</span>
              </button>
              <span>{context.page}</span>
              <button
                className="flex items-center justify-center gap-1 bg-primary px-4 py-2 rounded transition-all duration-150 ease-linear hover:scale-95"
                disabled={
                  context.moviesList?.total_pages === 1 ||
                  context.page === context.moviesList?.total_pages ||
                  context.page === context.trendingMoviesList?.total_pages ||
                  context.page === context.topRatedList?.total_pages
                }
                onClick={skipForward}
              >
                <span className="text-xs">NEXT</span>
                <SkipForward className="w-4" />
              </button>
            </div>
          </div>
        )}
    </>
  );
};
export default Pagination;
