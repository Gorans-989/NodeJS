import { User } from "../models/user.js";

const userService = {

    getAll: async () => {

        const users = await User.find()
            .select("email userName role -_id");

        return users;



        //.select("title price -_id") // select the properties you need - for nested object use "." eg: Product.userId.cart.items etc
        //.populate('userId', " -_id ") // with the "-" you specify what to exclude

    }
}

export {userService};