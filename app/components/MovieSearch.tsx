"use client";

import { useMovieContext } from "@/contexts/MovieContext";
import { useRouter } from "next/navigation";
import { KeyboardEvent } from "react";
import { Search } from "react-feather";

const MovieSearch = ({ term }: { term?: string }) => {
  const context = useMovieContext();
  const router = useRouter();

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (
      !context?.loading &&
      event.key === "Enter" &&
      event.currentTarget.value
    ) {
      router.push(`/search/${event.currentTarget.value}?page=1`);
    }
  };

  return (
    <div className="h-12 relative flex-[3]">
      <Search className="w-4 text-gray-200 absolute top-[50%] left-[5%] -translate-y-[50%]" />
      <input
        type="text"
        placeholder="Search anything"
        className="h-full w-full block border border-gray-900 rounded-2xl px-2 pl-[15%] placeholder:text-xs bg-transparent text-xs focus:outline-none focus:placeholder:text-primary"
        onKeyDown={handleKeyDown}
        defaultValue={term ? term : ""}
      />
    </div>
  );
};

export default MovieSearch;
