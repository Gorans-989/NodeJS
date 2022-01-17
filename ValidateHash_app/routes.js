import express from "express";
import {checkHash, getToken} from "./service.js";
import auth from "./auth.js";

const router = express.Router();

router.post("/checkhash",auth,checkHash);
router.get("/token",getToken)

export {router};