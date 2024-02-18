"use client";

import { useMovieContext } from "@/contexts/MovieContext";
import useInterval from "@/hooks/useInterval";
import { Movie, MovieListResponse, SingleMovie } from "@/types/types";
import { Rating } from "@smastrom/react-rating";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Video } from "react-feather";

const Banner = () => {
  const context = useMovieContext();
  const [movies, setMovies] = useState<Movie[] | null>(null);
  const [movie, setMovie] = useState<SingleMovie | null>(null);
  const [randomIndex, setRandomIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  useInterval(() => {
    if (context && context.movieBank && context.movieBank.length > 0) {
      setRandomIndex(Math.floor(Math.random() * context.movieBank.length));
    }
  }, 10000);

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
    <>
      {movies && !loading && (
        <div
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://image.tmdb.org/t/p/w1280/${movies[randomIndex].backdrop_path})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            minHeight: "85vh",
            backgroundColor: "#000",
            zIndex: 1,
            width: "100%",
          }}
          className="relative block w-[95%] mx-auto md:w-[100%]"
        >
          {/* <Image
            src={
              context?.movies[0].backdrop_path
                ? "https://image.tmdb.org/t/p/w1280" +
                  context?.movies[0].backdrop_path
                : "/image2.jpg"
            }
            alt={context?.movies[0].title}
            width={500}
            height={500}
            priority={false}
            className="h-full absolute top-0 rounded left-0 max-w-full w-full"
          /> */}
          <div className="absolute top-0 left-0 h-full w-full z-10 flex items-end p-4">
            <div className="p-4 max-md:text-center">
              <Link
                href={"/movie/" + movies[randomIndex].id}
                className="text-white block mb-2 text-3xl"
              >
                {movies[randomIndex].title}
              </Link>
              <Link
                href={"/movie/" + movies[randomIndex].id}
                className="text-xs block text-gray-300 w-[80%] max-w-96 max-md:w-full max-md:max-w-full leading-6 max-md:leading-5"
              >
                {movies[randomIndex].overview}
              </Link>
              {movies[randomIndex].vote_average && (
                <Rating
                  value={movies[randomIndex].vote_average / 2}
                  className="max-w-[100px] max-md:mx-auto mt-4"
                  readOnly
                />
              )}
              {movie && (
                <a
                  href={`https://www.imdb.com/title/${movie.imdb_id}`}
                  target="_blank"
                  rel="noopener noreferer"
                  className="py-2 px-6 bg-primary text-white rounded inline-flex items-center gap-1 text-xs mt-4"
                >
                  <Video className="w-4" />
                  Watch trailer
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Banner;
