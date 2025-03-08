"use client";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push("/login"); // Reindirizza se non autenticato
    } else {
      setLoading(false);
    }
  }, [user, router]);

  if (loading) return <p>Caricamento...</p>; // Mostra un messaggio mentre carica

  return children;
}
