import Movies from "./components/Movies";
import Banner from "./components/Banner";
import Pagination from "./components/Pagination";

import RemoveStates from "./components/RemoveStates";

import Header from "./components/Header";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session);

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
