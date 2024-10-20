import { ChangeEvent, useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEye, faEnvelope, faKey, faBuilding, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import styles from "./LoginForm.module.scss";

// import { ILogin } from "@/types/forms";
// import ForgotPassword from "../forgotPassword/ForgotPassword";
// import Headline from "@/components/elements/headline/Headline";
import { ILogin } from "../../../types/login";


//TODO: validate the email address and password
const LoginForm = () => {
    const [state, setState] = useState<ILogin>({
        email: "",
        password: "",
    });

    const [passwordShown, setPasswordShown] = useState<boolean>(false);
    const [showForgotPasswordForm, setShowForgotPasswordForm] = useState<boolean>(false)

    const togglePasswordVisibility = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setState({ ...state, [e.target.name]: e.target.value });
    };
    // const handleDropDown = (e) => {
    //     e.preventDefault();
    //     setState({ ...state, owner: e.target.value });
    // };

    // const submitDetails = (e) => {
    //     e.preventDefault();
    //     if (
    //         state.email === "" ||
    //         state.password === "" ||
    //         state.confirmationPassword !== state.password ||
    //         state.owner === "" ||
    //         !checked
    //     ) {
    //         alert("Please fill in all required fields");
    //     } else {
    //         fetch(`${serverURL}auth/register`, {
    //             method: "post",
    //             headers: {
    //                 Accept: "application/json, text/plain, */*",
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify(state),
    //         })
    //             .then((res) => res.json())
    //             .then((res) => {
    //                 console.log(res);
    //                 if (res.success) {
    //                     alert(res.msg);
    //                 } else {
    //                     alert(res.msg);
    //                 }
    //             });
    //     }
    // };


    return (<>
        {!showForgotPasswordForm ?
            <div className={styles.wrapper} >

                <form action="post">
                    <h4>Step Inside</h4>

                    <div className={styles.inputContainer}>
                        <div className={styles.icon}>
                            {/* <FontAwesomeIcon icon={faEnvelope} /> */}
                        </div>
                        <input
                            autoComplete="off"
                            type="email"
                            placeholder="Email"
                            name="email"
                            onChange={(e) => handleChange(e)}
                            value={state.email}
                        />
                    </div>

                    <div className={styles.inputContainer}>
                        <div className={styles.icon} onClick={togglePasswordVisibility}>
                            {/* <FontAwesomeIcon icon={!passwordShown ? faEyeSlash : faEye} /> */}
                        </div>
                        <input
                            autoComplete="off"
                            placeholder="Create password"
                            type={passwordShown ? "text" : "password"}
                            name="password"
                            onChange={(e) => handleChange(e)}
                            value={state.password}
                        />
                    </div>

                </form>

                <button>log-in</button>
                <label onClick={() => setShowForgotPasswordForm(!showForgotPasswordForm)}>
                    Password forgotten ?
                </label>
            </div>
            :
            <div>Forget password</div>
            // <ForgotPassword onClick={() => setShowForgotPasswordForm(false)} />
        }
    </>

    );
}


export default LoginForm;
