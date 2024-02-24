"use client";

import { useMovieContext } from "@/contexts/MovieContext";
import useInterval from "@/hooks/useInterval";
import { Movie, MovieListResponse } from "@/types/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import RegistrationForm from "./components/RegistrationForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Page = () => {
  const { status } = useSession();
  const router = useRouter();

  if (status === "authenticated") {
    router.push("/");
  }

  const context = useMovieContext();
  const [movies, setMovies] = useState<Movie[] | null>(null);
  const [randomIndex, setRandomIndex] = useState(0);

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
      }
    };

    getMovieBank();
  }, []);

  return (
    <>
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
          <RegistrationForm />
          <p className="mt-4 text-xs text-gray-400 text-center">
            Already have an account?{" "}
            <Link className="text-primary hover:underline" href={"/login"}>
              login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};
export default Page;
