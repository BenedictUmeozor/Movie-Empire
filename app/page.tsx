import Movies from "./components/Movies";
import Banner from "./components/Banner";
import Pagination from "./components/Pagination";

import RemoveStates from "./components/RemoveStates";

import Header from "./components/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Movie Empire - Browse",
  description: "Website for movies",
};

async function Home() {
  return (
    <div>
      {/* header  */}
      <RemoveStates />
      <Header />

      {/* banner  */}
      <Banner />

      {/* Movies  */}
      <Movies />

      {/* Pagination  */}
      <Pagination />
      <footer className="mt-6 mb-4 text-center">
        <p className="text-xs text-gray-500">
          All rights reserved &copy;{" "}
          <a
            href="https://benedictumeozor.vercel.app"
            rel="noopener noreferrer"
          >
            Benedict
          </a>
        </p>
      </footer>
    </div>
  );
}

export default Home;
