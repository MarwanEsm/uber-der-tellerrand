import React, { ChangeEvent, useState } from "react";

interface ResetPasswordFormProps {
  setShowLoginForm: () => void;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  setShowLoginForm
}) => {
  const [email, setEmail] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gradient-to-r from-purple-300 via-purple-400 to-purple-600 rounded-lg shadow-lg">
      <form>
        <div className="mb-4 relative">
          <input
            type="email"
            placeholder="E-Mail-Adresse"
            name="email"
            onChange={handleChange}
            value={email}
            className="w-full px-4 py-2 bg-transparent border-b border-gray-300 text-white focus:outline-none placeholder-white"
          />
        </div>
      </form>
      <button className="block w-full bg-orange-500 text-white py-2 px-4 rounded-full hover:bg-orange-600 transition shadow-lg transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300">
        Passwort zurücksetzen
      </button>

      {/* Back to Login button */}
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
