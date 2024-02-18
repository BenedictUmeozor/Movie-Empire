import Movies from "./components/Movies";
import Banner from "./components/Banner";
import Pagination from "./components/Pagination";

import RemoveStates from "./components/RemoveStates";

import Header from "./components/Header";

function Home() {
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
    </div>
  );
}

export default Home;
