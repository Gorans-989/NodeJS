import { Strategy as JwtStrategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import passport from "passport";
const secret = process.env.TOKEN_KEY;

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "";
// opts.secretOrKey = secret  //  opts.secretOrKey =  process.env.TOKEN_KEY; doesnt work. 

import {User} from "../models/user.js"; // in order to work

const strategy = passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
  User.findOne({ id: jwt_payload.userId }, function (err, user) {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
      // or you could create a new account
    }
  });
}));

const cb = function (req, res) {
  res.send(req.user.profile);
}

export { strategy, cb }