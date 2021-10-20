import express from "express";
const router = express.Router();

import {userController} from "../controllers/userController.js";


//GET   /users
router.get("/users", userController.getAll);
router.get("/users/:userId", userController.getOne);
// POST /users
router.post("/users", userController.createUser);

//DELETE /users/delete
router.delete('/users/delete', userController.deleteUser);


//PUT /users/update
router.put("/users/update", userController.updateUser);


export {router};