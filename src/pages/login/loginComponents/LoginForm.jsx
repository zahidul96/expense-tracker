import { useRef, useState, useContext } from "react";
import { GlobalContext } from "../../../store/GlobalContextProvider";
import "./LoginForm.css";
const LoginForm = () => {
  const authCtx = useContext(GlobalContext);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const resetEmailInputRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const [isForgot, setForgot] = useState(false);
  const [forgotPsswordLoader, setForgotPasswordLoader] = useState(false);
  const confirmPasswordInputRef = useRef();
  const forgotPasswordHandler = () => {
    setForgot(!isForgot);
  };
  const loginStatusChangeHandler = () => {
    setIsLogin(!isLogin);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD5bbbrDl4yaMFaKZ96FprCC9cnwHEfOsc";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD5bbbrDl4yaMFaKZ96FprCC9cnwHEfOsc";
    }
    const authenticationData = async () => {
      try {
        let payload = {
          email: email,
          password: password,
          returnSecureToken: true,
        };
        if (!isLogin) {
          payload.confirmPassword = confirmPasswordInputRef.current.value;
        }
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          authCtx.login(data.idToken);
          console.log(isLogin ? "Login successful" : "Sign Up successful");
          alert(isLogin ? "Login successful" : "Sign Up successful");
        } else {
          const data = await response.json();
          throw new Error(data.error.message || "Authentication failed");
        }
      } catch (error) {
        console.log(error.message);
        {
          isLogin
            ? alert("Login failed: " + error.message)
            : alert("Sign Up failed: " + error.message);
        }
      }
    };
    authenticationData();
    emailInputRef.current.value = "";
    passwordInputRef.current.value = "";
    if (!isLogin) {
      confirmPasswordInputRef.current.value = "";
    }
  };
  const resetEmailHandler = async () => {
    try {
      setForgotPasswordLoader(true);
      const resetEmail = resetEmailInputRef.current.value;
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyD5bbbrDl4yaMFaKZ96FprCC9cnwHEfOsc",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: resetEmail,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (!response.ok) {
        throw new Error("Reset email not success");
      }
      const data = await response.json();
      console.log("reset sucess", data);
      setForgotPasswordLoader(false);
      resetEmailInputRef.current.value = ""
      alert("reset successful");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      {!isForgot ? (
        <div className="login-page">
          <section className="auth">
            <h1>{isLogin ? "Login" : "Sign Up"}</h1>
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
              {!isLogin && (
                <div className="control">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    required
                    ref={confirmPasswordInputRef}
                  />
                </div>
              )}
              <div className="actions">
                <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
              </div>
              {isLogin && (
                <div className="anchor">
                  <button type="button" onClick={forgotPasswordHandler}>
                    Forgot Password?
                  </button>
                </div>
              )}
            </form>
          </section>
          <div>
            <button
              type="button"
              className="login"
              onClick={loginStatusChangeHandler}
            >
              {isLogin
                ? "Dont have an account? Sign Up"
                : "Have an account? Login"}
            </button>
          </div>
        </div>
      ) : (
        <div className="forgot-main">
          <div className="forgot-page">
            <label htmlFor="email">
              Enter the email with which you have registered
            </label>
            <input type="email" id="email" required ref={resetEmailInputRef} />
            <button type="button" onClick={resetEmailHandler}>
              {forgotPsswordLoader ? "sending link..." : "send link"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default LoginForm;
