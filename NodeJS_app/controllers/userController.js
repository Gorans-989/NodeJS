import { User } from "../models/user.js";


const userController = {

    getAll: async (req, res, next) => {
        try {
            const users = await User.find()
                .select("email userName role -_id");
            res.status(200).json({
                message: "Getting successfull",
                users: users

            })

            //.select("title price -_id") // select the properties you need - for nested object use "." eg: Product.userId.cart.items etc
            //.populate('userId', " -_id ") // with the "-" you specify what to exclude
        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            res.redirect(500, "/");
            //next(error);
        }
    },

    getOne: async (req, res, next) => {
        const id = req.params.userId;
        console.log(id);
        try {
            const userDb = await User.findById(id);
            if (!userDb){
                return res.status(302).json({
                    message: `No user found with id: ${id}`
                })
            }

            res.status(200).json({
                message: "user found",
                user: userDb
            })
        } catch (error) {
            if(!error.statusCode){
                error.statusCode = 500;
            }
            res.redirect(500, "/");
            //next(error);
        }
    },

    createUser: async (req, res, next) => {
        //
        const { email, password, userName, role, notes } = req.body;

        try {
            // const userDb = await User.findOne({ "email": email });

            if (await User.findOne({ "email": email })) {
                return res.status(200).json({
                    message: " Cant use existing email."
                })
            }

            const user = new User({
                email: email,
                userName: userName,
                role: role,
                notes: notes ? [] : notes,
                password: password
            });
            user.save();
            res.status(201).json({
                message: "User created Successfully"
            })

        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            res.redirect(500, "/");
            //next(error);
        }
    },

    updateUser: async (req, res, next) => {

        const { email, password, userName, role, notes, id } = req.body;
        console.log(email);
        try {

            const userDb = await User.findByIdAndUpdate(id, {
                "email": email,
                "password": password,
                "userName": userName,
                "role": role,
                "notes": notes
            })
            if (!userDb) {
                return res.status(200).json({
                    message: "Error!"
                })
            }

            res.status(201).json({
                message: "User updated!"
            })

        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            res.redirect(500, "/");
            //next(error);
        }
    },

    deleteUser: async (req, res, next)=> {
        
        
        try {
            const {id} = req.body;
            const userDb = await User.findByIdAndDelete(id);
            if(!userDb){
                res.status(200).json({
                    message:"Cant find user with that id"
                })   
            }    

            res.status(200).json({
                message:"Used deleted!"
            });   

        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            res.redirect(500, "/");
            //next(error);
        }
    }
}

export { userController };