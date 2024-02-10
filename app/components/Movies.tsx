"use client";

import { MoonLoader } from "react-spinners";
import Movie from "./Movie";
import { useMovieContext } from "@/contexts/MovieContext";
import { removeFirstItem } from "@/utils/functions";

function Movies() {
  const context = useMovieContext();
  const movies = context?.movies;

  if (context?.loading) {
    return (
      <div className="flex items-center justify-center mt-8">
        <MoonLoader color="#AC1B1B" size={100} />
      </div>
    );
  }

  if ((movies === null || movies === undefined) && !context?.loading) {
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
          <h3 className="text-2xl font-bold my-8 px-6 text-white">
            Discover...
          </h3>
          <div className="grid grid-cols-4 gap-4 px-6 my-4">
            {movies.length > 0 ? (
              removeFirstItem(movies).map((movie) => (
                <Movie key={movie.id} movie={movie} />
              ))
            ) : (
              <div className="text-white my-8">Oops! No results was found</div>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default Movies;
