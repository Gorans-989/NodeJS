import express from "express";
import {router as movieRouter} from "./movieRoutes";
const router = express.Router();


router.use(movieRouter);

