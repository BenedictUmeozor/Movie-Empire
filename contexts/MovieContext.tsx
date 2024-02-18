"use client";

import { Movie, MovieListResponse } from "@/types/types";

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
  movieBankLoading: boolean;
  movieBank: Movie[] | null;
  trendingMoviesList: MovieListResponse | null;
  trendingMovies: Movie[] | null;
  trendingMoviesLoading: boolean;
  topRatedList: MovieListResponse | null;
  topMovies: Movie[] | null;
  topMoviesLoading: boolean;
};

const MovieContext = createContext<Context | null>(null);

export const useMovieContext = () => {
  return useContext(MovieContext);
};

export const MovieContextProvider = ({ children }: { children: ReactNode }) => {
  const [moviesList, setMoviesList] = useState<MovieListResponse | null>(null);
  const [movies, setMovies] = useState<Movie[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [movieBank, setMovieBank] = useState<Movie[] | null>(null);
  const [movieBankLoading, setMovieBankLoading] = useState(false);
  const [trendingMoviesList, setTrendingMoviesList] =
    useState<MovieListResponse | null>(null);
  const [trendingMovies, setTrendingMovies] = useState<Movie[] | null>(null);
  const [trendingMoviesLoading, setTrendingMoviesLoading] = useState(false);
  const [topRatedList, setTopRatedList] = useState<MovieListResponse | null>(
    null
  );
  const [topMovies, setTopMovies] = useState<Movie[] | null>(null);
  const [topMoviesLoading, setTopMoviesLoading] = useState(false);

  const _setPage = (pageNumber: number) => {
    setPage(pageNumber);
  };

  useEffect(() => {
    const getMovies = async () => {
      let url = `https://api.themoviedb.org/3/movie/top_rated?page=${page}&api_key=923961f70cb93f1baadf5d2b9dc1a5e9`;

      try {
        setTopMoviesLoading(true);
        setMovieBankLoading(true);

        const res = await fetch(url, {
          cache: "force-cache",
        });

        if (!res.ok) {
          console.log("Failed to fetch data");
        }

        const data: MovieListResponse = await res.json();

        setTopRatedList(data);

        setTopMovies(data.results);
      } catch (error) {
        console.log(error);
      } finally {
        setTopMoviesLoading(false);
        setMovieBankLoading(false);
      }
    };

    getMovies();
  }, [page]);

  useEffect(() => {
    const getMovies = async () => {
      let url = `https://api.themoviedb.org/3/movie/popular?page=${page}&api_key=923961f70cb93f1baadf5d2b9dc1a5e9`;

      try {
        setTrendingMoviesLoading(true);
        setMovieBankLoading(true);

        const res = await fetch(url, {
          cache: "force-cache",
        });

        if (!res.ok) {
          console.log("Failed to fetch data");
        }

        const data: MovieListResponse = await res.json();

        setTrendingMoviesList(data);
        setTrendingMovies(data.results);
      } catch (error) {
        console.log(error);
      } finally {
        setTrendingMoviesLoading(false);
        setMovieBankLoading(false);
      }
    };

    getMovies();
  }, [page]);

  const getMovieBank = async () => {
    try {
      setMovieBankLoading(true);
      const res = await fetch(
        `https://api.themoviedb.org/3/discover/movie?page=${Math.floor(
          Math.random() * 10
        )}&api_key=923961f70cb93f1baadf5d2b9dc1a5e9`,
        {
          cache: "force-cache",
        }
      );

      if (!res.ok) {
        console.log("Failed to fetch data");
      }

      const data: MovieListResponse = await res.json();
      setMovieBank(data.results);
    } catch (error) {
      console.log(error);
    } finally {
      setMovieBankLoading(false);
    }
  };

  const getAllMovies = async () => {
    let url = `https://api.themoviedb.org/3/discover/movie?page=${page}&api_key=923961f70cb93f1baadf5d2b9dc1a5e9`;

    try {
      setLoading(true);
      setMovieBankLoading(true);
      const res = await fetch(url, {
        cache: "force-cache",
      });

      if (!res.ok) {
        console.log("Failed to fetch data");
      }

      const data: MovieListResponse = await res.json();
      setMoviesList(data);
      setMovies(data.results);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setMovieBankLoading(false);
    }
  };

  useEffect(() => {
    getMovieBank().then(() => getAllMovies());
  }, [page]);

  return (
    <MovieContext.Provider
      value={{
        movies,
        moviesList,
        loading,
        page,
        _setPage,

        movieBank,
        movieBankLoading,
        trendingMovies,
        trendingMoviesList,
        trendingMoviesLoading,
        topMovies,
        topMoviesLoading,
        topRatedList,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
