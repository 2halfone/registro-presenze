"use client";
import { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { db } from "@/firebase/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { QrReader } from "@blackbox-vision/react-qr-reader";

export default function ScanQR() {
  const { user } = useAuth();
  const [scannedData, setScannedData] = useState(null);

  const handleScan = async (qrData) => {
    if (qrData) {
      setScannedData(qrData);
      if (user) {
        await addDoc(collection(db, "presenze"), {
          userId: user.uid,
          email: user.email,
          qrData: qrData,
          timestamp: serverTimestamp(),
        });
        alert("Presenza registrata con successo!");
      }
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Scansione QR Code</h1>
      <QrReader
        onResult={(result, error) => {
          if (result) handleScan(result?.text);
        }}
        constraints={{ facingMode: "environment" }}
        containerStyle={{ width: "100%", maxWidth: "400px", margin: "auto" }}
      />
      {scannedData && <p>QR Code Scansionato: {scannedData}</p>}
    </div>
  );
}
