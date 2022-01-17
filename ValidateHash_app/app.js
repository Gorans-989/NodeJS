import  express  from "express";
import {router} from "./routes.js"
import dotenv from "dotenv";



dotenv.config();
const app = express();


app.use(express.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); // 
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.use(router);


app.listen(3030);