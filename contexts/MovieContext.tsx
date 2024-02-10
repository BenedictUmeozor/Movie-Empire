"use client";

import { Movie, MovieListResponse } from "@/types/types";
import { shuffleArray } from "@/utils/functions";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type Context = {
  movies: Movie[] | null;
  moviesList: MovieListResponse | null;
  loading: boolean;
  page: number;
  _setPage(page: number): void;
  searchTerm: string;
  _setSearchTerm(term: string): void;
};

const MovieContext = createContext<Context | null>(null);

export const useMovieContext = () => {
  return useContext(MovieContext);
};

export const MovieContextProvider = ({ children }: { children: ReactNode }) => {
  const [moviesList, setMoviesList] = useState<MovieListResponse | null>(null);
  const [movies, setMovies] = useState<Movie[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const _setPage = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const _setSearchTerm = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  useEffect(() => {
    const getMovies = async () => {
      let url = `https://api.themoviedb.org/3/discover/movie?page=${page}&api_key=923961f70cb93f1baadf5d2b9dc1a5e9`;

      if (searchTerm.trim()) {
        url = `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&page=${page}&api_key=923961f70cb93f1baadf5d2b9dc1a5e9`;
      }

      try {
        setLoading(true);
        const res = await fetch(url, {
          cache: "force-cache",
        });

        if (!res.ok) {
          console.log("Failed to fetch data");
        }

        const data: MovieListResponse = await res.json();
        setMoviesList(data);
        setMovies(shuffleArray(data.results));
        console.log(data)
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, [page, searchTerm]);
  return (
    <MovieContext.Provider
      value={{
        movies,
        moviesList,
        loading,
        page,
        _setPage,
        searchTerm,
        _setSearchTerm,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
