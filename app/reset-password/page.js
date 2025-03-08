"use client";
import { useState } from "react";
import { auth } from "@/firebase/firebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Check your inbox.");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-green-400 via-blue-500 to-indigo-600">
      <div className="bg-white p-10 rounded-lg shadow-2xl max-w-sm w-full">
        <h1 className="text-4xl font-semibold text-center text-gray-800 mb-6">Reset Password</h1>

        <form onSubmit={handlePasswordReset} className="flex flex-col gap-6">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 placeholder:text-gray-500 text-black"
          />
          <button
            type="submit"
            className="py-3 rounded-lg bg-green-500 hover:bg-green-700 transition duration-300 ease-in-out text-white font-semibold shadow-md"
          >
            Reset Password
          </button>
        </form>

        {message && <p className="text-green-500 text-center mt-3">{message}</p>}
        {error && <p className="text-red-500 text-center mt-3">{error}</p>}

        <div className="mt-4 text-center">
          <a href="/login" className="text-blue-500 hover:underline">
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
}
