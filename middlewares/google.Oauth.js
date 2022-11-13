var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

const passport = require("passport");

require("dotenv").config();

passport.use(new GoogleStrategy({
    clientID: process.env.client_id,
    clientSecret: process.env.client_secret,
    callbackURL: "http://localhost:8080/auth/google/callback",
    passReqToCallback   : true,
    scope:[ 'email', 'profile' ]
  },
  function(request, accessToken, refreshToken, profile, done) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));

module.exports = passport;