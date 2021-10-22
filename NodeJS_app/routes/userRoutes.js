import express from "express";
import auth from "../middleware/auth.js"
const router = express.Router();

import { userController } from "../controllers/userController.js";

//GET   /users
router.get("/users", auth, userController.getAll);
router.get("/users/:userId", userController.getOne); 
// POST /users
router.post("/users", auth ,userController.createUser);
router.post("/users/assignNoteToUser", userController.assignNoteToUser);

//DELETE /users/delete
router.delete('/users/delete', auth ,userController.deleteUser);

//PUT /users/update
router.put("/users/update", auth ,userController.updateUser);

// post /login
router.post("/login", userController.log_in);

export { router };