import React, {useState} from "react";
import LoginForm from "./loginComponents/LoginForm";
import ForgotPssword from "./loginComponents/ForgotPassword";
const LoginPage = ()=>{
    const [isForgot, setForgot] = useState(false);
     const forgotPasswordHandler = () => {
    setForgot(!isForgot);
  };
    return(
        <>
        {isForgot ? <ForgotPssword/> : <LoginForm  onForgotPassword={forgotPasswordHandler}/> }
        
        
        </>
    )
}
export default LoginPage