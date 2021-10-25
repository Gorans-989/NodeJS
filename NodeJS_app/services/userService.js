import { User } from "../models/user.js";
import bcryptJs from "bcryptjs";
import { createToken, decodeToken } from "../services/tokenService.js";
import { Movie } from "../models/movie.js"

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
    updateUser: async (data) => {

        const { email, userName, role, rentedMovies, _id, password } = data;
        //console.log(_id); //
        const salt = await bcryptJs.genSalt(10);
        const hashPassword = await bcryptJs.hash(password, salt);
        //console.log(hashPassword);
        const user = new User({
            _id: _id,
            email: email,
            userName: userName,
            role: role,
            rentedMovies: rentedMovies ? rentedMovies : [],
            password: hashPassword
        });

        return await User.findByIdAndUpdate(_id, user); // is it ok to use like this?
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
        
        if (!userDb) {
            return {
                message: "user not found",
                success: false
            };
        }
        if (userDb.rentedMovies.length === 4) {
            return {
                message: "Cant have more than 4 rented movies.\n Please return one or more.",
                success: false
            };
        }
        
        const movieDb =  await Movie.findById(movieId);        // maybe user movieService method getOne(movieId) ?
        if(movieDb.quantity <= 0){
            return {
                message: "Out of stock",
                success: false
            };
        }
        
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
    register: async (email, userName, role, rentedMovies, password) => {
        const userObj = await User.findOne({ "email": email });
        if (userObj) {
            return false;
        }

        const salt = await bcryptJs.genSalt(10);
        const hashPassword = await bcryptJs.hash(password, salt);

        const newUser = new User({
            email: email,
            userName: userName,
            role: role ? role : "user",
            rentedMovies: rentedMovies ? rentedMovies : [],
            password: hashPassword
        });
        newUser.save();
        return newUser;
    },
    log_in: async (email, password) => {

        const validatedUser = await Validator.check(email, password);
        if (!validatedUser) {
            return false;
        }

        const signInToken = createToken(validatedUser);
        return {
            user: validatedUser,
            token: signInToken
        }
    }

}
// is is ok to have a separate class like this OR
// should i form a class userService and put all the methods in there ( get, update , delete, check ...)
class Validator {

    static check = async (email, password) => {
        const user = await User.findOne({ "email": email });
        if (!user) {
            return false;
        }

        return this.checkPassword(user, password);
    };
    static checkPassword = async (user, password) => {

        const check = await bcryptJs.compare(password, user.password);
        if (!check) {
            return false;
        }
        return user;
    };

}

export { userService };