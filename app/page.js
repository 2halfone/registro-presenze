"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/login"); // Reindirizza automaticamente alla login
  }, []);

  return <p>Reindirizzamento alla pagina di login...</p>;
}
