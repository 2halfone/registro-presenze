"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase/firebaseConfig"; // Assicurati che `auth` sia configurato correttamente
import { signOut } from "firebase/auth"; // Per il logout
import Select from "react-select"; // react-select library per il menu a tendina

export default function Dashboard() {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const [absenceReason, setAbsenceReason] = useState(null);
  const [otherReason, setOtherReason] = useState(""); // Stato per il motivo personalizzato

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  const handleAbsenceChange = (selectedOption) => {
    setAbsenceReason(selectedOption);
  };

  const handleOtherReasonChange = (e) => {
    setOtherReason(e.target.value);
  };

  const absenceOptions = [
    { value: "vacation", label: "Vacation" },
    { value: "sick", label: "Sick Leave" },
    { value: "medical_visit", label: "Medical Visit" },
    { value: "other", label: "Other" },
  ];

  const handleSubmit = () => {
    // Logica di invio dei dati
    console.log("Selected reason:", absenceReason);
    console.log("Custom reason:", otherReason);

    // Dopo aver inviato i dati, reindirizziamo l'utente alla pagina di login
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-green-300 p-8">
      {/* First Container: Welcome Message */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8 relative">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-semibold text-gray-800">Login Successful!</h1>
        </div>
        <p className="text-gray-600 mt-4">Welcome to your dashboard. You are logged in successfully.</p>

        {/* Button positioned on the right side of the container */}
        <button
          onClick={handleLogout}
          className="absolute right-0 top-0 bottom-0 bg-red-500 text-white p-2 rounded-full flex items-center justify-center hover:bg-red-700 transition-all duration-300"
          style={{
            writingMode: "vertical-rl",
            height: "100%",
            width: "50px",
            letterSpacing: "5px",
          }}
        >
          Leave
        </button>
      </div>

      {/* Second Container: Dropdown Menu "Absence" */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">Absence</h2>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="text-blue-500 hover:text-blue-700 text-lg font-semibold transition-all"
          >
            {showMenu ? "Hide Menu" : "Show Menu"}
          </button>
        </div>

        {/* Dropdown Menu with four options */}
        {showMenu && (
          <div className="mt-4">
            <Select
              options={absenceOptions}
              value={absenceReason}
              onChange={handleAbsenceChange}
              placeholder="Select the reason for absence"
              className="z-10"
              styles={{
                control: (provided) => ({
                  ...provided,
                  backgroundColor: "white",
                  borderColor: "#ccc",
                  color: "#333",
                  fontSize: "16px",
                }),
                option: (provided, state) => ({
                  ...provided,
                  backgroundColor: state.isSelected ? "#66c7a7" : "white",
                  color: state.isSelected ? "white" : "black",
                  cursor: "pointer",
                }),
                menu: (provided) => ({
                  ...provided,
                  maxHeight: "200px",
                  overflowY: "auto",
                }),
              }}
            />
            {/* If "Other" is selected, show the input field for custom reason */}
            {absenceReason?.value === "other" && (
              <div className="mt-4">
                <input
                  type="text"
                  value={otherReason}
                  onChange={handleOtherReasonChange}
                  placeholder="Please specify the reason"
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                  style={{
                    backgroundColor: "#fff", // Background white
                    color: "#333", // Text color to make it readable
                    padding: "10px", // Adding padding for better visual
                    fontSize: "16px", // Adjust font size
                  }}
                />
              </div>
            )}
            {/* Submit button with dynamic hover effect */}
            <button
              onClick={handleSubmit}
              className="mt-6 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
              style={{
                width: "auto", // Dynamic width
                padding: "8px 16px", // Adjust padding to make the button smaller
              }}
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
