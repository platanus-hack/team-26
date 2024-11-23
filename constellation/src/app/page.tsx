import Link from "next/link";
import Button from "./components/ui/Button";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-5xl font-bold mb-4">Constellation</h1>
      <p className="text-xl mb-8">The future of Research Collaboration</p>
      <Link href="/graph">
        <Button label="Get Started" />
      </Link>
    </div>
  );
};

export default Home;
