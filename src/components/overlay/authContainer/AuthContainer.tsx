import { useState } from "react";
import LoginForm from "../../forms/login/LoginForm";
import RegistrationForm from "../../forms/registration/RegistrationForm";
import ResetPasswordForm from "../../forms/resetPassword/ResetPasswordForm";

const AuthContainer = () => {
  const [activeForm, setActiveForm] = useState<"login" | "register" | "reset">(
    "login"
  );

  return (
    <div className="min-h-screen flex flex-col justify-center bg-gray-800">
      <div className="container mx-auto">
        {activeForm === "login" && <LoginForm />}
        {activeForm === "register" && <RegistrationForm />}
        {activeForm === "reset" && <ResetPasswordForm />}

        <div className="mt-4 text-center">
          {activeForm !== "login" && (
            <button
              onClick={() => setActiveForm("login")}
              className="text-white underline hover:text-orange-500 transition-all"
            >
              Einloggen
            </button>
          )}
          {activeForm !== "register" && (
            <button
              onClick={() => setActiveForm("register")}
              className="text-white underline hover:text-orange-500 transition-all ml-4"
            >
              Registrieren
            </button>
          )}
          {activeForm !== "reset" && (
            <button
              onClick={() => setActiveForm("reset")}
              className="text-white underline hover:text-orange-500 transition-all ml-4"
            >
              Passwort Zurücksetzen
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthContainer;
