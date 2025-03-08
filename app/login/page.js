"use client";
import { useState, useEffect } from "react";
import { auth, db } from "@/firebase/firebaseConfig"; // Assicurati che `db` sia configurato correttamente
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, Timestamp } from "firebase/firestore"; // Importa le funzioni di Firestore
import { useRouter } from "next/navigation";
import QRCode from "react-qr-code"; // QR Code Library

export default function Login() {
  const [email, setEmail] = useState(""); // Inizializzazione di `email`
  const [password, setPassword] = useState(""); // Inizializzazione di `password`
  const [error, setError] = useState(""); // Stato per gli errori
  const [qrCode, setQrCode] = useState(""); // Stato per il QR Code
  const [passwordVisible, setPasswordVisible] = useState(false); // Stato per visibilità password
  const router = useRouter();

  useEffect(() => {
    // Genera un QR Code univoco per il login
    const uniqueId = `login-${Date.now()}`;
    setQrCode(uniqueId);

    // Salva il QR Code in Firestore
    const qrRef = doc(db, "loginQR", uniqueId);
    setDoc(qrRef, {
      valid: true,
      createdAt: Timestamp.now(),
    });
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Resetta l'errore
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (err) {
      setError("The email or password you entered is incorrect. Please check your credentials and try again.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-400 to-green-300">
      <div className="bg-white p-10 rounded-lg shadow-2xl max-w-sm w-full">
        <h1 className="text-4xl font-semibold text-center text-gray-800 mb-6">Login</h1>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-500 text-black"
          />
          
          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-full placeholder:text-gray-500 text-black"
            />
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
            >
              {passwordVisible ? "👁️" : "🙈"}
            </button>
          </div>
          
          <button
            type="submit"
            className="py-3 rounded-lg bg-blue-500 text-white font-semibold"
          >
            Login
          </button>
        </form>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center mt-3">{error}</p>}

        {/* QR Code for Login */}
        <div className="flex flex-col items-center mt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Or login with QR Code:</h3>
          {qrCode && (
            <div className="p-6 bg-white shadow-lg rounded-lg">
              <QRCode value={`http://localhost:3000/qr-login?code=${qrCode}`} size={200} />
            </div>
          )}
          <p className="mt-3 text-center text-gray-600">Scan the code with your phone to log in automatically.</p>
        </div>

        {/* Links: Reset password and Register */}
        <div className="mt-4 text-center flex justify-between">
          <a href="/reset-password" className="text-blue-500 hover:underline">
            Reset your password
          </a>
          <a href="/register" className="text-green-500 hover:underline">
            Register here
          </a>
        </div>
      </div>
    </div>
  );
}
