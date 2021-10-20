import express from "express";
import  mongoose from "mongoose";
import { router as userRoutes } from "./routes/userRoutes.js";
import { router as noteRoutes} from "./routes/noteRoutes.js";
//import bodyParser from "body-parser" deprecated
import urlDb from "./db/database.js";
import {User} from "./models/user.js";

import pageNotFound from "./controllers/404.js";

const app = express();// start server

app.use(express.json()); // parse the incoming request

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); // 
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
})// for removing CORS ( cross origin resource sharing)



app.use(userRoutes);
app.use(noteRoutes);

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