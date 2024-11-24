import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/app/components/ui/Input";
import Button from "@/app/components/ui/Button";
import Link from "next/link";
import useAuth from "@/app/hooks/useAuth";
import Image from "next/image";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated()) {
      router.push("/graph");
    }
  }, [isAuthenticated]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const success: boolean = await login(username, password, setError);
    if (success) {
      router.push("/graph");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 font-sans font-thin">
      <Image
        src="logo.svg"
        width={200}
        height={200}
        alt={"constellation logo"}
        className="h-32 w-auto"
        priority
      />
      <h1 className="text-5xl">Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <div>
          <label htmlFor="username">Username</label>
          <Input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Button label="Login" type="submit" onClick={() => {}} />
      </form>
      <label>
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-blue-500">
          Register
        </Link>
      </label>
    </div>
  );
};

export default Login;
