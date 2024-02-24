"use client";

import Spinner from "@/app/components/Spinner";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function RegistrationForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password || !username) {
      return toast.error("All fields are required");
    }

    try {
      setLoading(true);
      setError("");
      const resUserExists = await fetch("api/auth/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        setError("User already exists");
        return;
      }

      const res = await fetch("api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      if (res.ok) {
        setUsername("");
        setPassword("");
        setEmail("");

        const login = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (login?.error) {
          setError("failed to login");
          return;
        }

        router.push("/");
      } else {
        setError("Registration failed");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <form onSubmit={onSubmit} className="w-[95%] max-w-md mt-6 mx-auto">
      <div className="mb-4">
        <label htmlFor="username" className="block mb-2">
          Username
        </label>
        <input
          type="text"
          name=""
          id="username"
          placeholder="username"
          className="h-12 w-full block border border-gray-900 rounded px-2 placeholder:text-xs bg-transparent text-xs focus:outline-none focus:placeholder:text-primary"
          defaultValue={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block mb-2">
          Email
        </label>
        <input
          type="email"
          name=""
          id="email"
          placeholder="email address"
          className="h-12 w-full block border border-gray-900 rounded px-2 placeholder:text-xs bg-transparent text-xs focus:outline-none focus:placeholder:text-primary"
          defaultValue={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block mb-2">
          Password
        </label>
        <input
          type="password"
          name=""
          id="password"
          placeholder="********"
          className="h-12 w-full block border border-gray-900 rounded px-2 placeholder:text-xs bg-transparent text-xs focus:outline-none focus:placeholder:text-primary"
          defaultValue={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        disabled={loading}
        className="h-12 bg-primary text-white block w-full rounded hover:bg-red-900"
      >
        {loading ? <Spinner /> : "Register"}
      </button>
    </form>
  );
}
