import React, { ChangeEvent, FormEvent, useState } from "react";

// Email validation function
const validateEmail = (email: string) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

// Password validation function
const validatePassword = (password: string) => {
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordPattern.test(password);
};

interface IRegistrationDetails {
  email: string;
  password: string;
}

interface RegistrationFormProps {
  setShowLoginForm: () => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  setShowLoginForm
}) => {
  const [registrationDetails, setRegistrationDetails] =
    useState<IRegistrationDetails>({
      email: "",
      password: ""
    });

  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setRegistrationDetails({
      ...registrationDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setEmailError(null);
    setPasswordError(null);

    // Validate email
    if (!validateEmail(registrationDetails.email)) {
      setEmailError("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
      return;
    }

    // Validate password
    if (!validatePassword(registrationDetails.password)) {
      setPasswordError(
        "Das Passwort muss mindestens 8 Zeichen lang sein, eine Zahl und einen Buchstaben enthalten."
      );
      return;
    }

    // If the form is valid, submit logic goes here
    console.log("Registration successful!");
  };

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-gradient-to-r from-purple-300 via-purple-400 to-purple-600 rounded-lg shadow-lg min-h-[245px] flex flex-col justify-center">
      <form onSubmit={handleSubmit}>
        <div className="mb-4 relative">
          <input
            type="email"
            name="email"
            value={registrationDetails.email}
            onChange={handleChange}
            placeholder="E-Mail"
            className={`w-full px-4 py-2 bg-transparent border-b ${
              emailError ? "border-red-500" : "border-gray-300"
            } text-white focus:outline-none placeholder-white`}
          />
          {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
        </div>
        <div className="mb-4 relative">
          <input
            type="password"
            name="password"
            value={registrationDetails.password}
            onChange={handleChange}
            placeholder="Passwort"
            className={`w-full px-4 py-2 bg-transparent border-b ${
              passwordError ? "border-red-500" : "border-gray-300"
            } text-white focus:outline-none placeholder-white`}
          />
          {passwordError && (
            <p className="text-red-500 text-sm">{passwordError}</p>
          )}
        </div>

        <button
          type="submit"
          className="block w-full bg-orange-500 text-white py-2 px-4 rounded-full hover:bg-orange-600 transition shadow-lg transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300"
        >
          Registrieren
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

export default RegistrationForm;
