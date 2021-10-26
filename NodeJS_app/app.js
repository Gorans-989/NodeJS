import express from "express";
import  mongoose from "mongoose";
import { router as userRoutes } from "./routes/userRoutes.js";
import { router as movieRoutes} from "./routes/movieRoutes.js";
import urlDb from "./config/database.js";
import pageNotFound from "./controllers/pageNotFound.js";

import dotEnv from "dotenv";
dotEnv.config();


const app = express();// start server

app.use(express.json()); // parse the incoming request

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); // 
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
})// for removing CORS ( cross origin resource sharing)



app.use(userRoutes);
app.use(movieRoutes);

app.use("/",pageNotFound);

mongoose.connect(urlDb)
.then(result => {
    // const user = new User({
    //     email: "goran@test.com",
    //     userName: "Gost",
    //     password: "123",
    //     role: "admin",
    //     notes: []
    // })
    // user.save();

    console.log("DB conected");
    
})
.catch(err => {
    console.log(err)
})
app.listen(8080);