import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Input from "@/app/components/ui/Input";
import Button from "@/app/components/ui/Button";
import Link from "next/link";
import Image from "next/image";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password: string) => {
    // Example validation: at least 8 characters, one uppercase, one lowercase, one number
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return regex.test(password);
  };

  const handleRegister = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!validateEmail(username)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!validatePassword(password)) {
      setError(
        "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, and a number."
      );
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    const url = process.env.NEXT_PUBLIC_API_URL + "user/register/";
    console.log(url);
    try {
      await axios.post(url, {
        username: username,
        email: username,
        password: password,
      });

      router.push("/login");
    } catch (err) {
      // Error handling for duplicate usernames
      if (axios.isAxiosError(err) && err.response?.status === 409) {
        setError("Username already exists");
      } else {
        setError("An error occurred");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 font-sans font-thin">
      <Image
        src="logo.svg"
        width={200}
        height={200}
        alt={"tensor logo"}
        className="h-32 w-auto"
        priority
      />
      <h1 className="text-5xl">Register</h1>
      <form
        onSubmit={handleRegister}
        className="flex flex-col gap-4 w-80 relative"
      >
        <div>
          <label htmlFor="username">Email</label>
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
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <Button label="Register" type="submit" onClick={() => {}} />
      </form>
      <label>
        Already have an account?{" "}
        <Link href="/login" className="text-blue-500">
          Login
        </Link>
      </label>
    </div>
  );
};

export default Register;
