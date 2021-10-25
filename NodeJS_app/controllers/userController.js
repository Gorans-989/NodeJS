import { User } from "../models/user.js";
import bcryptJs from "bcryptjs";
import { Movie } from "../models/movie.js";
import { userService } from "../services/userService.js";
import Validator from "../helpers/validation.js";
import { createToken, decodeToken } from "../services/tokenService.js";




const userController = {

    getAll: async (req, res, next) => {

        try {
            const token = req.headers.authorization.split(" ")[1];
            const payload = decodeToken(token);

            if (payload.role !== "admin") {
                //one way 
                res.status(403).json({
                    message: " not admin"
                })
                //second way
                //throw new Error()
            }
            else {
            
                const users = await userService.getAll();
                if (!users) {
                    res.status(404).json({
                        message: "No users to fetch"
                    })
                }
                res.status(200).json({
                    message: "Getting all users is successfull!",
                    users: users
                });
            }

        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            res.status(error.statusCode).json({
                message: error.message
            });
        }
    },

    getOne: async (req, res, next) => {
        try {

            const id = req.params.userId;

            const userDb = await User.findById(id)
                .select("email userName role -_id");
            if (!userDb) {
                return res.status(404).json({
                    message: `No user found with id: ${id}`
                })
            }
            res.status(200).json({
                message: "user found",
                user: userDb
            })
        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            res.status(error.statusCode).json({
                message: error.message
            });
        };
    },

    createUser: async (req, res, next) => {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const payload = decodeToken(token);

            if (payload.role !== "admin") {
                //one way 
                return res.status(403).json({
                    message: " not admin"
                })
            }

            const { email, password, userName, role, movies } = req.body;
            const userDb = await User.findOne({ "email": email });

            if (userDb) {
                return res.status(400).json({
                    message: " Cant use existing email."
                })
            }

            const hashPassword = await bcryptJs.hash(password, 12);
            const user = new User({
                email: email,
                userName: userName,
                role: role,
                movies: movies ? movies : [],
                password: hashPassword
            });
            user.save();
            res.status(201).json({
                message: "User created Successfully"
            })

        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500;
            };
            res.status(500).json({
                message: error.message
            });
        };
    },

    updateUser: async (req, res, next) => {
        try {

            const token = req.headers.authorization.split(" ")[1];
            const payload = decodeToken(token);

            if (payload.role !== "admin") {
                //one way 
                return res.status(403).json({
                    message: " not admin"
                })
            }

            const { email, userName, role, movies, _id, password } = req.body;
            //console.log(_id); //
            const hashPassword = await bcryptJs.hash(password, 12);
            //console.log(hashPassword);
            const user = new User({
                _id: _id,
                email: email,
                userName: userName,
                role: role,
                movies: movies ? movies : [],
                password: hashPassword
            });

            const userDb = await User.findByIdAndUpdate(_id, user);
            //console.log(userDb);

            if (!userDb) {
                res.status(404).json({
                    message: "Error! cant update"
                });
            };

            res.status(201).json({
                message: "User updated!"
            });

        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500;
            };

            res.status(error.statusCode).json({
                message: error.message
            });
        };
    },

    deleteUser: async (req, res, next) => {

        try {

            const token = req.headers.authorization.split(" ")[1];
            const payload = decodeToken(token);

            if (payload.role !== "admin") {
                //one way 
                return res.status(403).json({
                    message: " not admin"
                })
            };
            

            const { id } = req.body;
            const userDb = await User.findByIdAndDelete(id);
            console.log(userDb);
            if (!userDb) {
                res.status(404).json({
                    message: "Cant find user with that id"
                });
            };

            res.status(204).json({
                message: "User deleted!"
            });

        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500;
            };
            res.status(500).json({
                message: error
            });
        };
    },

    // assignNoteToUser: async (req, res, next) => {

    //     try {
    //         const user = await User.findById("616f516454a13fa1bca37697");

    //         const noteId = req.body._id;
    //         const noteDb = await Note.findById(noteId);

    //         if (!noteDb) {
    //             res.status(404).json({
    //                 message: `No such note in DB`
    //             });
    //         };

    //         const result = user.assignNoteToUser(noteDb)
    //         if (!result) {
    //             res.status(404).json({
    //                 message: ""
    //             })
    //         }
    //         res.status(200).json({
    //             message: result
    //         });

    //     } catch (error) {
    //         if (!error.statusCode) {
    //             error.statusCode = 500;
    //         }
    //         res.status(error.statusCode).json({
    //             message: error.message
    //         });
    //     };
    // },

    log_in: async (req, res, next) => {

        try {
            const { email, password, userName } = req.body;

            const validatedUser = await Validator.check(email, password);// should we return the user?
            if (!validatedUser) {
                res.status(404).json({
                    message: `email or password is incorrect`
                })
            }

            const signInToken = createToken(validatedUser);

            res.status(200).json({
                message: `Welcome ${userName}`,
                token: signInToken

            })
        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            res.status(error.statusCode).json({
                message: error.message
            });
        }
    },

    log_out: async (req, res, next) => {
        // islogged property in user or in the request. 
        try {


        } catch (error) {

        }
    }
};

export { userController };