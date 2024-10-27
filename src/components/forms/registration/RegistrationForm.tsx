import React, { FormEvent } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { useDispatch, useSelector } from "react-redux";
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

  const handleChange =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      dispatch(updateField({ field, value: e.target.value }));
    };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmationPassword) {
      alert("Passwörter stimmen nicht überein!");
      return;
    }
    console.log("Form data:", form);
    dispatch(resetForm());
  };

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-gradient-to-r from-purple-300 via-purple-400 to-purple-600 rounded-lg shadow-lg min-h-[245px] flex flex-col justify-center">
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
        <div className="mb-4 relative">
          <input
            type="password"
            name="confirmationPassword"
            value={form.confirmationPassword}
            onChange={handleChange("confirmationPassword")}
            placeholder="Passwort wiederholen"
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
