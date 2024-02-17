"use client";

import { Movie, MovieListResponse } from "@/types/types";
import { shuffleArray } from "@/utils/functions";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname()
  const [moviesList, setMoviesList] = useState<MovieListResponse | null>(null);
  const [movies, setMovies] = useState<Movie[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [movieBank, setMovieBank] = useState<Movie[] | null>(null);
  const [movieBankLoading, setMovieBankLoading] = useState(true);
  const [trendingMoviesList, setTrendingMoviesList] =
    useState<MovieListResponse | null>(null);
  const [trendingMovies, setTrendingMovies] = useState<Movie[] | null>(null);
  const [trendingMoviesLoading, setTrendingMoviesLoading] = useState(true);
  const [topRatedList, setTopRatedList] = useState<MovieListResponse | null>(
    null
  );
  const [topMovies, setTopMovies] = useState<Movie[] | null>(null);
  const [topMoviesLoading, setTopMoviesLoading] = useState(true);

  const _setPage = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const _setSearchTerm = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  useEffect(() => {
    const getMovies = async () => {
      let url = `https://api.themoviedb.org/3/movie/top_rated?page=${page}&api_key=923961f70cb93f1baadf5d2b9dc1a5e9`;

      if (searchTerm.trim()) {
        url = `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&page=${page}&api_key=923961f70cb93f1baadf5d2b9dc1a5e9`;
      }

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
        if (searchTerm) {
          setTopMovies(data.results);
        } else {
          setTopMovies(shuffleArray(data.results));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setTopMoviesLoading(false);
        setMovieBankLoading(false);
      }
    };

    getMovies();
  }, [searchTerm, page]);

  useEffect(() => {
    const getMovies = async () => {
      let url = `https://api.themoviedb.org/3/movie/popular?page=${page}&api_key=923961f70cb93f1baadf5d2b9dc1a5e9`;

      if (searchTerm.trim()) {
        url = `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&page=${page}&api_key=923961f70cb93f1baadf5d2b9dc1a5e9`;
      }

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
        if (searchTerm) {
          setTrendingMovies(data.results);
        } else {
          setTrendingMovies(shuffleArray(data.results));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setTrendingMoviesLoading(false);
        setMovieBankLoading(false);
      }
    };

    getMovies();
  }, [searchTerm, page]);

  useEffect(() => {
    const getMovies = async () => {

      try {
        setMovieBankLoading(true);
        const res = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=923961f70cb93f1baadf5d2b9dc1a5e9`,
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

    getMovies();
  }, []);

  useEffect(() => {
    const getMovies = async () => {
      let url = `https://api.themoviedb.org/3/discover/movie?page=${page}&api_key=923961f70cb93f1baadf5d2b9dc1a5e9`;

      if (searchTerm.trim()) {
        url = `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&page=${page}&api_key=923961f70cb93f1baadf5d2b9dc1a5e9`;
      }

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
        if (searchTerm) {
          setMovies(data.results);
        } else {
          setMovies(shuffleArray(data.results));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
        setMovieBankLoading(false);
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
