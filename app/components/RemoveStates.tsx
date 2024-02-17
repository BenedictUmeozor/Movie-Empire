"use client";

import { useMovieContext } from "@/contexts/MovieContext";
import { useEffect } from "react";

const RemoveStates = () => {
  const context = useMovieContext();

  useEffect(() => {
    context?._setSearchTerm("");
  }, []);

  return <div></div>;
};
export default RemoveStates;
