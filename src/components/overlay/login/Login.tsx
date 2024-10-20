import { ChangeEvent, useState } from "react";
import { ILogin } from "../../../types/login";

const LoginForm = () => {
    const [state, setState] = useState<ILogin>({
        email: "",
        password: "",
    });

    const [passwordShown, setPasswordShown] = useState<boolean>(false);
    const [showForgotPasswordForm, setShowForgotPasswordForm] = useState<boolean>(false);

    const togglePasswordVisibility = () => {
        setPasswordShown(!passwordShown);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setState({ ...state, [e.target.name]: e.target.value });
    };

    return (
        <>
            {!showForgotPasswordForm ? (
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
                        <label
                            onClick={() => setShowForgotPasswordForm(true)}
                            className="text-white cursor-pointer hover:underline"
                        >
                            Passwort vergessen?
                        </label>
                        <span className="text-white mx-2">|</span>
                        <label
                            onClick={() => alert('Sign Up functionality here')}
                            className="text-white cursor-pointer hover:underline"
                        >
                            Jetzt registrieren
                        </label>
                    </div>
                </div>
            ) : (
                <div className="max-w-md mx-auto mt-5 p-6 bg-gradient-to-r from-purple-300 via-purple-400 to-purple-600 rounded-lg shadow-lg">
                    <h2 className="text-white text-center mb-4">Passwort zurücksetzen</h2>
                    {/* Add functionality for password reset here */}
                    <button
                        onClick={() => setShowForgotPasswordForm(false)}
                        className="block w-full bg-orange-500 text-white py-2 px-4 rounded-full hover:bg-orange-600 transition mt-4"
                    >
                        Zurück zum Einloggen
                    </button>
                </div>
            )}
        </>
    );
};

export default LoginForm;
