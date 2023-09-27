//passprt JWT authentication strategy configurations
const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const User = require("../model/user_schema");

//extraction of JWT token from request header
let opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: "toor",
};

passport.use(
  new JWTStrategy(opts, function (jwtPayload, done) {
    User.findById(jwtPayload._id)
      .then((user) => {
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      })
      .catch((err) => {
        console.log("Error finding user from JWT", err);
      });
  })
);

module.exports = passport;
