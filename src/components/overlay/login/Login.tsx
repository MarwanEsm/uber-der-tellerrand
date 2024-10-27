import { ChangeEvent, useState } from "react";
import { ILogin } from "../../../types/login";

const LoginForm = () => {
  const [state, setState] = useState<ILogin>({
    email: "",
    password: ""
  });

  const [passwordShown, setPasswordShown] = useState<boolean>(false);
  const [showForgotPasswordForm, setShowForgotPasswordForm] =
    useState<boolean>(false);
  const [showRegistrationForm, setShowRegistrationForm] =
    useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <>
      {!showForgotPasswordForm && (
        <div className="max-w-md mx-auto mt-5 p-6 bg-gradient-to-r from-purple-300 via-purple-400 to-purple-600 rounded-lg shadow-lg">
          <form>
            <div className="mb-4 relative">
              <input
                type="email"
                placeholder="E-Mail"
                name="email"
                onChange={handleChange}
                value={state.email}
                className="w-full px-4 py-2 bg-transparent border-b border-gray-300 text-white focus:outline-none placeholder-white"
              />
            </div>

            <div className="mb-4 relative">
              <input
                type={passwordShown ? "text" : "password"}
                placeholder="Passwort"
                name="password"
                onChange={handleChange}
                value={state.password}
                className="w-full px-4 py-2 bg-transparent border-b border-gray-300 text-white focus:outline-none placeholder-white"
              />
              <button
                type="button"
                className="absolute right-0 top-0 mt-2 text-white"
                onClick={togglePasswordVisibility}
              >
                {passwordShown ? "Verbergen" : "Anzeigen"}
              </button>
            </div>
          </form>

          <button className="block w-full bg-orange-500 text-white py-2 px-4 rounded-full hover:bg-orange-600 transition">
            Einloggen
          </button>

          <div className="mt-4 text-center">
            <button
              onClick={() => setShowForgotPasswordForm(true)}
              className="text-white underline hover:no-underline hover:text-orange-500 transition-all"
            >
              Passwort vergessen?
            </button>
            <span className="text-white mx-2">|</span>
            <button
              onClick={() => setShowRegistrationForm(true)}
              className="text-white underline hover:no-underline hover:text-orange-500 transition-all"
            >
              Jetzt registrieren
            </button>
          </div>
        </div>
      )}

      {showForgotPasswordForm && (
        <div className="max-w-md mx-auto mt-5 p-6 bg-gradient-to-r from-purple-300 via-purple-400 to-purple-600 rounded-lg shadow-lg">
          <div className="mb-4 relative">
            <input
              type="email"
              placeholder="E-Mail-Adresse eingeben"
              name="email"
              onChange={handleChange}
              value={state.email}
              className="w-full px-4 py-2 bg-transparent border-b border-gray-300 text-white focus:outline-none placeholder-white"
            />
          </div>
          <button className="block w-full bg-orange-500 text-white py-2 px-4 rounded-full hover:bg-orange-600 transition mt-4">
            Passwort zurücksetzen
          </button>
          <button
            onClick={() => setShowForgotPasswordForm(false)}
            className="block w-full bg-purple-500 text-white py-2 px-4 rounded-full hover:bg-purple-600 transition mt-4"
          >
            Zurück zum Einloggen
          </button>
        </div>
      )}
    </>
  );
};

export default LoginForm;
