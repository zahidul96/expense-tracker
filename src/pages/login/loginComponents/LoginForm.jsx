import { useRef, useState } from "react";
import "./LoginForm.css";
const LoginForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(false);
  const confirmPasswordInputRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    const confirmPassword = confirmPasswordInputRef.current.value;
    let url;
    if (isLogin) {
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD5bbbrDl4yaMFaKZ96FprCC9cnwHEfOsc";
    }
    const authenticationData = async () => {
      try {
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password,
            confirmPassword: confirmPassword,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log("successfully created account", data);
        } else {
          const data = await response.json();
          throw new Error(data.error.message || "Authentication failed");
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    authenticationData();
    emailInputRef.current.value = "";
    passwordInputRef.current.value = "";
    confirmPasswordInputRef.current.value = "";
  };
  return (
    <>
      <section className="auth">
        <h1>Sign Up</h1>
        <form onSubmit={submitHandler}>
          <div className="control">
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" required ref={emailInputRef} />
          </div>
          <div className="control">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              required
              ref={passwordInputRef}
            />
          </div>
          <div className="control">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              required
              ref={confirmPasswordInputRef}
            />
          </div>
          <div className="actions">
            <button type="submit">Create Account</button>
          </div>
        </form>
      </section>
      <div>
        <button type="button" className="login">
          Have an account? Login
        </button>
      </div>
    </>
  );
};
export default LoginForm;
