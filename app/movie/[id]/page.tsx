"use client";

import { genres } from "@/app/components/Genres";
import Movie from "@/app/components/Movie";
import {
  MovieListResponse,
  Movie as MovieType,
  SingleMovie,
} from "@/types/types";
import { shuffleArray } from "@/utils/functions";
import { Rating } from "@smastrom/react-rating";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Lock, Sun, Watch } from "react-feather";
import { MoonLoader } from "react-spinners";

export default function Page({ params }: { params: { id: string } }) {
  const [movie, setMovie] = useState<SingleMovie | null>(null);
  const [movies, setMovies] = useState<MovieType[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovie = async () => {
      let url = `https://api.themoviedb.org/3/movie/${params.id}?api_key=923961f70cb93f1baadf5d2b9dc1a5e9`;

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
  }, []);

  useEffect(() => {
    const getMovies = async () => {
      let url = `https://api.themoviedb.org/3/movie/${params.id}/similar?api_key=923961f70cb93f1baadf5d2b9dc1a5e9`;

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
  }, []);

  return (
    <>
      <div className="p-4">
        <header className="flex sticky top-0 z-[100] items-center justify-between bg-dark text-white px-4 py-4 border-b-2 border-gray-900">
          <div className="">
            <Sun className="w-5 text-white" />
          </div>
          <div className="flex  items-center justify-between gap-4">
            <div className="flex-1 flex items-center justify-end">
              <Link href="/" className="flex items-center gap-2">
                <span className="text-[0.9rem]">Login</span>{" "}
                <Lock className="w-4 text-white" />
              </Link>
            </div>
          </div>
        </header>
        {loading && (
          <>
            <div className="flex items-center justify-center mt-8">
              <MoonLoader color="#AC1B1B" size={100} />
            </div>
          </>
        )}
        {movie && !loading && (
          <>
            <div className="mt-8 grid grid-cols-6 gap-10">
              <div className="col-span-2">
                <div className="h-96">
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
                    className="h-full w-full block rounded"
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

                <div className="my-6">
                  <h2 className="mb-2 text-lg">Overview</h2>
                  <p className="text-gray-400 text-[0.9rem]">
                    {movie?.overview}
                  </p>
                </div>

                {movie.production_companies.length > 0 && (
                  <>
                    <div className="mt-10">
                      <h3 className="mb-2 text-lg">Production Companies</h3>
                      <div className="grid grid-cols-4 gap-4 mt-6">
                        {movie.production_companies.map(
                          (company) =>
                            company.logo_path && (
                              <div key={company.id}>
                                <Image
                                  src={
                                    company.logo_path
                                      ? "https://image.tmdb.org/t/p/w500" +
                                        company.logo_path
                                      : "/download.png"
                                  }
                                  alt={company.name}
                                  width={200}
                                  height={200}
                                  className="max-w-full"
                                />
                              </div>
                            )
                        )}
                      </div>
                    </div>
                  </>
                )}

                {movie.production_countries.length > 0 && (
                  <div className="mt-10">
                    <h3 className="mb-2 text-lg">Production Countries</h3>
                    <div className="flex flex-wrap gap-3">
                      {movie.production_countries.map((country) => (
                        <div
                          key={country.iso_3166_1}
                          className="inline-flex items-center gap-1"
                        >
                          <Image
                            src={`https://flagcdn.com/48x36/${country.iso_3166_1.toLowerCase()}.png`}
                            alt={country.name}
                            width={20}
                            height={20}
                            className="w-5"
                          />
                          <span className="text-xs">{country.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-24 mb-4">
              <h2 className="text-4xl text-center text-white mb-8">
                You might also like
              </h2>
              {movies && (
                <>
                  <div className="grid grid-cols-4 gap-4 px-6 my-4">
                    {movies.length > 0 ? (
                      movies.map((movie) => (
                        <Movie key={movie.id} movie={movie} />
                      ))
                    ) : (
                      <div className="text-white my-8">
                        Oops! No results was found
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
