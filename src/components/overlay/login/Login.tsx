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
                        <h4 className="text-center text-white text-lg font-semibold mb-6">Step Inside</h4>

                        <div className="mb-4 relative">
                            <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                onChange={handleChange}
                                value={state.email}
                                className="w-full px-4 py-2 bg-transparent border-b border-gray-300 text-white focus:outline-none"
                            />
                        </div>

                        <div className="mb-4 relative">
                            <input
                                type={passwordShown ? "text" : "password"}
                                placeholder="Create password"
                                name="password"
                                onChange={handleChange}
                                value={state.password}
                                className="w-full px-4 py-2 bg-transparent border-b border-gray-300 text-white focus:outline-none"
                            />
                            <button
                                type="button"
                                className="absolute right-0 top-0 mt-2 text-white"
                                onClick={togglePasswordVisibility}
                            >
                                {passwordShown ? "Hide" : "Show"}
                            </button>
                        </div>
                    </form>

                    <button className="block w-full bg-orange-500 text-white py-2 px-4 rounded-full hover:bg-orange-600 transition">
                        Log in
                    </button>

                    <label
                        onClick={() => setShowForgotPasswordForm(!showForgotPasswordForm)}
                        className="block mt-4 text-center text-white cursor-pointer hover:underline"
                    >
                        Password forgotten?
                    </label>
                </div>
            ) : (
                <div>Forget password</div>
            )}
        </>
    );
};

export default LoginForm;
