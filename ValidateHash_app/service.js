import { createToken, getPayload } from "./token.js";

const getToken = (req, res, next) => {
    const token = createToken();
    return res.status(201).json({
        token: token
    })
}



const checkHash = (req, res, next) => {

    try {
        const { hashkey } = req.body;
        const result = hashkey;


        const { user, role } = getPayload(req.headers.authorization);
        console.log(user, role);





        if (!result) {
            return res.status(404).json({
                message: "input is not valid"
            })
        }

        return res.status(200).json({
            user: user,
            role: role
        });
    } catch (error) {

        return res.status(500).json({
            message: error.message
        });
    }
}


export { checkHash, getToken };