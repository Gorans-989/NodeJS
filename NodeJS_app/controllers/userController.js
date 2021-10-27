// import { User } from "../models/user.js";
// import bcryptJs from "bcryptjs";
// import { Movie } from "../models/movie.js";
import { userService } from "../services/userService.js";

import { createToken, checkPayload } from "../services/tokenService.js";

const userController = {

    getAll: async (req, res, next) => {

        try {
            // is it ok to pass req.headers as parameters?
            const {authorization: authHeader} = req.headers;
            
            if (!(await checkPayload(authHeader))) {
                return res.status(403).json({
                    message: " not admin"
                })

                //second way
                // var err = {};
                // err.message = "not admin!!!";
                // err.statusCode = 404;
                // console.log(err);
                // throw new Error(err);                           
            }
            else {

                const users = await userService.getAll();
                if (!users) {
                    return res.status(404).json({
                        message: "No users to fetch"
                    })
                }
                return res.status(200).json({
                    message: "Getting all users is successfull!",
                    users: users
                });
            }

        } catch (error) {

            //console.log(error.statusCode);
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            return res.status(error.statusCode).json({
                message: error.message
            });
        }
    },

    getOne: async (req, res, next) => {
        // do i need getOne User?? the admin can call getAll and work from there . or call update or delete
        try {
            const {authorization: authHeader} = req.headers;
            if (!(await checkPayload(authHeader))) {
                return res.status(403).json({
                    message: " not admin"
                })

            }
            const { userId } = req.params;//or from body

            const userDb = await userService.getOne(userId);
            if (!userDb) {
                return res.status(404).json({
                    message: `No user found`
                })
            }
            return res.status(200).json({
                message: "user found",
                user: userDb
            })
        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            return res.status(error.statusCode).json({
                message: error.message
            });
        };
    },

    updateUser: async (req, res, next) => {
        try {
            
            const {authorization: authHeader} = req.headers;
            if (!(await checkPayload(authHeader))) {
                return res.status(403).json({
                    message: " not admin"
                })
            }
            //rentedMovies is an array. is it ok to destructure it like this?
            const { email, userName, role, id, password } = req.body;
            const userDb = await userService.updateUser(email, userName, role, id, password ); // is this ok?

            if (!userDb) {
                return res.status(404).json({
                    message: "Error! cant update"
                });
            };

            return res.status(201).json({
                message: "User updated!"
            });

        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500;
            };

            return res.status(error.statusCode).json({
                message: error.message
            });
        };
    },

    deleteUser: async (req, res, next) => {

        try {
            const {authorization: authHeader} = req.headers;
            if (!(await checkPayload(authHeader))) {
                return res.status(403).json({
                    message: " not admin"
                })
            }

            const { id } = req.body;
            const userDb = await userService.deleteUser(id);

            if (!userDb) {
                return res.status(404).json({
                    message: "Cant find user with that id"
                });
            };

            return res.status(204).json({
                message: "User deleted!"
            });

        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500;
            };
            return res.status(500).json({
                message: error
            });
        };
    },

    rentMovie: async (req, res, next) => {
        try {
            const {authorization: authHeader} = req.headers;
            if (!(await checkPayload(authHeader))) {
                return res.status(403).json({
                    message: " not admin"
                })
            }

            const { userId, movieId } = req.body; // 
            const result = await userService.rentMovie(userId, movieId);

            //console.log("returned to controller");

            if (!result.success) {
                return res.status(400).json({
                    message: result.message
                })
            }
            return res.status(201).json({
                message: `Movie rented successfully! `
            })

        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500;
            };
            return res.status(500).json({
                message: error
            });

        }
    },
    returnRentedMovie: async () => {
        //userService.returnRentedMovie()
        //TO DO

    },
    register: async (req, res, next) => {
        try {

            const { email, password, userName, role } = req.body;
            const userObj = await userService.register(email, userName, role, password);

            if (!userObj) {
                return res.status(400).json({
                    message: " Cant use existing email."
                })
            }

            return res.status(201).json({
                message: "User created Successfully"
            })

        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500;
            };
            return res.status(error.statusCode).json({
                message: error.message
            });
        };
    },

    log_in: async (req, res, next) => {

        try {
            const { email, password } = req.body;
            const logedUser = await userService.log_in(email, password);

            if (!logedUser) {
                return res.status(403).json({
                    message: `Email or password is incorrect!`
                })
            }
            return res.status(200).json({
                message: `Welcome ${logedUser.user.userName}`,
                token: logedUser.token

            })
        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            return res.status(error.statusCode).json({
                message: error.message
            });
        }
    },

    log_out: async (req, res, next) => {
        // 1. Check cookies or local storage for loged user
        // 2. Delete from cookies or local storage info about user/ 
        try {


        } catch (error) {

        }
    }
};

export { userController };