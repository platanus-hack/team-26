import Link from "next/link";
import Image from "next/image";
import Button from "./components/ui/Button";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Image
        src="logo.svg"
        width={200}
        height={200}
        alt={"constellation logo"}
        className="h-32 w-auto mb-8"
        priority
      />
      <h1 className="text-5xl font-bold mb-4">Constellation</h1>
      <p className="text-xl mb-8">The future of Research Colaboration</p>
      <Link href="/login">
        <Button label="Get Started" />
      </Link>
    </div>
  );
};

export default Home;
