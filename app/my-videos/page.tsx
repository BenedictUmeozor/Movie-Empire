import Header from "../components/Header";
import Protected from "../components/Protected";

export default function Page() {
  return (
    <Protected>
      <div>
        <Header />
        <div className="px-2">
          <h2 className="my-8 text-xl font-semibold">My Videos...</h2>
        </div>
      </div>
    </Protected>
  );
}
