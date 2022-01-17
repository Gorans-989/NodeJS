import { Strategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import passport from "passport";
import dotenv from "dotenv";


// because of import , process.env needs to be preeloaded
const secret = process.env.TOKEN_KEY;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
  algorithms: "HS256"
}

const verifyCallBack = (dataFromToken, done) => {
  // the token signature is verified in passport.auth method before. If not ok, The code doesnt execute this function
  // here you can use your own implementation to verify the payload ( check role, id etc)
  //this function returns error OR the PAYLOAD OBJ and apends it to the request as a new property 'USER' ( access it request.User ) 
  console.log(`before if(payload) `);
  if (dataFromToken) {
    return done(null, dataFromToken);
  }
  else {
    return done(error, false);
  }
}

const strategy = new Strategy(opts, verifyCallBack);
passport.use(strategy);
const passportAuth = passport.authenticate("jwt", { session: false });
export { passportAuth };


// try {

//   if (passport.authenticate("jwt", { session: false })){
//     next()
//   };

// } catch (e) {
//  if (e instanceof jwt.JsonWebTokenError) {

//    return res.status(401).json({
//      message: e.message
//    })
//  }
//  return res.status(400).json({
//    message: e.message
//  })
// }