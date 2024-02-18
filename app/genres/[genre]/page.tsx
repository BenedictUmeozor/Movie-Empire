"use client";

import MovieSearch from "@/app/components/MovieSearch";
import { Movie, MovieListResponse } from "@/types/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Lock, Menu, Sun } from "react-feather";
import Headroom from "react-headroom";
import PageBanner from "./components/PageBanner";
import Movies from "./components/Movies";
import { removeFirstItem } from "@/utils/functions";
import Pagination from "./components/Pagination";

const Page = ({ params }: { params: { genre: string } }) => {
  const [movies, setMovies] = useState<Movie[] | null>(null);
  const [movieList, setMovieList] = useState<MovieListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const _setPage = (number: number) => {
    setPage(number);
  };

  useEffect(() => {
    const getMovies = async () => {
      const url = `https://api.themoviedb.org/3/discover/movie?page=${page}&with_genres=${params.genre}&api_key=923961f70cb93f1baadf5d2b9dc1a5e9`;

      try {
        setLoading(true);

        const res = await fetch(url, {
          cache: "force-cache",
        });

        if (!res.ok) {
          console.log("Failed to fetch data");
        }

        const data: MovieListResponse = await res.json();

        setMovieList(data);
        setMovies(data.results);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, [page, params.genre]);

  return (
    <div>
      {/* header  */}
      <Headroom className="z-[999999]">
        <header className="flex  z-[1000] items-center justify-between bg-dark text-white px-4 py-4">
          <div className="flex-1">
            <Sun className="w-5 text-white" />
          </div>
          <div className="flex flex-[2] items-center justify-between gap-4 max-md:flex-[5]">
            <MovieSearch />
            <div className="flex-1 flex items-center justify-end">
              <Link href="/" className="flex items-center gap-2 max-md:hidden">
                <span className="text-[0.9rem]">Login</span>{" "}
                <Lock className="w-4 text-white" />
              </Link>
              <Menu className="w-5 md:hidden" />
            </div>
          </div>
        </header>
      </Headroom>

      {/* banner  */}
      {movies && <PageBanner movie={movies[0]} />}

      {!movies && !loading && <div>No results found</div>}

      {/* Movies  */}
      {movies && (
        <Movies
          movies={removeFirstItem(movies!)!}
          loading={loading}
          genre_id={Number(params.genre)}
        />
      )}

      {/* Pagination  */}
      {movies && movieList && (
        <Pagination
          loading={loading}
          movieList={movieList!}
          movies={movies}
          page={page}
          _setPage={_setPage}
        />
      )}
    </div>
  );
};
export default Page;
