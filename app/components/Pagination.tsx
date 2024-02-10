"use client";

import { useMovieContext } from "@/contexts/MovieContext";
import { SkipBack, SkipForward } from "react-feather";

const Pagination = () => {
  const context = useMovieContext();
  const movies = context?.movies;

  const skipForward = () => {
    context?._setPage(context.page + 1);
  };

  const skipBackward = () => {
    context?._setPage(context.page - 1);
  };

  return (
    <>
      {movies && movies.length > 0 && !context.loading && (
        <div className="mt-8 mb-6">
          <div className="text-white flex items-center justify-center gap-4">
            <button
              className="flex items-center justify-center gap-1 bg-primary px-4 py-2 rounded transition-all duration-150 ease-linear hover:scale-95"
              disabled={context.moviesList?.page === 1}
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
                context.page === context.moviesList?.total_pages
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
