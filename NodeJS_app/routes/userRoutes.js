import express from "express";
import auth from "../middleware/auth.js"
import { userController } from "../controllers/userController.js";
import {passportAuth} from "../middleware/passport.js"

const router = express.Router();

//GET   /users
router.get("/users", passportAuth, userController.getAll);
router.get("/users/:userId",  userController.getOne);
// POST /users
router.post("/users/register", userController.register);

router.post("/users/rentmovie", auth, userController.rentMovie);
router.post("/users/returnmovie", userController.returnRentedMovie);

//DELETE /users/delete
router.delete('/users/delete', auth, userController.deleteUser);

//PUT /users/update
router.put("/users/update", auth, userController.updateUser);

// post /login
router.post("/login", userController.log_in);

export { router };