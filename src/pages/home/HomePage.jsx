import React, { useState, useRef, useContext } from "react";
import { GlobalContext } from "../../store/GlobalContextProvider";
import "./HomePage.css";
const HomePage = () => {
  const [completeProfile, setCompleteProfile] = useState(false);
  const authCtx = useContext(GlobalContext);
  const profileChangeHandler = () => {
    setCompleteProfile(!completeProfile);
  };
  const nameInputRef = useRef();
  const photoUrRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    const name = nameInputRef.current.value;
    const photoUrl = photoUrRef.current.value;
    const updateProfileHandler = async () => {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyD5bbbrDl4yaMFaKZ96FprCC9cnwHEfOsc",
          {
            method: "POST",
            body: JSON.stringify({
              idToken: authCtx.token,
              displayName: name,
              photoUrl: photoUrl,
              returnSecureToken: true,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        const data = await response.json();
        if (response.ok) {
          console.log("success", data);
        } else {
          throw new Error("update not success" || data.error.message);
        }
      } catch (err) {
        alert(err.message);
      }
    };
    updateProfileHandler();
    nameInputRef.current.value = ""
    photoUrRef.current.value =""
  };
  return completeProfile ? (
    <>
      <h1>winner never quits</h1>
      <div className="form-container">
        <form className="profile-form" onSubmit={submitHandler}>
          <h2>Contact Details:</h2>
          <div>
            <label htmlFor="name" className="label">Full name:</label>
            <input
              type="text"
              id="name"
              className="link"
              ref={nameInputRef}
            />
          </div>
          <div>
            <label htmlFor="photoUrl" className="label">profile photo url:</label>
            <input
              type="url"
              id="photoUrl"
              className="link"
              ref={photoUrRef}
            />
          </div>
          <div>
            <button type="submit" id="button">Update</button>
          </div>
        </form>
      </div>
    </>
  ) : (
    <div className="header-container">
      <h1>welcome to the expense tracker</h1>

      <div className="profile-status">
        <p>Your profile is incomplete</p>
        <button onClick={profileChangeHandler}>Complete Profile</button>
      </div>
    </div>
  );
};

export default HomePage;
