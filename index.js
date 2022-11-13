const express = require("express");

const app = express();
const cors = require("cors");

const { userController } = require("./routes/user.routes");
const { productController } = require("./routes/product.routes");
const { connection } = require("./config/db");
const { authentication } = require("./middlewares/authentication");
require("dotenv").config();

app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 8080;

// const passport = require("./middlewares/google.Oauth");
app.use("/product", productController);

app.use("/user", userController);
app.get("/", (req, res) => {
  res.send("Welcome to Home page.");
});

// app.get('/auth/google',
//   passport.authenticate('google', { scope:
//       [ 'email', 'profile' ] }
// ));

// app.get( '/auth/google/callback',
//     passport.authenticate( 'google', {
//         successRedirect: '/auth/google/success',
//         failureRedirect: '/auth/google/failure'
// }));

app.listen(PORT, async () => {
  try {
    await connection();
    console.log("Connected to db");
    console.log(`http://localhost:${PORT}`);
  } catch (err) {
    console.log("Error connnecting to DB");
    console.log(err);
  }
});
