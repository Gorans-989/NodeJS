import { User } from "../models/user.js";
import bcryptJs from "bcryptjs";

class Validator {

    static checkCredentials = async (email, password) => {
        const userDb = await this.checkEmail(email);
        if (!userDb) {
            return false;
        }
        return this.checkPassword(userDb, password);

    };
    static checkEmail = async (email) => {
        const user = await User.findOne({ "email": email });
        return user;
    };
    static checkPassword = async (user, password) => {
        const check = await bcryptJs.compare(password, user.password);
        if (!check) {
            return false;
        }
        return user;
    };

}

export default Validator;