import React, { useState } from "react";
import LoginForm from "./LoginForm";
import "./loginAndSignUp.css";

export default function LoginAndSignUp() {
  const [typeOfForm, setTypeOfForm] = useState();
  const [formVisible, setFormVisible] = useState(false);

  return (
    <>
      <div className="login-buttons-container">
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
      </div>
      <LoginForm
        typeOfForm={typeOfForm}
        setTypeOfForm={setTypeOfForm}
        formVisible={formVisible}
        setFormVisible={setFormVisible}
      />
    </>
  );
}
