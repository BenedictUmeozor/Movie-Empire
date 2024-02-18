import { Movie as MovieType } from "@/types/types";
import Image from "next/image";
import { genres } from "./Genres";
import Link from "next/link";
import { Rating } from "@smastrom/react-rating";

type Props = {
  movie: MovieType;
};

function Movie({ movie }: Props) {
  return (
    <Link
      href={"/movie/" + movie.id}
      className="h-96 flex flex-col gap-2 bg-[#141313] rounded-lg cursor-pointer transition-all duration-150 ease-linear hover:scale-105 max-md:w-[80%] max-md:mx-auto"
    >
      <div className="h-[80%]">
        <Image
          src={
            movie.poster_path
              ? "https://image.tmdb.org/t/p/w500" + movie.poster_path
              : "/download.png"
          }
          alt="image"
          width={200}
          height={200}
          priority={false}
          className="w-full h-full rounded"
        />
      </div>
      <div className="h-[20%] bg-[#141313] text-white px-2 py-4 pb-8 flex items-center">
        <div>
          <div className="flex items-center gap-1 mt-1">
            {movie?.vote_average && (
              <Rating
                value={movie.vote_average / 2}
                className="max-w-[90px]"
                readOnly
              />
            )}
            <span className="text-xs">{movie.vote_average.toFixed(1) + "/10"}</span>
          </div>
          <p className="mb-1">
            {movie.title.length > 15
              ? movie.title.substring(0, 15) + "..."
              : movie.title}
          </p>
          <div className="flex flex-wrap gap-1">
            {movie.genre_ids.map((id) =>
              genres.map((genre) =>
                genre.id === id ? (
                  <Link
                    href={`/genres/${genre.id}`}
                    key={id}
                    className="text-xs text-gray-500 hover:text-gray-600 hover:underline"
                  >
                    {genre.name}
                  </Link>
                ) : (
                  ""
                )
              )
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
export default Movie;
