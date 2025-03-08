"use client";
import { useState, useEffect } from "react";
import { auth } from "@/firebase/firebaseConfig";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        router.push("/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return <p>Loading...</p>; // Mostra un messaggio di caricamento durante la verifica dell'autenticazione
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white p-10 rounded-lg shadow-2xl max-w-sm w-full">
        <h1 className="text-4xl font-semibold text-center text-gray-800 mb-6">Dashboard</h1>

        {user && (
          <div className="flex flex-col items-center">
            <p className="text-lg text-gray-700 mb-4">Welcome, {user.displayName || "User"}!</p>
            <p className="text-gray-600">Your email: {user.email}</p>
            <button
              onClick={() => auth.signOut()}
              className="mt-6 py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
