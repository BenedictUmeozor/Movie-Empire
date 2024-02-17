"use client";

import { MoonLoader } from "react-spinners";
import Movie from "./Movie";
import { useMovieContext } from "@/contexts/MovieContext";
import { useEffect, useRef, useState } from "react";
import { Movie as MovieType } from "@/types/types";
import { usePathname } from "next/navigation";

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

  useEffect(() => {
    if (context && context.searchTerm && context.searchTerm.length > 0) {
      if (elementRef.current) {
        elementRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  }, [context, context?.searchTerm]);

  if (context?.loading) {
    return (
      <div className="flex items-center justify-center mt-8">
        <MoonLoader color="#AC1B1B" size={100} />
      </div>
    );
  }

  if (
    (movies === null || movies === undefined || movies.length === 0) &&
    !context?.loading &&
    !context?.trendingMoviesLoading &&
    !context?.topMoviesLoading
  ) {
    return (
      <div className="text-white text-center my-8">
        Oops! No results was found
      </div>
    );
  }

  return (
    <>
      {movies && (
        <>
          {movies.length > 1 && (
            <div
              ref={elementRef}
              className="text-2xl font-bold my-8 px-6 text-white"
            >
              Discover...
            </div>
          )}
          <div
            className="grid grid-cols-4 gap-4 px-6 my-4 max-lg:grid-cols-2
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
    </>
  );
}

export default Movies;
