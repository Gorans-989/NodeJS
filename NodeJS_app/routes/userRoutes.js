import express from "express";
import verifyToken from "../middleware/auth.js"
const router = express.Router();

import {userController} from "../controllers/userController.js";

//GET   /users
router.get("/users",verifyToken, userController.getAll);
router.get("/users/:userId", userController.getOne); // think of a better way
// POST /users
router.post("/users", userController.createUser);
router.post("/users/addNoteToUser", userController.addNoteToUser);

//DELETE /users/delete
router.delete('/users/delete', userController.deleteUser);

//PUT /users/update
router.put("/users/update", userController.updateUser);

// post /login
router.post("/login", userController.log_in);

export {router};