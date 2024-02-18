"use client";

import { MoonLoader } from "react-spinners";
import { Movie as MovieType } from "@/types/types";
import Movie from "@/app/components/Movie";

function Movies({
  movies,
  loading,
}: {
  movies: MovieType[];
  loading: boolean;
}) {
  if (loading) {
    return (
      <div className="flex items-center justify-center mt-8">
        <MoonLoader color="#AC1B1B" size={100} />
      </div>
    );
  }

  if (
    (movies === null || movies === undefined || movies.length === 0) &&
    !loading
  ) {
    return (
      <div className="text-white text-center my-8">
        Oops! No results was found
      </div>
    );
  }

  return (
    <>
      {movies && !loading && (
        <>
          {movies.length > 1 && (
            <div className="text-2xl font-bold my-8 mt-12 px-6 text-white capitalize max-md:text-center">
              Results...
            </div>
          )}
          <div
            className="grid grid-cols-4 gap-4 px-6 my-4 max-lg:grid-cols-2 max-md:grid-cols-1
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
