import { ChangeEvent, FormEvent, useState } from "react";

// Email validation function
const validateEmail = (email: string) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

interface ILogin {
  email: string;
  password: string;
}

interface ILoginProps {
  setShowForgotPasswordForm: () => void;
  setShowRegistrationForm: () => void;
}

const LoginForm = (props: ILoginProps) => {
  const [state, setState] = useState<ILogin>({
    email: "",
    password: ""
  });

  const [passwordShown, setPasswordShown] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setEmailError(null); // Reset email error

    // Validate email
    if (!validateEmail(state.email)) {
      setEmailError("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
      return;
    }

    // If the email is valid, proceed with login logic
    console.log("Login successful!");
  };

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-gradient-to-r from-purple-300 via-purple-400 to-purple-600 rounded-lg shadow-lg min-h-[245px] flex flex-col justify-center">
      <form onSubmit={handleSubmit}>
        <div className="mb-4 relative">
          <input
            type="email"
            placeholder="E-Mail"
            name="email"
            onChange={handleChange}
            value={state.email}
            className={`w-full px-4 py-2 bg-transparent border-b ${
              emailError ? "border-red-500" : "border-gray-300"
            } text-white focus:outline-none placeholder-white`}
          />
          {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
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
        <button
          type="submit"
          className="block w-full bg-orange-500 text-white py-2 px-4 rounded-full hover:bg-orange-600 transition shadow-lg transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300"
        >
          Einloggen
        </button>
      </form>
      <div className="mt-4 text-center">
        <button
          onClick={props.setShowForgotPasswordForm}
          className="text-white underline hover:no-underline hover:text-orange-500 transition-all"
        >
          Passwort vergessen?
        </button>
        <span className="text-white mx-2">|</span>
        <button
          onClick={props.setShowRegistrationForm}
          className="text-white underline hover:no-underline hover:text-orange-500 transition-all"
        >
          Jetzt registrieren
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
