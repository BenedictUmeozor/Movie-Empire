"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const genres = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
];

const Genres = () => {
  const pathname = usePathname();

  return (
    <div>
      <ul>
        {genres.map((genre) => (
          <li key={genre.id}>
            <Link
              className={
                "flex items-center  gap-2 rounded-md p-4 mb-1 transition-all duration-150 ease-linear cursor-pointer text-[0.9rem] hover:bg-slate-900 " +
                (pathname.split("/").includes(String(genre.id))
                  ? "bg-primary text-white"
                  : "bg-transparent text-white")
              }
              href={`/genres/${genre.id}`}
            >
              {genre.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Genres;
