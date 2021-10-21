import { User } from "../models/user.js";
import bcryptJs from "bcryptjs";
import { Note } from "../models/note.js";
import { userService } from "../services/userService.js";
import Validator from "../validator/inputValidator.js";


const userController = {

    getAll: async (req, res, next) => {

        try {
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
            const userDb = await User.findById(id);
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
            const { email, password, userName, role, notes } = req.body;
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
                notes: notes ? notes : [],
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
            const { email, userName, role, notes, _id, password } = req.body;
            //console.log(_id); //
            const hashPassword = await bcryptJs.hash(password, 12);
            //console.log(hashPassword);
            const user = new User({
                _id: _id,
                email: email,
                userName: userName,
                role: role,
                notes: notes ? notes : [],
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
            const { id } = req.body;
            const userDb = await User.findByIdAndDelete(id);
            console.log(userDb);
            if (!userDb) {
                res.status(404).json({
                    message: "Cant find user with that id"
                });
            };

            res.status(204).json({
                message: "Used deleted!"
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

    addNoteToUser: async (req, res, next) => {

        try {
            const user = await User.findById("616f516454a13fa1bca37697");

            const noteId = req.body._id;
            const noteDb = await Note.findById(noteId);

            if (!noteDb) {
                res.status(404).json({
                    message: `No such note in DB`
                });
            };

            const result = user.addNoteToUser(noteDb)
            if (!result) {
                res.status(404).json({
                    message: ""
                })
            }
            res.status(200).json({
                message: result
            });

        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            res.status(error.statusCode).json({
                message: error.message
            });
        };
    },

    log_in: async (req, res, next) => {

        try {
            const { email, password, userName } = req.body;

            const validate = await Validator.checkEmail(email, password);// should we return the user?
            if (!validate) {
                res.status(404).json({
                    message: `email or password is incorrect`
                })
            }
            res.status(200).json({
                message: `Welcome ${userName}`
                //return property isLogged ?
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