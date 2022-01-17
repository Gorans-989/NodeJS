import jwt from "jsonwebtoken";


const createToken = () => {
    try {
        const secret = process.env.TOKEN_KEY;
        
        const signInToken = jwt.sign(
            {
                //name: user.userName,
                user: "Gost",
                //email: user.email,
                role: "admin",
                exp: Math.floor(Date.now() / 1000) + (60 * 30),
                iat: Math.floor(Date.now() / 1000) - 30
            },
            secret,
            {
                algorithm: "HS256"
                //typ: "JWT",
                
            }
        );
        console.log(`=== token created! `)
        return signInToken;

    } catch (error) {
        throw new Error(error);
    }
}

const getPayload = (authHeader) => {
    const token = authHeader.split(" ")[1];
    const payload = jwt.decode(token);

    return payload;
}

export { createToken, getPayload };