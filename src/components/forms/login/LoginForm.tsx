import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../../firebase"; // Your Firebase configuration file

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
  const [state, setState] = useState<ILogin>({ email: "", password: "" });
  const [passwordShown, setPasswordShown] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setEmailError(null);
    setLoginError(null);

    if (!validateEmail(state.email)) {
      setEmailError("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
      return;
    }

    const auth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        state.email,
        state.password
      );
      const user = userCredential.user;

      // Check if the user is the specific admin user
      if (user.email === "osnabrueck@ueberdentellerrand.org") {
        navigate("/admin"); // Redirect to the admin page
        return; // Exit function here
      }

      // Retrieve firstLogin flag from Firestore for other users
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const userData = userDoc.data();

      if (userData && userData.firstLogin) {
        navigate("/form"); // Redirect to /form for first login
      } else {
        navigate("/events"); // Redirect to /events otherwise
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setLoginError("Login fehlgeschlagen: " + error.message);
      }
    }
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
        {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
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
