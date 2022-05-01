import React, { useState } from "react";
import LoginForm from "./LoginForm";
import "./loginAndSignUp.css";

export default function LoginAndSignUp({ loggedIn, logoutUser }) {
  const [typeOfForm, setTypeOfForm] = useState();
  const [formVisible, setFormVisible] = useState(false);

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
        <div
          className="login-button"
          onClick={() => {
            logoutUser();
          }}
        >
          Log out
        </div>
      )}
    </>
  );
}
