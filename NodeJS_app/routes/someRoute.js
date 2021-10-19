import express from "express";
const router = express.Router();

import {adminController} from "../controllers/adminController.js";

router.get("/posts", adminController.getPost);
router.post("/posts", adminController.postNewPost);

export {router};