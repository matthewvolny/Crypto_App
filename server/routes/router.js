const express = require("express"),
  router = express.Router(),
  pgPromise = require("pg-promise")();

const config = {
  host: "chunee.db.elephantsql.com",
  port: 5432,
  database: "tackfzcc",
  user: "tackfzcc",
  password: "Mc-99hstlqIgw4sH3LaZrYQRsNfGjVCm",
};

// const config = {
//   host: "localhost",
//   port: 5432,
//   database: "Crypto_App",
//   user: "matthewvolny",
//   password: "Ronweasley1@@@",
// };

const database = pgPromise(config);

//retrieve user game on login
router.get("/login", async (req, res) => {
  // console.log("in retrieve /login");
  const parsedLoginInfo = JSON.parse(req.query.loginInfo);
  const { email, password } = parsedLoginInfo;
  // const userId = req.query.userIdNum;
  console.log(email, password);
  try {
    const { email, password } = parsedLoginInfo;
    // const userId = req.query.userIdNum;
    // const playerGame = await database.any(
    //   `SELECT * FROM user_info WHERE user_id = '${userId}' AND user_name = '${name}' AND user_password = '${password}'`
    // );
    const userInfo = await database.any(
      `SELECT * FROM user_info WHERE user_email = '${email}' AND user_password = '${password}'`
    );

    res.send(userInfo);
  } catch (error) {
    console.log("sorry, user not found");
  }
});

//signup user for a new game
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body.loginInfo;
  // const currentRoom = req.body.currentRoom;
  const accountNumber = req.body.accountNumber;
  console.log(name);
  console.log(email);
  console.log(password);
  // console.log(userId);
  console.log("in retrieve/signup");
  res.send("from retrieve/signup");
  try {
    let queryString =
      "INSERT INTO user_info (account_number, user_name, user_email, user_password) VALUES ($1, $2, $3, $4)";
    await database.none(queryString, [accountNumber, name, email, password]);
  } catch (error) {
    console.log(error);
    res.send("signup failed");
  }
});

module.exports = router;
