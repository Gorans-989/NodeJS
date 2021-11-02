import { User } from "../models/user.js";
import bcryptJs from "bcryptjs";
import { createToken } from "../services/tokenService.js";
import { Movie } from "../models/movie.js";
import Validator from "../helpers/validation.js";

const userService = {

    getAll: async () => {

        const users = await User.find()
            .select("email userName role rentedMovies -_id");

        return users;

        //.select("title price -_id") // select the properties you need - for nested object use "." eg: Product.userId.cart.items etc
        //.populate('userId', " -_id ") // with the "-" you specify what to exclude

    },
    getOne: async (id) => {
        const userDb = await User.findById(id)
            .select("email userName role rentedMovies -_id");
        return userDb;
    },
    updateUser: async (email, userName, role, id, password) => {

        const salt = await bcryptJs.genSalt(10);
        const hashPassword = await bcryptJs.hash(password, salt);
        const updatedUser = await User.findByIdAndUpdate(id, {
            $set: {
                _id: id,
                email: email,
                userName: userName,
                role: role,
                password: hashPassword,
            }
        });
        return updatedUser;
    },
    deleteUser: async (id) => {
        const userDb = await User.findByIdAndDelete(id);
        return userDb;
        // return await User.findByIdAndDelete(id);

    },
    rentMovie: async (userId, movieId) => {
        const userDb = await User.findById(userId);// or get the logged user from request or local storage

        const movieDb = await Movie.findById(movieId)
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

        const isRented = await userDb.rentedMovies.find(m => m._id.toString() === movieId.toString());

        if (isRented) {
            return {
                message: "Cant rent same movie twice. Please choose another",
                success: false
            }
        }

        movieDb.quantity -= 1;
        movieDb.save();

        const movieToRent = await Movie.findById(movieId).
            select("title description _id");

        userDb.rentedMovies.push(movieToRent);
        userDb.save();
        return {
            user: userDb,
            success: true
        }

    },
    returnRentedMovie: async (userId, movieId) => {
        //TO DO
        // get user
        const user = await User.findById(userId);
        const updatedRentedMovies = user.rentedMovies.filter(x => x._id.toString() !== movieId.toString());
        user.rentedMovies = [...updatedRentedMovies];
        user.save();

        const updatedMovie = await Movie.findByIdAndUpdate(movieId, { 
            $set: { quantity: updatedMovie.quantity + 1 } 
        });

        // const movie = await Movie.findById(movieId);
        // movie.quantity +=1;
        // movie.save()
        return updatedMovie;

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

export { userService };