import express from "express";
import {router as movieRouter} from "./movieRoutes";
import {router as userRouter} from "./userRoutes";

const router = express.Router();

router.use(userRouter);
router.use(movieRouter);