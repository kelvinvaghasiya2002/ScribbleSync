import GoogleStrategy from 'passport-google-oauth20';
import passport from 'passport';
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const server = process.env.SERVER;
import { User } from '../../models/user.js';
import { response } from 'express';


passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: `${server}/auth/google/callback`,
  scope: ["profile", "email"]
},
  function (accessToken, refreshToken, profile, cb) {
    const { email, name:username } = profile._json;
    const password = "google";
    var user;
    User.findOneAndUpdate(
      {
        email, username, password
      },
      {},
      {
        upsert: true,
        returnDocument: "after"
      }
    ).then((response) => {
      user = { email: response.email, username: response.username };
      console.log("res = " + response);
      return cb(null, user);
    }).catch((err) => {
      console.log(err);
    })

  }
));


passport.serializeUser((user, cb) => {
  cb(null, user);
})

passport.deserializeUser((user, cb) => {
  cb(null, user);
})
