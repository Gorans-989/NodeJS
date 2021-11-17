import { userModel as User } from "../models/user.js";
import { movieModel as Movie } from "../models/movie.js";
import { rentedMoviesModel as RentedMovies } from "../models/rentedMovies.js";
import bcryptjs from "bcryptjs";
import Validator from "../../helpers/validation.js";
import { createToken, checkPayload } from "../../services/tokenService.js";

User.belongsToMany(Movie, { through: RentedMovies });
Movie.belongsToMany(User, { through: RentedMovies });

const getAll = async () => {
    const users = await User.findAll(); // returns a array
    if (!users) {
        return false;
    }
    return users;
},

const getOne = async (id) => {
    const userDb = await User.findByPk(id);
    if (!userDb) {
        return false;
    }
    return userDb;
},

const updateUser = async (email, password, userName, role, id) => {
    const userDb = await User.findByPk(id);
    if (!userDb) {
        return false;
    }

    if (!password) {
        return false;
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const updatedUser = await User.update({
        email: email,
        password: hashedPassword,
        userName: userName,
        role: role
    })
    console.log(updatedUser);

    return updatedUser;
}

const deleteUser = async (id) => {
    // const userToDelete = await User.findByPk(id);
    // userToDelete.isActive = false;

    const deletedUser = await User.destroy({
        where: { id: id }
    });
    return deletedUser;
},

const registerUser = async (email, password, userName) => {
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

const log_in = async (email, password) => {

    const validatedUser = Validator.checkCredentials(email, password);
    if (!validatedUser) {
        return false;
    };

    const signInToken = createToken(validatedUser);
    return {
        user: validatedUser,
        token: signInToken
    };
}


//This will add methods getUsers, setUsers, addUser,addUsers to Movies, and getMovies, setMovies, addMovie, and addMovies to User.
export { getAll, getOne, registerUser, updateUser };