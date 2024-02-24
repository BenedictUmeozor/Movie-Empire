"use client";

import Spinner from "@/app/components/Spinner";
import { signIn } from "next-auth/react";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      const login = await signIn("credentials", {
        email,
        password,
        callbackUrl: "/",
      });

      if (login?.error) {
        toast.error("An error occurred");
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
        {loading ? <Spinner /> : "Login"}
      </button>
    </form>
  );
}
