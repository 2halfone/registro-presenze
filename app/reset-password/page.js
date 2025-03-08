"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, sendPasswordResetEmail } from "firebase/auth"; // Firebase per il reset della password

export default function ResetPassword() {
  const router = useRouter();
  const [email, setEmail] = useState(""); // Stato per l'email dell'utente
  const [error, setError] = useState(""); // Stato per errori
  const [successMessage, setSuccessMessage] = useState(""); // Stato per il messaggio di successo

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError(""); // Reset degli errori
    setSuccessMessage(""); // Reset dei messaggi di successo

    const auth = getAuth(); // Inizializzazione di Firebase Auth

    try {
      // Invio della richiesta di reset della password
      await sendPasswordResetEmail(auth, email);
      setSuccessMessage("Password reset email sent! Please check your inbox.");
      // Dopo aver inviato l'email, reindirizza l'utente al login
      setTimeout(() => {
        router.push("/login");
      }, 3000); // Redirect after 3 seconds
    } catch (err) {
      setError("There was an error. Please try again.");
      console.error(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-green-300 p-8">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-auto">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Reset Password</h1>

        {/* Form per il reset della password */}
        <form onSubmit={handlePasswordReset} className="flex flex-col gap-6">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-800"
            style={{
              fontSize: "16px",
              color: "#333", // Colore del testo scuro
              backgroundColor: "#fff", // Sfondo bianco
            }}
          />
          <button
            type="submit"
            className="py-3 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-700 transition-all duration-300"
          >
            Reset Password
          </button>
        </form>

        {/* Messaggio di errore */}
        {error && <p className="text-red-500 text-center mt-3">{error}</p>}

        {/* Messaggio di successo */}
        {successMessage && <p className="text-green-500 text-center mt-3">{successMessage}</p>}

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
