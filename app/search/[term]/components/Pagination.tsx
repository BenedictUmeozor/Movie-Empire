"use client";

import { Movie, MovieListResponse } from "@/types/types";
import { useRouter } from "next/navigation";
import { SkipBack, SkipForward } from "react-feather";

type Props = {
  term: string;
  page: number;
  movies: Movie[];
  movieList: MovieListResponse;
  loading: boolean;
};

const Pagination = ({ term, page, movieList, movies, loading }: Props) => {
  const router = useRouter();

  const skipForward = () => {
    router.push(`/search/${term}?page=${page + 1}`);
  };

  const skipBackward = () => {
    router.push(`/search/${term}?page=${page - 1}`);
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
