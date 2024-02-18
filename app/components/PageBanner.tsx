"use client";

import { useMovieContext } from "@/contexts/MovieContext";
import { Movie, SingleMovie } from "@/types/types";
import { Rating } from "@smastrom/react-rating";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Video } from "react-feather";

const PageBanner = () => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [singleMovie, setSingleMovie] = useState<SingleMovie | null>(null);
  const pathname = usePathname();
  const context = useMovieContext();
  const targetRef = useRef<HTMLDivElement>(null);

  const generateRandId = (movies: Movie[]) => {
    return Math.floor(Math.random() * movies.length);
  };

  const scrollToTarget = () => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (context && context.page && context.page !== 1) {
      scrollToTarget();
    }
  }, [context, context?.page]);

  useEffect(() => {
    if (
      context &&
      context.topMovies &&
      context.trendingMovies &&
      context.movies
    ) {
      if (pathname === "/top-rated") {
        setMovie(context.topMovies[generateRandId(context.topMovies)]);
      } else if (pathname === "/trending") {
        setMovie(
          context.trendingMovies[generateRandId(context.trendingMovies)]
        );
      } 
    }
  }, [context, pathname]);

  useEffect(() => {
    const getMovie = async () => {
      let url = movie
        ? `https://api.themoviedb.org/3/movie/${movie.id}?api_key=923961f70cb93f1baadf5d2b9dc1a5e9`
        : "";

      try {
        const res = await fetch(url, {
          cache: "no-cache",
        });

        if (!res.ok) {
          console.log("Failed to fetch data");
        }

        const data: SingleMovie = await res.json();
        setSingleMovie(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (movie) {
      getMovie();
    }
  }, [movie]);

  return (
    <>
      {movie && (
        <div
          ref={targetRef}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://image.tmdb.org/t/p/w1280/${movie.backdrop_path})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            minHeight: "85vh",
            backgroundColor: "#000",
            zIndex: 1,
            width: "100vw"
          }}
          className="relative block w-[95%] mx-auto rounded"
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
                href={"/movie/" + movie.id}
                className="text-white block mb-2 text-3xl"
              >
                {movie.title}
              </Link>
              <Link
                href={"/movie/" + movie.id}
                className="text-xs block text-gray-300 w-[80%] max-w-96 max-md:w-full max-md:max-w-full leading-6 max-md:leading-5"
              >
                {movie.overview}
              </Link>
              {movie.vote_average && (
                <Rating
                  value={movie.vote_average / 2}
                  className="max-w-[100px] max-md:mx-auto mt-4"
                  readOnly
                />
              )}
              {singleMovie && (
                <a
                  href={`https://www.imdb.com/title/${singleMovie.imdb_id}`}
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
export default PageBanner;
