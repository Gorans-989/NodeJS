import { Strategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import passport from "passport";
import dotenv from "dotenv";

dotenv.config();
// because of import , process.env needs to be preeloaded
const secret = process.env.TOKEN_KEY;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
  algorithms: "HS256"
}

const verifyCallBack = (dataFromToken, done) => {
  console.log(`before if(payload) `);

  if (dataFromToken) {
    console.log(dataFromToken);
    return done(null, dataFromToken);
  }
  else {
    console.log("error happened , but token signature is ok")
    return done(null, false,);
  }
}

const strategy = new Strategy(opts, verifyCallBack);

const myPassport = (req, res, next) => {
  passport.authenticate("jwt", function (err, user) {
    if (err) {
      return res.redirect('/');
    }
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized from goran' });
    }
    return next();
  })(req, res, next);

}
passport.use(strategy);

export { strategy, myPassport };

//const passportAuth = passport.authenticate("jwt", { session: false });
//export { passportAuth };
