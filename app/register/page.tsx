"use client";

import { useMovieContext } from "@/contexts/MovieContext";
import useInterval from "@/hooks/useInterval";
import { Movie, MovieListResponse, SingleMovie } from "@/types/types";
import Link from "next/link";
import { useEffect, useState } from "react";

const Page = () => {
  const context = useMovieContext();
  const [movies, setMovies] = useState<Movie[] | null>(null);
  const [movie, setMovie] = useState<SingleMovie | null>(null);
  const [randomIndex, setRandomIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  useInterval(() => {
    if (context && context.movieBank && context.movieBank.length > 0) {
      setRandomIndex(Math.floor(Math.random() * context.movieBank.length));
    }
  }, 5000);

  useEffect(() => {
    if (context && context.movieBank && context.movieBank.length > 0) {
      setMovies(context.movieBank);
    }
  }, [context, context?.movieBank]);

  useEffect(() => {
    const getMovieBank = async () => {
      try {
        setLoading(true);
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
        setMovies(data.results);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getMovieBank();
  }, []);

  useEffect(() => {
    const getMovie = async () => {
      let url = movies
        ? `https://api.themoviedb.org/3/movie/${movies[randomIndex].id}?api_key=923961f70cb93f1baadf5d2b9dc1a5e9`
        : "";

      try {
        const res = await fetch(url, {
          cache: "force-cache",
        });

        if (!res.ok) {
          console.log("Failed to fetch data");
        }

        const data: SingleMovie = await res.json();
        setMovie(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (
      context &&
      context.movieBank &&
      context.movieBank.length > 0 &&
      context.movieBank[0].id
    ) {
      if (movies) {
        getMovie();
      }
    }
  }, [context, context?.movieBank, randomIndex, movies]);

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url(https://image.tmdb.org/t/p/w1280/${
          movies && movies[randomIndex].backdrop_path
        })`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        backgroundColor: "#000",
        zIndex: 1,
        width: "100%",
      }}
      className="text-white flex items-center justify-center"
    >
      <div className="w-full max-w-md mx-auto">
        <Link href="/" className="text-3xl font-bold text-center block">
          Movie.<span className="text-primary">Empire</span>
        </Link>
        <div>
          <h3 className="text-center my-2">Create your account</h3>
          <p className="text-xs text-gray-500 text-center">
            The empire of movies
          </p>
        </div>
        <form action="#" className="w-[95%] max-w-md mt-6 mx-auto">
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">
              Email
            </label>
            <input
              type="email"
              name=""
              id="email"
              placeholder="email address"
              className="h-12 w-full block border border-gray-900 rounded px-2 placeholder:text-xs bg-transparent text-xs focus:outline-none focus:placeholder:text-primary"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2">
              Password
            </label>
            <input
              type="password"
              name=""
              id="password"
              placeholder="********"
              className="h-12 w-full block border border-gray-900 rounded px-2 placeholder:text-xs bg-transparent text-xs focus:outline-none focus:placeholder:text-primary"
            />
          </div>
          <button className="h-12 bg-primary text-white block w-full rounded hover:bg-red-900">
            Login
          </button>
        </form>
        <p className="mt-4 text-xs text-gray-400 text-center">
          Already have an account?{" "}
          <Link className="text-primary hover:underline" href={"/login"}>
            login
          </Link>
        </p>
      </div>
    </div>
  );
};
export default Page;
