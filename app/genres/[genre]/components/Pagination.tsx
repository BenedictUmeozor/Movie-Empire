"use client";

import { Movie, MovieListResponse } from "@/types/types";
import { SkipBack, SkipForward } from "react-feather";

type Props = {
  page: number;
  movies: Movie[];
  movieList: MovieListResponse;
  loading: boolean;
  _setPage(page: number): void;
};

const Pagination = ({ page, movieList, movies, loading, _setPage }: Props) => {
  const skipForward = () => {
    _setPage(page + 1);
  };

  const skipBackward = () => {
    _setPage(page - 1);
  };

  return (
    <>
      {movies && movies.length > 0 && !loading && (
        <div className="mt-8 mb-6">
          <div className="text-white flex items-center justify-center gap-4">
            <button
              className="flex items-center justify-center gap-1 bg-primary px-4 py-2 rounded transition-all duration-150 ease-linear hover:scale-95"
              disabled={movieList?.page === 1}
              onClick={skipBackward}
            >
              <SkipBack className="w-4" />
              <span className="text-xs">PREV</span>
            </button>
            <span>{page}</span>
            <button
              className="flex items-center justify-center gap-1 bg-primary px-4 py-2 rounded transition-all duration-150 ease-linear hover:scale-95"
              disabled={
                movieList?.total_pages === 1 || page === movieList?.total_pages
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
