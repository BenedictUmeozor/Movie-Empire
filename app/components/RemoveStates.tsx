"use client";

import { useMovieContext } from "@/contexts/MovieContext";
import { useEffect } from "react";

const RemoveStates = () => {
  const context = useMovieContext();

  const removeStates = () => {
    context?._setPage(1);
  };

  useEffect(() => {
    removeStates();
  }, []);

  return <div></div>;
};
export default RemoveStates;
