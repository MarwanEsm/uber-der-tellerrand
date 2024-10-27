import React, { ChangeEvent, FormEvent, useState } from "react";

// Email validation function
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setEmailError(null); // Reset error

    // Validate email
    if (!validateEmail(email)) {
      setEmailError("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
      return;
    }

    // If email is valid, proceed with resetting the password
    console.log("Password reset email sent to:", email);
  };

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-gradient-to-r from-purple-300 via-purple-400 to-purple-600 rounded-lg shadow-lg min-h-[245px] flex flex-col justify-center">
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
