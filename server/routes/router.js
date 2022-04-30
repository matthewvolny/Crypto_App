const express = require("express"),
  router = express.Router(),
  pgPromise = require("pg-promise")();

// const config = {
//   host: "ruby.db.elephantsql.com",
//   port: 5432,
//   database: "rlkucqpz",
//   user: "rlkucqpz",
//   password: "5wViybi8DQjHztp6qgzqbW0UczeQhh6h",
// };

const config = {
  host: "localhost",
  port: 5432,
  database: "Crypto_App",
  user: "matthewvolny",
  password: "Ronweasley1@@@",
};

const database = pgPromise(config);

//retrieve user games
// router.get("/retrieveUserGames", async (req, res) => {
//   try {
//     const userGames = await database.any(
//       "SELECT * FROM user_info ORDER BY created_at"
//     );
//     res.send(userGames);
//   } catch (error) {
//     console.log(error);
//   }
// });

//retrieve user game on login
router.get("/login", async (req, res) => {
  // console.log("in retrieve /login");
  const parsedLoginInfo = JSON.parse(req.query.loginInfo);
  const { name, password } = parsedLoginInfo;
  const userId = req.query.userIdNum;
  console.log(name, password, userId); // Mark 123456789 1593
  try {
    const { name, password } = parsedLoginInfo;
    const userId = req.query.userIdNum;
    // const playerGame = await database.any(
    //   `SELECT * FROM user_info WHERE user_id = '${userId}' AND user_name = '${name}' AND user_password = '${password}'`
    // );
    const playerGame = await database.any(
      `SELECT * FROM user_info INNER JOIN user_inventory using (user_id) WHERE user_id = '${userId}' AND user_name = '${name}' AND user_password = '${password}'`
    );

    res.send(playerGame);
  } catch (error) {
    console.log("sorry, user not found");
  }
});

//signup user for a new game
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body.loginInfo;
  // const currentRoom = req.body.currentRoom;
  const userId = req.body.userId;
  console.log(name);
  console.log(email);
  console.log(password);
  console.log(userId);
  console.log("in retrieve/signup");
  res.send("from retrieve/signup");
  try {
    let queryString =
      "INSERT INTO user_info (user_id, user_name, user_email, user_password) VALUES ($1, $2, $3, $4)";
    await database.none(queryString, [userId, name, email, password]);
  } catch (error) {
    console.log(error);
  }
});

//retrieve user's game state from db
// router.get("/retrieveGameState", async (req, res) => {
//   console.log("in get");
//   try {
//     const posts = await database.any(
//       "SELECT * FROM posts LEFT JOIN comments using (post_id) ORDER BY posts.created_at, post_id, comments.created_at"
//     );
//     console.log(posts);
//     res.send(posts);
//   } catch (error) {
//     console.log(error);
//   }
// });

//update user's current room
// router.post("/updateRoom", async (req, res) => {
//   const newRoom = req.body.newRoom;
//   const userId = req.body.userId;
//   console.log("hello");
//   console.log(newRoom);
//   console.log(userId);
//   res.send("hello");
//   try {
//     let queryString = `UPDATE user_info SET current_room = $1 WHERE user_id = $2`;
//     await database.none(queryString, [newRoom, userId]);
//   } catch (error) {
//     console.log(error);
//   }
// });

//update user's player inventory
// router.post("/updatePlayerInventory", async (req, res) => {
//   const playerInventory = JSON.stringify(req.body.playerInventory);
//   const userId = req.body.userId;
//   console.log("hello");
//   console.log(playerInventory);
//   res.send("hello");
//   try {
//     let queryString = `UPDATE user_inventory SET items = $1 WHERE user_id = $2`;
//     await database.none(queryString, [playerInventory, userId]);
//   } catch (error) {
//     console.log(error);
//   }
// });

//update user's game state
// router.post("/updatePlayerGameState", async (req, res) => {
//   const playerGameState = JSON.stringify(req.body.roomEvaluateInfo);
//   const userId = req.body.userId;
//   res.send("hello");
//   try {
//     let queryString = `UPDATE user_info SET game_state = $1 WHERE user_id = $2`;
//     await database.none(queryString, [playerGameState, userId]);
//   } catch (error) {
//     console.log(error);
//   }
// });

//! not in point and click below here
//add comments to posts
// router.post("/addComment", async (req, res) => {
//   console.log(req.body.newComment);
//   console.log("hello");
//   const { name, comment } = req.body.newComment;
//   const id = req.body.id;
//   res.send("hello");
//   try {
//     let queryString =
//       "INSERT INTO comments (post_id, name_, comment) VALUES ($1, $2, $3)";
//     await database.none(queryString, [id, name, comment]);
//   } catch (error) {
//     console.log(error);
//   }
// });

// router.post("/deletePost", async (req, res) => {
//   console.log(req.body.postId);
//   try {
//     let queryString = `DELETE FROM comments WHERE post_id = $1`;
//     await database.none(queryString, [req.body.postId]);
//     let queryStringTwo = `DELETE FROM posts WHERE post_id = $1`;
//     await database.none(queryStringTwo, [req.body.postId]);
//   } catch (error) {
//     console.log(error);
//   }
// });

// router.post("/update", async (req, res) => {
//   console.log(req.body.id); // 1
//   try {
//     let queryString = `UPDATE tasks SET completed = 'true' WHERE id = $1`;
//     await database.none(queryString, [req.body.id]);
//     res.redirect("/");
//   } catch (error) {
//     console.log(error);
//   }
// });

// router.post("/return", async (req, res) => {
//   console.log(req.body); // 1
//   try {
//     let queryString = `UPDATE tasks SET completed = 'false' WHERE id = $1`;
//     await database.none(queryString, [req.body.id]);
//     res.redirect("/");
//   } catch (error) {
//     console.log(error);
//   }
// });

module.exports = router;
