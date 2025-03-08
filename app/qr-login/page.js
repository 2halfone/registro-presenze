"use client";
import { useEffect, useState } from "react";
import { db } from "@/firebase/firebaseConfig";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { useRouter, useSearchParams } from "next/navigation";

export default function QRLogin() {
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const qrCode = searchParams.get("code"); // Recupera il codice QR dall'URL

  useEffect(() => {
    if (!qrCode) {
      setError("QR Code non valido.");
      return;
    }

    const validateQR = async () => {
      try {
        const qrRef = doc(db, "loginQR", qrCode);
        const qrSnap = await getDoc(qrRef);

        if (qrSnap.exists() && qrSnap.data().valid) {
          alert("Accesso con QR Code riuscito!");
          
          // Elimina il QR Code dopo l'uso per sicurezza
          await deleteDoc(qrRef);

          router.push("/dashboard");
        } else {
          setError("QR Code non valido o già usato.");
        }
      } catch (err) {
        console.error("Errore nella scansione QR:", err);
        setError("Errore nel login con QR Code.");
      }
    };

    validateQR();
  }, [qrCode, router]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Login con QR Code</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>Verifica in corso...</p>
    </div>
  );
}
