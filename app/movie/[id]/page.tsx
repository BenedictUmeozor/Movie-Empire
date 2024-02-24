"use client";

import { genres } from "@/app/components/Genres";
import Header from "@/app/components/Header";
import Movie from "@/app/components/Movie";
import {
  MovieListResponse,
  Movie as MovieType,
  SingleMovie,
} from "@/types/types";
import { shuffleArray } from "@/utils/functions";
import { Rating } from "@smastrom/react-rating";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Video, Watch } from "react-feather";
import { MoonLoader } from "react-spinners";
import Overview from "./components/Overview";
import ProductionCompanies from "./components/ProductionCompanies";
import ProductionCountries from "./components/ProductionCountries";
import Actors from "./components/Cast";
import Recommendations from "./components/Recommendations";

export default function Page({ params }: { params: { id: string } }) {
  const [movie, setMovie] = useState<SingleMovie | null>(null);
  const [movies, setMovies] = useState<MovieType[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovie = async () => {
      let url = `https://api.themoviedb.org/3/movie/${params.id}?append_to_response=credits&api_key=923961f70cb93f1baadf5d2b9dc1a5e9`;

      try {
        setLoading(true);
        const res = await fetch(url, {
          cache: "force-cache",
        });

        if (!res.ok) {
          console.log("Failed to fetch data");
        }

        const data: SingleMovie = await res.json();
        setMovie(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getMovie();
  }, [params.id]);

  useEffect(() => {
    const getMovies = async () => {
      let url = `https://api.themoviedb.org/3/movie/${params.id}/recommendations?api_key=923961f70cb93f1baadf5d2b9dc1a5e9`;

      try {
        setLoading(true);
        const res = await fetch(url, {
          cache: "force-cache",
        });

        if (!res.ok) {
          console.log("Failed to fetch data");
        }

        const data: MovieListResponse = await res.json();
        setMovies(shuffleArray(data.results));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, [params.id]);

  return (
    <>
      <div className="p-4">
        <Header />
        {loading && (
          <>
            <div className="flex items-center justify-center mt-8">
              <MoonLoader color="#AC1B1B" size={100} />
            </div>
          </>
        )}
        {movie && !loading && (
          <>
            <div className="mt-8 grid grid-cols-6 gap-10 max-md:block">
              <div className="col-span-2">
                <div className="h-[50vh] max-md:hidden">
                  <Image
                    src={
                      movie?.poster_path
                        ? "https://image.tmdb.org/t/p/w500" + movie.poster_path
                        : "/image2.jpg"
                    }
                    height={200}
                    width={200}
                    priority={false}
                    alt="image"
                    className="h-full w-full block rounded object-cover "
                  />
                </div>
              </div>
              <div className="col-span-4 text-white">
                <h1 className="text-4xl text-center mb-4">{movie?.title}</h1>
                <p className="text-center text-2xl italic">{movie?.tagline}</p>
                <div className="flex items-center justify-evenly my-4">
                  <div className="flex items-center gap-2">
                    {movie?.vote_average && (
                      <Rating
                        value={movie.vote_average / 2}
                        className="max-w-[100px]"
                        readOnly
                      />
                    )}
                    <span>{movie?.vote_average.toFixed(1) + "/10"}</span>
                  </div>
                  <div>
                    <p className="flex items-center gap-1 text-[0.92rem]">
                      <Watch className="w-4" /> {movie?.runtime + " minutes"}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 justify-center mt-4">
                  {movie?.genres.map(({ id }) =>
                    genres.map((genre) =>
                      genre.id === id ? (
                        <span key={id} className="text-base text-gray-500">
                          {genre.name}
                        </span>
                      ) : (
                        ""
                      )
                    )
                  )}
                </div>

                <div className="h-[70vh] my-8 md:hidden">
                  <Image
                    src={
                      movie?.poster_path
                        ? "https://image.tmdb.org/t/p/w500" + movie.poster_path
                        : "/image2.jpg"
                    }
                    height={200}
                    width={200}
                    priority={false}
                    alt="image"
                    className="h-full block rounded mx-auto w-[90%] object-cover"
                  />
                </div>

                <Overview overview={movie.overview} />

                {movie.production_companies.length > 0 && (
                  <ProductionCompanies companies={movie.production_companies} />
                )}

                {movie.production_countries.length > 0 && (
                  <ProductionCountries countries={movie.production_countries} />
                )}

                <div className="my-8 max-md:text-center">
                  <a
                    href={`https://www.imdb.com/title/${movie.imdb_id}`}
                    target="_blank"
                    rel="noopener noreferer"
                    className="py-2 px-6 bg-primary text-white rounded inline-flex items-center gap-1 text-xs mt-4"
                  >
                    <Video className="w-4" />
                    Watch trailer
                  </a>
                </div>
              </div>
            </div>

            {movie.credits.cast && movie.credits.cast.length > 0 && (
              <Actors casts={movie.credits.cast} />
            )}

            <div className="mt-24 mb-4">
              <h2 className="text-4xl text-center text-white mb-8">
                You might also like
              </h2>
              {movies && (
                <>
                  <Recommendations movies={movies} />
                </>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
