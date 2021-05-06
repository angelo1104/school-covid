import Header from "../components/Header/Header";
import Spinner from "../components/Spinner/Spinner";

export default function Home() {
  return (
    <>
      <Header />
      <main className={""}>
        <Spinner />
      </main>
    </>
  );
}
