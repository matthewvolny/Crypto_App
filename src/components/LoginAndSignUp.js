import React, { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import "./loginAndSignUp.css";

export default function LoginAndSignUp({ loggedIn, logoutUser }) {
  const [typeOfForm, setTypeOfForm] = useState();
  const [formVisible, setFormVisible] = useState(false);

  //!could not get welcome message to work!
  // const deleteWelcomeMessage = setTimeout(() => {
  //   const welcomeMessage = document.querySelector(".welcome-message");
  //   welcomeMessage.remove();
  // }, 5000);

  // const WelcomeMessage = () => {
  //   return <div className="welcome-message">Welcome!</div>;
  // };

  // useEffect(() => {
  //   if (loggedIn) {
  //     deleteWelcomeMessage();
  //   }
  // }, [loggedIn]);

  return (
    <>
      {!loggedIn ? (
        <>
          <div
            className="login-button"
            onClick={() => {
              setTypeOfForm("login");
              setFormVisible(true);
            }}
          >
            Log in
          </div>
          <div
            className="signup-button"
            onClick={() => {
              setTypeOfForm("signup");
              setFormVisible(true);
            }}
          >
            Sign up
          </div>

          <LoginForm
            typeOfForm={typeOfForm}
            setTypeOfForm={setTypeOfForm}
            formVisible={formVisible}
            setFormVisible={setFormVisible}
          />
        </>
      ) : (
        <>
          <div
            className="login-button logout-button"
            onClick={() => {
              logoutUser();
            }}
          >
            Log out
          </div>
          {/* <WelcomeMessage /> */}
        </>
      )}
    </>
  );
}
