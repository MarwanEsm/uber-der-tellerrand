// eslint-disable-next-line import/no-extraneous-dependencies
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { FormEvent, useState } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../../firebase";
import { resetForm, updateField } from "../../../redux/slices/formSlice";
import { AppDispatch, RootState } from "../../../redux/store";

interface RegistrationFormProps {
  setShowLoginForm: () => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  setShowLoginForm
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const form = useSelector((state: RootState) => state.form);
  const [message, setMessage] = useState<string | null>(null); // For toast message
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null); // For success/failure tracking

  const handleChange =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      dispatch(updateField({ field, value: e.target.value }));
    };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      console.log("User registered:", userCredential.user);

      // Set success message and status
      setMessage("Registrierung erfolgreich! Sie können sich jetzt einloggen.");
      setIsSuccess(true);
      dispatch(resetForm());

      // Redirect to login after 3 seconds
      setTimeout(() => {
        setShowLoginForm();
      }, 3000); // 3 seconds delay to show the message before redirecting
    } catch (error: any) {
      // Set failure message and status
      setMessage(`Registrierung fehlgeschlagen: ${error.message}`);
      setIsSuccess(false);

      // Hide the message after 3 seconds
      setTimeout(() => setMessage(null), 3000);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-gradient-to-r from-purple-300 via-purple-400 to-purple-600 rounded-lg shadow-lg min-h-[245px] flex flex-col justify-center">
      {message && (
        <div
          className={`fixed top-4 right-0 left-0 p-4 rounded shadow-lg text-white ${
            isSuccess ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4 relative">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange("email")}
            placeholder="E-Mail"
            className="w-full px-4 py-2 bg-transparent border-b border-gray-300 text-white focus:outline-none placeholder-white"
          />
        </div>
        <div className="mb-4 relative">
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange("password")}
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
