import express from "express";
import { router as adminRoutes } from "./routes/someRoute.js"
//import bodyParser from "body-parser" deprecated




const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); // 
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
})
app.use("/", adminRoutes);


app.listen(8080);