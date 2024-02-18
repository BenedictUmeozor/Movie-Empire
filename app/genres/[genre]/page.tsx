"use client";

import { Movie, MovieListResponse } from "@/types/types";

import { useEffect, useState } from "react";
import PageBanner from "./components/PageBanner";
import Movies from "./components/Movies";
import { removeFirstItem } from "@/utils/functions";
import Pagination from "./components/Pagination";
import Header from "@/app/components/Header";

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
      <Header />

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
