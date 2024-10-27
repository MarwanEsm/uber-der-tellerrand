import React, { ChangeEvent, FormEvent, useState } from "react";

interface IRegistrationDetails {
  email: string;
  password: string;
  confirmationPassword: string;
  linkedIn: string;
  github: string;
  owner: string;
}

interface RegistrationFormProps {
  setShowLoginForm: () => void; // Prop to navigate back to login
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  setShowLoginForm
}) => {
  const [registrationDetails, setRegistrationDetails] =
    useState<IRegistrationDetails>({
      email: "",
      password: "",
      confirmationPassword: "",
      linkedIn: "",
      github: "",
      owner: ""
    });

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
    if (
      registrationDetails.password !== registrationDetails.confirmationPassword
    ) {
      alert("Passwörter stimmen nicht überein!");
      return;
    }
    // Submit the form logic
  };

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-gradient-to-r from-purple-300 via-purple-400 to-purple-600 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit}>
        <div className="mb-4 relative">
          <input
            type="email"
            name="email"
            value={registrationDetails.email}
            onChange={handleChange}
            placeholder="E-Mail"
            className="w-full px-4 py-2 bg-transparent border-b border-gray-300 text-white focus:outline-none placeholder-white"
          />
        </div>
        <div className="mb-4 relative">
          <input
            type="password"
            name="password"
            value={registrationDetails.password}
            onChange={handleChange}
            placeholder="Passwort"
            className="w-full px-4 py-2 bg-transparent border-b border-gray-300 text-white focus:outline-none placeholder-white"
          />
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
