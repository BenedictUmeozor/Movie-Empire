"use client";

import useTypeWriter from "react-typewriter-hook";

export default function Loading() {
  const text = useTypeWriter("Empire");

  return (
    <div className="h-screen bg-dark flex items-center justify-center">
      <div className="text-3xl font-bold text-center">
        Movie.<span className="text-primary">{text}</span>
      </div>
    </div>
  );
}
