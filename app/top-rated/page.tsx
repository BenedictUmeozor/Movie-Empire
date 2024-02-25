import Movies from "../components/Movies";
import Pagination from "../components/Pagination";
import RemoveStates from "../components/RemoveStates";
import PageBanner from "../components/PageBanner";
import Header from "../components/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Movie Empire - Top Rated",
  description: "Website for movies",
};

export default function Page() {
  return (
    <div>
      {/* header  */}
      <RemoveStates />
      <Header />

      {/* banner  */}
      <PageBanner />

      {/* Movies  */}
      <Movies />

      {/* Pagination  */}
      <Pagination />
    </div>
  );
}
