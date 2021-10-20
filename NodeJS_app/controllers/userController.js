import { User } from "../models/user.js";
import bcryptJs from "bcryptjs";
import { Note } from "../models/note.js";
import { userService } from "../services/userService.js";

const userController = {

    getAll: async (req, res, next) => {

        try {
            const users = await userService.getAll();
            // if (!user) {
            //    throw new Error({error.statusCode: 404})
            // }
            res.status(200).json({
                message: "Getting all users is successfull!",
                users: users
            });
        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
        }

        // try {
        //     const users = await User.find()
        //         .select("email userName role -_id");
        //     res.status(200).json({
        //         message: "Getting successfull",
        //         users: users

        //     })

        //     //.select("title price -_id") // select the properties you need - for nested object use "." eg: Product.userId.cart.items etc
        //     //.populate('userId', " -_id ") // with the "-" you specify what to exclude
        // } catch (error) {
        //     if (!error.statusCode) {
        //         error.statusCode = 500;
        //     }
        //     res.redirect(500, "/");
        //     //next(error);
        // }
    },

    getOne: async (req, res, next) => {
        const id = req.params.userId;
        console.log(`the id from get one${id}`);
        try {
            const userDb = await User.findById(id);
            if (!userDb) {
                return res.status(422).json({
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
            //res.redirect(500, "/");
            //next(error);
        }
    },

    createUser: async (req, res, next) => {
        //
        const { email, password, userName, role, notes } = req.body;

        try {
            // const userDb = await User.findOne({ "email": email });

            if (await User.findOne({ "email": email })) {
                return res.status(404).json({
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
            }
            res.status(500).json({
                message: "User created Successfully"
            })
            //res.redirect(500, "/");
            //next(error);
        }
    },

    updateUser: async (req, res, next) => {


        try {
            const { email, userName, role, notes, _id } = req.body;
            console.log(email);

            // const hashPassword = await bcryptJs.hash(password, 12);
            // console.log(hashPassword);
            const userDb = await User.findByIdAndUpdate(_id, {
                "email": email,
                //"password": password? hashPassword: "",
                "userName": userName,
                "role": role,
                "notes": notes ? notes : []
            })
            if (!userDb) {
                return res.status(404).json({
                    message: "Error! cant update"
                })
            }

            res.status(201).json({
                message: "User updated!"
            })

        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            //res.redirect(500, "/");
            //next(error);
        }
    },

    deleteUser: async (req, res, next) => {


        try {
            const { id } = req.body;
            const userDb = await User.findByIdAndDelete(id);
            if (!userDb) {
                res.status(404).json({
                    message: "Cant find user with that id"
                })
            }

            res.status(204).json({
                message: "Used deleted!"
            });

        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            //res.redirect(500, "/");
            //next(error);
        }
    },

    addNoteToUser: async (req, res, next) => {

        try {
            const user = await User.findById("616f516454a13fa1bca37697")
            console.log(user);
            // hot to get the user. if he is logged in i need his data to travel with every request until he logs out

            const noteId = req.body._id;


            const noteDb = await Note.findById(noteId);

            console.log(noteDb);

            const result = user.addNoteToUser(noteDb)
            console.log(result);
            res.status(200).json({
                message: result
            });

        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            res.redirect(500, "/");
        }

    }
}

export { userController };