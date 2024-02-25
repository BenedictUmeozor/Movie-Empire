"use client";

import { Movie, MovieListResponse } from "@/types/types";

import { useEffect, useState } from "react";

import Pagination from "./components/Pagination";
import Movies from "./components/Movies";
import PageBanner from "./components/PageBanner";
import { removeFirstItem } from "@/utils/functions";
import { useSearchParams } from "next/navigation";
import Header from "@/app/components/Header";

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
      <Header term={params.term} />

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
      <footer className="mt-6 mb-4 text-center">
        <p className="text-xs text-gray-500">
          All rights reserved &copy;{" "}
          <a
            href="https://benedictumeozor.vercel.app"
            rel="noopener noreferrer"
          >
            Benedict
          </a>
        </p>
      </footer>
    </div>
  );
};
export default Page;
