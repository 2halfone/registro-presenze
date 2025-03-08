"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"; // Firebase per la registrazione
import { getFirestore, doc, setDoc, Timestamp } from "firebase/firestore"; // Firestore per memorizzare i dati dell'utente

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState(""); // Stato per l'email dell'utente
  const [password, setPassword] = useState(""); // Stato per la password dell'utente
  const [error, setError] = useState(""); // Stato per errori
  const [attempts, setAttempts] = useState(0); // Stato per il conteggio dei tentativi
  const [success, setSuccess] = useState(false); // Stato per il successo della registrazione
  const [isLoading, setIsLoading] = useState(false); // Stato per il caricamento durante la registrazione

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(""); // Reset degli errori
    setIsLoading(true); // Avvia il caricamento

    const auth = getAuth();
    const db = getFirestore();

    try {
      // Creazione dell'utente con Firebase
      await createUserWithEmailAndPassword(auth, email, password);

      // Salvataggio dei dati utente in Firestore
      const userRef = doc(db, "users", auth.currentUser.uid);
      await setDoc(userRef, {
        email: email,
        createdAt: Timestamp.now(),
      });

      setSuccess(true);
      setIsLoading(false); // Disattiva il caricamento

      // Dopo un successo, reindirizza alla pagina di login
      setTimeout(() => {
        router.push("/login");
      }, 2000); // Redirige dopo 2 secondi
    } catch (err) {
      setError("Registration failed. Please try again.");
      setAttempts(attempts + 1); // Incrementa il contatore dei tentativi
      setIsLoading(false); // Disattiva il caricamento

      // Dopo 3 tentativi falliti, reindirizza al login
      if (attempts >= 2) {
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-green-300 p-8">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-auto">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Register</h1>

        {/* Form di registrazione */}
        <form onSubmit={handleRegister} className="flex flex-col gap-6">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-800"
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-800"
          />
          <button
            type="submit"
            className="py-3 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-700 transition-all duration-300"
            disabled={isLoading} // Disabilita il pulsante durante il caricamento
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Messaggio di errore */}
        {error && <p className="text-red-500 text-center mt-3">{error}</p>}

        {/* Messaggio di successo */}
        {success && <p className="text-green-500 text-center mt-3">Registration successful! Redirecting...</p>}

        {/* Link di ritorno alla pagina di login */}
        <div className="mt-4 text-center">
          <a href="/login" className="text-blue-500 hover:underline">
            Go back to Login
          </a>
        </div>
      </div>
    </div>
  );
}
