import { useState } from "react";
import LoginForm from "../../forms/login/LoginForm";
import RegistrationForm from "../../forms/registration/RegistrationForm";
import ResetPasswordForm from "../../forms/resetPassword/ResetPasswordForm";

const AuthContainer = () => {
  const [activeForm, setActiveForm] = useState<"login" | "register" | "reset">(
    "login"
  );

  return (
    <div className="w-[95%]">
      <h1 className="text-center text-3xl font-bold mb-4 text-purple-600">
        Willkommen zurück!
      </h1>
      {activeForm === "login" && (
        <LoginForm
          setShowForgotPasswordForm={() => setActiveForm("reset")}
          setShowRegistrationForm={() => setActiveForm("register")}
        />
      )}
      {activeForm === "register" && (
        <RegistrationForm setShowLoginForm={() => setActiveForm("login")} />
      )}
      {activeForm === "reset" && (
        <ResetPasswordForm setShowLoginForm={() => setActiveForm("login")} />
      )}

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
  );
};

export default AuthContainer;
