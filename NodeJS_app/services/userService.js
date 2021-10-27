import { User } from "../models/user.js";
import bcryptJs from "bcryptjs";
import { createToken } from "../services/tokenService.js";
import { Movie } from "../models/movie.js";
import Validator from "../helpers/validation.js";

const userService = {

    getAll: async () => {

        const users = await User.find()
            .select("email userName role -_id");

        return users;

        //.select("title price -_id") // select the properties you need - for nested object use "." eg: Product.userId.cart.items etc
        //.populate('userId', " -_id ") // with the "-" you specify what to exclude

    },
    getOne: async (id) => {
        const userDb = await User.findById(id)
            .select("email userName role -_id");
        return userDb;
    },
    updateUser: async (email, userName, role, id, password) => {

        const salt = await bcryptJs.genSalt(10);
        const hashPassword = await bcryptJs.hash(password, salt);
        //console.log(hashPassword);
        const user = new User({
            _id: id,
            email: email,
            userName: userName,
            role: role,
            password: hashPassword
        });

        return await User.findByIdAndUpdate(id, user); // is it ok to use like this?
    },
    deleteUser: async (id) => {
        const userDb = await User.findByIdAndDelete(id);
        return userDb;
        // return await User.findByIdAndDelete(id);

    },
    rentMovie: async (userId, movieId) => {
        const userDb = await User.findById(userId);
        // return strings and display them in catch block
        // throw errors and catch them in the controller 
        const movieDb = await Movie.findById(movieId);
        if (movieDb.quantity <= 0) {
            return {
                message: "Out of stock",
                success: false
            };
        };
        if (!userDb) {
            return {
                message: "user not found",
                success: false
            };
        };
        if (userDb.rentedMovies.length === 4) {
            return {
                message: "Cant have more than 4 rented movies.\n Please return one or more.",
                success: false
            };
        };

        const rentedMovie = await userDb.rentedMovies.find(m => m._id.toString() === movieId.toString());

        if (rentedMovie) {
            return {
                message: "Cant rent same movie twice. Please choose another",
                success: false
            }
        }
        movieDb.quantity -= 1;
        movieDb.save();
        userDb.rentedMovies.push(movieDb);
        userDb.save();
        return {
            user: userDb,
            success: true
        }

    },
    returnRentedMovie: async (userId, movieId) => {
        //TO DO
        // get user
        // const user = await User.findById(userId);

        // // search rented movies for movie to return
        // const mov = user.rentedMovies
        // remove from array
        // user.save()
    },
    register: async (email, userName, role, password) => {
        const existingUser = await User.findOne({ "email": email });
        if (existingUser) {
            return false;
        }

        const salt = await bcryptJs.genSalt(10);
        const hashPassword = await bcryptJs.hash(password, salt);

        const newUser = new User({
            email: email,
            userName: userName,
            role: role ? role : "user",
            rentedMovies: [],
            password: hashPassword
        });
        newUser.save();
        return newUser;
    },
    log_in: async (email, password) => {

        const validatedUser = await Validator.checkCredentials(email, password);
        if (!validatedUser) {
            return false;
        }

        const signInToken = createToken(validatedUser);
        return {
            user: validatedUser,
            token: signInToken
        }
    },
    log_out: async () => {
        // to do
    }

}
// is is ok to have a separate class like this OR
// should i form a class userService and put all the methods in there ( get, update , delete, check ...)


export { userService };