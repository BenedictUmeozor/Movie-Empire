import { Movie as MovieType } from "@/types/types";
import Image from "next/image";
import { genres } from "./Genres";
import Link from "next/link";

type Props = {
  movie: MovieType;
};

function Movie({ movie }: Props) {
  return (
    <Link href={'/movie/' + movie.id} className="h-96 flex flex-col rounded-lg cursor-pointer transition-all duration-150 ease-linear hover:scale-105">
      <div className="h-[80%]">
        <Image
          src={
            movie.poster_path
              ? "https://image.tmdb.org/t/p/w500" + movie.poster_path
              : "/image2.jpg"
          }
          alt="image"
          width={200}
          height={200}
          priority={false}
          className="w-full h-full rounded"
        />
      </div>
      <div className="h-[20%] bg-[#141313] text-white px-2 py-2 pb-4 flex items-center">
        <div>
          <p className="mb-1">{movie.title}</p>
          <div className="flex flex-wrap gap-1">
            {movie.genre_ids.map((id) =>
              genres.map((genre) =>
                genre.id === id ? (
                  <span key={id} className="text-xs text-gray-500">{genre.name}</span>
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
