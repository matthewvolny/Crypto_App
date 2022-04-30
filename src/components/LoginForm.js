import React, { useEffect, useRef, useContext, useState } from "react";
import closeIcon from "../images/close-icon.png";
import "./loginForm.css";
import Context from "../context/context";
import axios from "axios";

export default function LoginForm({
  typeOfForm,
  setTypeOfForm,
  formVisible,
  setFormVisible,
}) {
  const isMounted = useRef(false);
  // const [loggedIn, setLoggedIn] = useContext(Context);
  const [loginInfo, setLoginInfo] = useState({
    name: "",
    password: "",
    email: "",
  });
  const [userId, setUserId] = useState();

  const hideLoginForm = () => {
    const loginContainer = document.querySelector(".login-container");
    loginContainer.removeAttribute("login-container-visible");
    loginContainer.setAttribute("id", "login-container-hidden");
    const backgroundMask = document.querySelector(".background-mask");
    backgroundMask.removeAttribute("visible");
    backgroundMask.setAttribute("id", "hidden");
  };

  useEffect(() => {
    if (isMounted.current) {
      const loginContainer = document.querySelector(".login-container");
      loginContainer.setAttribute("id", "login-container-visible");
      const backgroundMask = document.querySelector(".background-mask");
      backgroundMask.setAttribute("id", "visible");
      setFormVisible(false);
    } else {
      isMounted.current = true;
    }
  }, [formVisible]);

  //signs up, or logs in user
  // const loginUser = (loginInfo) => {
  //   axios
  //     .get("/login", {
  //       params: {
  //         loginInfo,
  //       },
  //     })
  //     .then((response) => {
  //       const data = response.data; // itemsCollected = [Leaf]
  //       if (data.length === 0) {
  //         //!can display something to the screen here, and clear input
  //         console.log("login failed");
  //       } else {
  //         //set all aspects of the game state from the db call on login
  //         // setLoggedIn(true);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  //signs up, or logs in user
  const signupUser = (loginInfo) => {
    console.log("in signup user");
    const randomNum = Math.floor(Math.random() * 10000);
    axios
      .post("/signup", {
        loginInfo: loginInfo,
        userId: randomNum,
      })
      .then((res) => {
        console.log(`statusCode: ${res.status}`);
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
    // setUserLoggedIn(true);
    setUserId(randomNum);
  };

  //stores typed form inputs in state
  const handleChange = (event) => {
    const inputName = event.target.name; //name, pw, email
    const inputValue = event.target.value; //typed value
    setLoginInfo({ ...loginInfo, [inputName]: inputValue });
  };

  const handleSubmit = (e) => {
    console.log("submitted");
    e.preventDefault();
    signupUser(loginInfo);
  };

  return (
    <div className="background-mask">
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          {typeOfForm === "login" ? (
            <div>
              <div className="heading">Login</div>
              <img
                onClick={hideLoginForm}
                className="close-button"
                alt="close-button"
                src={closeIcon}
              />
              <div>
                New to CryptoMondo?
                <span
                  className="link"
                  onClick={() => {
                    setTypeOfForm("signup");
                  }}
                >
                  Create an account
                </span>
              </div>
            </div>
          ) : (
            <div>
              <div className="heading">Create an account</div>
              <img
                onClick={hideLoginForm}
                alt="close-button"
                className="close-button"
                src={closeIcon}
              />
              <div>
                Gain access to additional features such as a personal Watchlist
                and Portfolio tracking.
              </div>
              <div>
                Already have an account?
                <span
                  className="link"
                  onClick={() => {
                    setTypeOfForm("login");
                  }}
                >
                  Sign in
                </span>
              </div>
            </div>
          )}
          <div>Name</div>
          <input
            name="name"
            onChange={handleChange}
            type="text"
            value={loginInfo.name}
            placeholder="Enter your name"
          />
          <div>Email Address</div>
          <input
            name="email"
            onChange={handleChange}
            type="email"
            value={loginInfo.email}
            placeholder="Enter your email address..."
          />
          <div>Password</div>
          <input
            name="password"
            onChange={handleChange}
            type="password"
            value={loginInfo.password}
            placeholder="Enter your password..."
          />
          <div>
            Password should contain both letter and number, with minimum length
            of 8 characters
          </div>
          {typeOfForm === "login" ? (
            <button type="submit" className="button">
              Log In
            </button>
          ) : (
            <>
              <button type="submit" className="button">
                Sign Up
              </button>
              <div>
                By proceeding, you agree to Cryptic's Terms of Use and Privacy
                Policy.
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
