import Movie from "@/app/components/Movie";
import { Movie as MovieType } from "@/types/types";

type Props = {
  movies: MovieType[];
};
export default function Recommendations({ movies }: Props) {
  return (
    <div className="grid grid-cols-4 gap-4 px-6 my-4 max-lg:grid-cols-2 max-md:grid-cols-1">
      {movies.length > 0 ? (
        movies.map((movie) => <Movie key={movie.id} movie={movie} />)
      ) : (
        <div className="text-white my-8">Oops! No results was found</div>
      )}
    </div>
  );
}
