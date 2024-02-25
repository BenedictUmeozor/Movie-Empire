import Movies from "../components/Movies";
import Pagination from "../components/Pagination";
import RemoveStates from "../components/RemoveStates";
import PageBanner from "../components/PageBanner";
import Header from "../components/Header";

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
