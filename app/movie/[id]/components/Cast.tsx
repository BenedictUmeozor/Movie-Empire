import { Cast } from "@/types/types";
import Image from "next/image";

type Props = {
  casts: Cast[];
};
export default function Actors({ casts }: Props) {
  return (
    <div className="mt-10 max-lg:text-center">
      <h3 className="mb-3 text-xl ">Top Cast</h3>
      <div className="grid grid-cols-6 gap-8 mt-6 max-lg:grid-cols-3">
        {casts.length > 6
          ? casts.slice(0, 6).map((person) => (
              <div key={person.id}>
                <Image
                  src={
                    person.profile_path
                      ? "https://image.tmdb.org/t/p/w500" + person.profile_path
                      : "/download.png"
                  }
                  alt={person.name}
                  width={200}
                  height={200}
                  className="max-w-full rounded transition-all duration-300 ease-in hover:scale-105"
                />
                <div>
                  <p className="text-[0.95rem] text-white my-1">
                    {person.name}
                  </p>
                  <p className="text-gray-500 text-xs">{person.character}</p>
                </div>
              </div>
            ))
          : casts.map((person) => (
              <div key={person.id}>
                <Image
                  src={
                    person.profile_path
                      ? "https://image.tmdb.org/t/p/w500" + person.profile_path
                      : "/download.png"
                  }
                  alt={person.name}
                  width={200}
                  height={200}
                  className="max-w-full rounded transition-all duration-300 ease-in hover:scale-105 cursor-pointer"
                />
                <div>
                  <p className="text-[0.95rem] text-white my-1">
                    {person.name}
                  </p>
                  <p className="text-gray-500 text-xs">{person.character}</p>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
