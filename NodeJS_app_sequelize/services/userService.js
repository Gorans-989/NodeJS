import { userModel as User } from "../models/user.js";
import { movieModel as Movie } from "../models/movie.js";
import { rentedMoviesModel as RentedMovies } from "../models/rentedMovies.js";
import bcryptjs from "bcryptjs";
import Validator from "../helpers/validator.js"
import { createToken, checkPayload } from "./tokenService.js";
import { movieService } from "./movieService.js";

User.belongsToMany(Movie, { through: RentedMovies });
Movie.belongsToMany(User, { through: RentedMovies });

const userService = {

    getAll: async () => {
        const users = await User.findAll(); // returns a array
        if (!users) {
            return false;
        }

        return users;
    },

    getOne: async (id) => {
        const userDb = await User.findByPk(id);
        if (!userDb) {
            return false;
        }

        return userDb;
    },

    updateUser: async (email, userName, role, id, password) => {

        const userDb = await User.findByPk(id);

        if (!userDb) {
            return false;
        }

        if (!password) {
            return false;
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const updatedUser = await userDb.update(
            {
                email: email,
                password: hashedPassword,
                userName: userName,
                role: role

            });
        return updatedUser;
    },

    deleteUser: async (id) => {
        // const userToDelete = await User.findByPk(id);
        // userToDelete.isActive = false;

        const deletedUser = await User.destroy({
            where: { id: id }
        });
        return deletedUser;
    },

    registerUser: async (email, password, userName) => {
        const existingUser = await User.findOne({
            where: { email: email }
        })

        if (existingUser) {
            return false;
        }

        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);

        const newUser = await User.create({
            email: email,
            userName: userName,
            password: hashPassword
        });

        return newUser;
    },

    rentMovie: async (userId, movieId) => {
        const user = await userService.getOne(userId);
        if (!user) {
            return {
                message: "user not found",
                success: false
            };
        }

        const userRentalList = await user.getMovies();
        if (userRentalList.length >= 4) {
            return {
                message: "Cant rent more than 4 movies",
                success: false
            }
        }

        const isRentedFromUser = userRentalList.find(x => x.id === movieId);
        if (isRentedFromUser) {
            return {
                message: "Cant rent same movie twice",
                success: false
            }
        }

        const movie = await movieService.getOne(movieId);
        if (movie.quantity <= 0) {
            return {
                message: "Out of stock",
                success: false
            };
        }

        const updatedRentalList = await user.addMovie(movie);
        const updatedMovieQuantity = await movie.update({
            "quantity": movie.quantity - 1
        })

        return {
            message: "this works",
            success: true
        }

    },

    returnRentedMovie: async (userId, movieId) => {
        const user = await User.findByPk(userId);
        const userRentals = await user.getMovies({
            where: {
                "id": movieId
            }
        });

        if (userRentals.length <= 0) {
            return false;
        }
        
        const returned = await user.removeMovie(userRentals[0]);
        if (returned != 1) {
            return false;
        }

        const updatedMovie = await userRentals[0].update({
            "quantity": userRentals[0].quantity + 1
        });

        return true;

    },

    log_in: async (email, password) => {

        const validatedUser = await Validator.checkCredentials(email, password);
        if (!validatedUser) {
            return false;
        };
        
        const signInToken = createToken(validatedUser);
        return {
            user: validatedUser,
            token: signInToken
        };
    }
}


//This will add methods getUsers, setUsers, addUser,addUsers to Movies, and getMovies, setMovies, addMovie, and addMovies to User.
export { userService };