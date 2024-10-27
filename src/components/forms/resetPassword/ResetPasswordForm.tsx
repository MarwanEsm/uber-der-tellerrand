import { ChangeEvent, useState } from "react";

const ResetPasswordForm = () => {
  const [email, setEmail] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gradient-to-r from-purple-300 via-purple-400 to-purple-600 rounded-lg shadow-lg">
      <h2 className="text-white text-lg">Passwort Zurücksetzen</h2>
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
    </div>
  );
};

export default ResetPasswordForm;
