"use client";
import { useState } from "react";
import { auth } from "@/firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [buttonColor, setButtonColor] = useState("bg-green-500");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Registration successful!");
      router.push("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-green-400 via-blue-500 to-indigo-600">
      <div className="bg-white p-10 rounded-lg shadow-2xl max-w-sm w-full">
        <h1 className="text-4xl font-semibold text-center text-gray-800 mb-6">Register</h1>

        <form onSubmit={handleRegister} className="flex flex-col gap-6">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 placeholder:text-gray-500 text-black"
          />
          <div className="relative">
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 w-full placeholder:text-gray-500 text-black"
            />
          </div>
          <button
            type="submit"
            className={`py-3 rounded-lg ${buttonColor} hover:bg-green-700 transition duration-300 ease-in-out text-white font-semibold shadow-md`}
          >
            Register
          </button>
        </form>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center mt-3">{error}</p>}

        <p className="text-center mt-5">
          Already have an account? <a href="/login" className="text-blue-500">Login here</a>
        </p>
      </div>
    </div>
  );
}
