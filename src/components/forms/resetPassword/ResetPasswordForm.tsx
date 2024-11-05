import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import React, { ChangeEvent, FormEvent, useState } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { ToastContainer, toast } from "react-toastify";
// eslint-disable-next-line import/no-extraneous-dependencies
import "react-toastify/dist/ReactToastify.css";

const validateEmail = (email: string) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

interface ResetPasswordFormProps {
  setShowLoginForm: () => void;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  setShowLoginForm
}) => {
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string | null>(null);

  const auth = getAuth();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError(null); // Clear error on input change
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setEmailError(null);

    if (!validateEmail(email)) {
      setEmailError("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success(
        "Passwort-Reset-E-Mail wurde gesendet. Bitte prüfen Sie Ihren Posteingang."
      );
      console.log("Password reset email sent to:", email);
    } catch (error: any) {
      if (error.code === "auth/user-not-found") {
        setEmailError(
          "E-Mail-Adresse nicht gefunden. Bitte geben Sie eine registrierte E-Mail-Adresse ein."
        );
      } else {
        setEmailError(
          "Fehler beim Senden der Passwort-Reset-E-Mail. Bitte versuchen Sie es später noch einmal."
        );
      }
      console.error("Error sending password reset email:", error);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-gradient-to-r from-purple-300 via-purple-400 to-purple-600 rounded-lg shadow-lg min-h-[245px] flex flex-col justify-center">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />
      <form onSubmit={handleSubmit}>
        <div className="mb-4 relative">
          <input
            type="email"
            placeholder="E-Mail-Adresse"
            name="email"
            onChange={handleChange}
            value={email}
            className={`w-full px-4 py-2 bg-transparent border-b ${
              emailError ? "border-red-500" : "border-gray-300"
            } text-white focus:outline-none placeholder-white`}
          />
          {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
        </div>
        <button
          type="submit"
          className="block w-full bg-orange-500 text-white py-2 px-4 rounded-full hover:bg-orange-600 transition shadow-lg transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300"
        >
          Passwort zurücksetzen
        </button>
      </form>

      <div className="mt-4 text-center">
        <button
          onClick={setShowLoginForm}
          className="text-white underline hover:no-underline hover:text-orange-500 transition-all"
        >
          Zurück zum Einloggen
        </button>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
