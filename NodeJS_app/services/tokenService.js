import jwt from "jsonwebtoken";
import dotEnv from "dotenv";


// const headerObj = { alg: "HS256", typ: "JWT" };
// const payloadObj = { name: userName, email: email, exp: "1h" };
// const secret = process.env.TOKEN_KEY;
const createToken = (user) => {
    try {
        const secret = process.env.TOKEN_KEY;
        const signInToken = jwt.sign(
            {
                name: user.userName,
                userId: user._id,
                email: user.email,
                role: user.role,
                exp: Math.floor(Date.now() / 1000) + (60 * 10),
                iat: Math.floor(Date.now() / 1000) - 30
            },
            secret,
            {
                algorithm: "HS256"
                //typ: "JWT"
            }
        );
        return signInToken;

    } catch (error) {
        throw new Error(error);
    }
}

const decodeToken = (token)=> {
    const secret = process.env.TOKEN_KEY;
    const payload = jwt.decode(token, secret)
    return payload;
}
export {createToken, decodeToken};