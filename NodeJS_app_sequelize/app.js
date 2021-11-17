import express from "express";
import {router as userRoutes} from "./routes/userRoutes.js"
import {router as movieRoutes} from "./routes/movieRoutes.js";
import pageNotFound from "./controllers/pageNotFound.js";
import passport from "passport";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

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
app.listen(8080);