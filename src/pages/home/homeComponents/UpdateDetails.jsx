import "./UpdateDetails.css";
import React, {useState, useEffect, useContext} from "react";
import { GlobalContext } from "../../../store/GlobalContextProvider";
const UpdateDetails = () => {
const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const authCtx = useContext(GlobalContext)
  const submitHandler = (event) => {
    event.preventDefault();
    const name = name;
    const photoUrl = photo;
    const updateProfileHandler = async () => {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyD5bbbrDl4yaMFaKZ96FprCC9cnwHEfOsc",
          {
            method: "POST",
            body: JSON.stringify({
              idToken: authCtx.token,
              displayName: name,
              photoUrl: photo,
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
    name = "";
    photo = "";
  };
  const dataCollectHandler = async () => {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyD5bbbrDl4yaMFaKZ96FprCC9cnwHEfOsc",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: authCtx.token,
          }),
        },
      );
      if (!response.ok) {
        throw new Error("Request failed");
      }
      const data = await response.json();
      if (data.users && data.users[0]) {
        const user = data.users[0];
        setName(user.displayName || '');
        setPhoto(user.photoUrl || '');
      }
      console.log(data, "success");
    } catch (err) {
      console.log(err.message);
    }
  };
  
  
  useEffect(() => {
    if (!authCtx.token || !authCtx.isLoggedIn) {
      console.log("data will not called")
      return;
    }
    dataCollectHandler();
    console.log("calling", authCtx.token);
  }, [authCtx.token, authCtx.isLoggedIn]);
  return (
    <>
      <h1>winner never quits</h1>
      <div className="form-container">
        <form className="profile-form" onSubmit={submitHandler}>
          <h2>Contact Details:</h2>
          <div>
            <label htmlFor="name" className="label">
              Full name:
            </label>
            <input
              type="text"
              id="name"
              className="link"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="photoUrl" className="label">
              profile photo url:
            </label>
            <input
              type="url"
              id="photoUrl"
              className="link"
              value={photo}
              onChange={(e) => {
                setPhoto(e.target.value);
              }}
            />
          </div>
          <div>
            <button type="submit" id="button">
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default UpdateDetails;
