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
  const { loggedIn, setLoggedIn, accountData, setAccountData } =
    useContext(Context);
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

  //login user and retrieve user data
  const loginUser = (loginInfo) => {
    axios
      .get("http://localhost:3000/login", {
        params: {
          loginInfo,
        },
      })
      .then((response) => {
        const data = response.data; // itemsCollected = [Leaf]
        console.log("response data from login get request");
        console.log(data);
        if (data.length === 0) {
          //!can display something to the screen here, and clear input
          console.log("login failed");
        } else {
          //update user data
          setAccountData({
            ...accountData,
            userInfo: {
              accountNumber: data[0].account_number,
              name: data[0].user_name,
              watchedCoins: data[0].watched_coins,
            },
          });
          setLoggedIn(true);
          hideLoginForm();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //signs up user
  const signupUser = (loginInfo) => {
    console.log("in signup user");
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    console.log(randomNum);
    axios
      .post("http://localhost:3000/signup", {
        loginInfo: loginInfo,
        accountNumber: randomNum,
      })
      .then((res) => {
        console.log(`statusCode: ${res.status}`);
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
    setTypeOfForm("login");
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
    if (typeOfForm === "signup") {
      signupUser(loginInfo);
    } else {
      loginUser(loginInfo);
    }
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
                New to CryptoMondo?&nbsp;
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
            <>
              <div>
                <div className="heading">Create an account</div>
                <img
                  onClick={hideLoginForm}
                  alt="close-button"
                  className="close-button"
                  src={closeIcon}
                />
                <div>
                  Gain access to additional features such as a personal
                  Watchlist and Portfolio tracking.
                </div>
                <div>
                  Already have an account?&nbsp;
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
              <div>Name</div>
              <input
                name="name"
                onChange={handleChange}
                type="text"
                value={loginInfo.name}
                placeholder="Enter your name"
              />
            </>
          )}

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
