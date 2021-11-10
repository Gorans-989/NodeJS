import express from "express";
import mongoose from "mongoose";
import { router as userRoutes } from "./routes/userRoutes.js";
import { router as movieRoutes } from "./routes/movieRoutes.js";
import urlDb from "./config/database.js";
import pageNotFound from "./controllers/pageNotFound.js";
import passport from "passport";
import dotenv from "dotenv";
import sequelDB from "./Sequelize/config/db.js";

import userModel from "./Sequelize/models/user.js";
import movieModel from "./Sequelize/models/movie.js";

dotenv.config();

//node -r dotenv/config app.js dotenv_config_path=./.env




const app = express();// start server
app.use(express.json()); // parse the incoming request

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); // 
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
})// for removing CORS ( cross origin resource sharing)

app.use(passport.initialize());

app.use(userRoutes);
app.use(movieRoutes);

app.use("/", pageNotFound);

//using mongoDB with Mongoose
mongoose.connect(urlDb)
.then(result => {
       console.log("DB conected");

})
.catch(err => {
    console.log(err)
})

// sequelDB.sync()
//     .then(result => {
//         console.log("MySql_db connected");

//     })
//     .catch(err => {
//         console.log("err")
//     });

 //app.listen(8080);  
app.listen(3000);