import React, {useState, useRef} from "react";
import "./ForgotPassword.css"
const ForgotPssword = ()=>{
  const [forgotPsswordLoader, setForgotPasswordLoader] = useState(false);
  const resetEmailInputRef = useRef();
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
    </>
)
}
export default ForgotPssword;