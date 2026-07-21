import "./Welcome.css";
import React, { useContext } from "react";
//import { GlobalContext } from "../../../store/GlobalContextProvider";
import { useDispatch } from "react-redux";
import { authSliceActions } from "../../../store/Auth";
import { themeSliceActions } from "../../../store/Theme";
import { useSelector } from "react-redux";
const Welcome = (props) => {
  const dispatch = useDispatch();
  const totalExpenses = useSelector((state) => state.expense.totalExpenses);
  const isDarkMode = useSelector((state)=>state.theme.isDarkMode)
  const verifyEmailHandler = async () => {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyD5bbbrDl4yaMFaKZ96FprCC9cnwHEfOsc",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: authCtx.token,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (!response.ok) {
        throw new Error("Request failed");
      }
      const data = await response.json();
      console.log("verify email console", data);
    } catch (error) {}
  };
  return (
    <>
      <div className="header-container">
        <div>
          <h1>welcome to the expense tracker</h1>
          {totalExpenses > 10000 && (
            <button className="premium-btn" onClick={()=>dispatch(themeSliceActions.setTheme())}>Activate Premium</button>
          )}
        </div>

        <div className="profile-status">
          <p>Your profile is incomplete</p>
          <button onClick={props.onChangeProfile}>Complete Profile</button>
          <button
            type="button"
            onClick={() => dispatch(authSliceActions.logout())}
          >
            Logout
          </button>
        </div>
      </div>
      <div className="email-verify">
        <button type="button" onClick={verifyEmailHandler}>
          verify your email
        </button>
      </div>
    </>
  );
};
export default Welcome;
