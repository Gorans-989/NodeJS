import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
    try {
        var payload;
        const secret = process.env.TOKEN_KEY;
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                message: "No token provided"
            });
        }

        const token = authHeader.split(" ")[1];
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
export default auth;
