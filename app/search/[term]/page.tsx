"use client";

import MovieSearch from "@/app/components/MovieSearch";
import { Movie, MovieListResponse } from "@/types/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Lock, Menu, Sun } from "react-feather";
import Headroom from "react-headroom";
import Pagination from "./components/Pagination";
import Movies from "./components/Movies";
import PageBanner from "./components/PageBanner";
import { removeFirstItem } from "@/utils/functions";
import { useSearchParams } from "next/navigation";

const Page = ({ params }: { params: { term: string } }) => {
  const [searchMoviesList, setSearchMoviesList] =
    useState<MovieListResponse | null>(null);
  const [searchedMovies, setSearchedMovies] = useState<Movie[] | null>(null);
  const [searchLoading, setSearchLoading] = useState(true);
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);

  useEffect(() => {
    const p = searchParams.get("page");
    setPage(Number(p));
  }, [searchParams]);

  useEffect(() => {
    const getMovies = async () => {
      const url = `https://api.themoviedb.org/3/search/movie?query=${params.term.toLowerCase()}&page=${page}&api_key=923961f70cb93f1baadf5d2b9dc1a5e9`;

      try {
        setSearchLoading(true);

        const res = await fetch(url, {
          cache: "force-cache",
        });

        if (!res.ok) {
          console.log("Failed to fetch data");
        }

        const data: MovieListResponse = await res.json();

        setSearchMoviesList(data);
        setSearchedMovies(data.results);
      } catch (error) {
        console.log(error);
      } finally {
        setSearchLoading(false);
      }
    };

    getMovies();
  }, [page, params.term]);

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
      {searchedMovies && <PageBanner movie={searchedMovies[0]} />}

      {!searchedMovies && !searchLoading && <div>No results found</div>}

      {/* Movies  */}
      {searchedMovies && (
        <Movies
          movies={removeFirstItem(searchedMovies!)!}
          loading={searchLoading}
        />
      )}

      {/* Pagination  */}
      {searchedMovies && searchMoviesList && (
        <Pagination
          loading={searchLoading}
          movieList={searchMoviesList!}
          movies={searchedMovies}
          page={page}
          term={params.term}
        />
      )}
    </div>
  );
};
export default Page;
