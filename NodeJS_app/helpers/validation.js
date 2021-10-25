// import { User } from "../models/user.js";
// import bcryptJs from "bcryptjs";

// class Validator {

//     static check = async (email, password) => {
//         const user = await User.findOne({ "email" : email });
//         if (!user) {
//             return false;
//         }
        
//         return this.checkPassword(user, password);
//     };
//     static checkPassword = async (user, password) => {
        
//         const check = await bcryptJs.compare(password, user.password);
//         if (!check) {
//             return false;
//         }
//         return user;
//     };
    
// }
// export default Validator;