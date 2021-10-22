import jwt, { decode } from "jsonwebtoken";
import bcryptJs from "bcryptjs";
import dotEnv from "dotenv";
dotEnv.config();




const verifyToken = (req, res, next) => {

    const secret = process.env.TOKEN_KEY;
    // const authHeader = String(req.headers['authorization'] || '');
    // const token = authHeader.substring(7, authHeader.length);
    const token = req.headers.authorization.split(" ")[1];
    
    var payload;
    try {       

        payload = jwt.verify(token, secret);
        next();

    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {

            return res.status(401).json({
                message: e.message
            })
        }

        return res.status(400).json({
            message: e.message
        })
    }
}

export default verifyToken;



/*var payload
try {
    // Parse the JWT string and store the result in `payload`.
    // Note that we are passing the key in this method as well. This method will throw an error
    // if the token is invalid (if it has expired according to the expiry time we set on sign in),
    // or if the signature does not match
    payload = jwt.verify(token, jwtKey)

} catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
        // if the error thrown is because the JWT is unauthorized, return a 401 error
        return res.status(401).end()
    }
    // otherwise, return a bad request error
    return res.status(400).end()
}
*/
//var { header1, payload1 } = jwt.decode(signedJWT, { header: true , payload: true}); // will this work?

// Verify the token we just signed using the public key.  Also validates our algorithm RS256 
/*jwt.verify(signedJWT, PUB_KEY, { algorithms: ['HS256'] }, (err, payload) => {

    if (err.name === 'TokenExpiredError') {
        console.log('Whoops, your token has expired!');
    }

    if (err.name === 'JsonWebTokenError') {
        console.log('That JWT is malformed!');
    }

    if (err === null) {
        console.log('Your JWT was successfully validated!');
    }

    // Both should be the same
    console.log(payload);
    console.log(payloadObj);
});
*/