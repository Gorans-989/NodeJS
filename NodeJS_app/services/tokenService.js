import jwt from "jsonwebtoken";
import Validator from "../helpers/validation.js";

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
                exp: Math.floor(Date.now() / 1000) + (60 * 3),
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

// const decodeToken = (token) => {
//     const payload = jwt.decode(token)
//     return payload;
// }

const checkPayload = async (authHeader) => {
    const token = authHeader.split(" ")[1];
    const payload = jwt.decode(token);

    const verifyEmail = await Validator.checkEmail(payload.email);
    if (!verifyEmail) {
        
    }
    //check email || userId || role
    if (payload.role !== "admin") {
        return false;
    }
    return payload;
}

export { createToken, checkPayload };