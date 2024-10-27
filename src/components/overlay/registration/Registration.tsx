// eslint-disable-next-line import/no-extraneous-dependencies
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  faEnvelope,
  faEye,
  faEyeSlash,
  faKey
} from "@fortawesome/free-solid-svg-icons";
// eslint-disable-next-line import/no-extraneous-dependencies
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { IRegistrationDetails } from "../../../types/forms";

const RegistrationForm = () => {
  const [registrationDetails, setRegistrationDetails] =
    useState<IRegistrationDetails>({
      email: "",
      password: "",
      confirmationPassword: "",
      linkedIn: "",
      github: "",
      owner: ""
    });

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    e.preventDefault();
    setRegistrationDetails({
      ...registrationDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleCheckboxChange = () => {
    setTermsAccepted(!termsAccepted);
  };

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   if (registrationDetails.password !== registrationDetails.confirmationPassword) {
  //     alert("Passwords do not match!");
  //     return;
  //   }
  //   try {
  //     const response = await axios.post("http://localhost:8080/api/users/register", {
  //       email: registrationDetails.email,
  //       password: registrationDetails.password,
  //       linkedIn: registrationDetails.linkedIn,
  //       github: registrationDetails.github,
  //       owner: registrationDetails.owner,
  //     }, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (response.status === 200) {
  //       alert("User registered successfully!");
  //     } else {
  //       alert("Registration failed!");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     alert("An error occurred during registration.");
  //   }
  // };

  return (
    <div className="max-w-md mx-auto my-5 p-6 min-h-[300px] bg-gradient-to-r from-[#acabcc] to-[#55b6ee] border-t border-l border-white/40 rounded-lg">
      <form
      //   onSubmit={handleSubmit}
      >
        <h4 className="py-2">Get Onboard</h4>
        <div className="relative mb-6 border-b border-gray-300">
          <div className="absolute right-2 text-[#e9e9e9]">
            <FontAwesomeIcon icon={faEnvelope} />
          </div>
          <input
            autoComplete="off"
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            value={registrationDetails.email}
            className="w-full bg-transparent border-none text-[#e9e9e9] placeholder-white text-sm focus:outline-none"
            required
          />
        </div>

        <div className="relative mb-6 border-b border-gray-300">
          <div
            className="absolute right-2 text-[#e9e9e9]"
            onClick={togglePasswordVisibility}
          >
            <FontAwesomeIcon icon={!passwordShown ? faEyeSlash : faEye} />
          </div>
          <input
            autoComplete="off"
            placeholder="Create password"
            type={passwordShown ? "text" : "password"}
            name="password"
            onChange={handleChange}
            value={registrationDetails.password}
            className="w-full bg-transparent border-none text-[#e9e9e9] placeholder-white text-sm focus:outline-none"
            required
          />
        </div>

        <div className="relative mb-6 border-b border-gray-300">
          <div className="absolute right-2 text-[#e9e9e9]">
            <FontAwesomeIcon icon={faKey} />
          </div>
          <input
            autoComplete="off"
            placeholder="Repeat password"
            type="password"
            onChange={handleChange}
            name="confirmationPassword"
            value={registrationDetails.confirmationPassword}
            className="w-full bg-transparent border-none text-[#e9e9e9] placeholder-white text-sm focus:outline-none"
            required
          />
        </div>

        <div className="flex items-center mb-5 ml-2">
          <input
            id="checkbox"
            type="checkbox"
            name="checkbox"
            checked={termsAccepted}
            onChange={handleCheckboxChange}
            className="mr-2 cursor-pointer"
          />
          <label className="text-[#EFE6E6] text-sm">
            Agree to the Fine Print
          </label>
        </div>

        <button
          type="submit"
          disabled={!termsAccepted}
          className="block w-full mx-auto bg-transparent text-sm text-[#eee] py-2 px-4 rounded-full border border-gray-300 hover:scale-110 transition-transform duration-300 ease-in-out"
        >
          Sign up
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
