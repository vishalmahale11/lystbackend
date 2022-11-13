// const GoogleStrategy = require("passport-google-oauth20").Strategy;

// require("dotenv").config();

// const passport = require("passport");
// const { UserModel } = require("../model/user.model");

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "http://localhost:7000/user/auth/google/callback",
//       scope: ["profile", "email"],
//     },
//     function (accessToken, refreshToken, profile, cb) {
//       const user = new UserModel({
//         email:profile.email || profile.emails.value,
//         password:"1234",
//         user_id:profile.id
//       });
//       console.log(profile);
//       return cb(null, "user");
//     }
//   )
// );

// module.exports = passport;
