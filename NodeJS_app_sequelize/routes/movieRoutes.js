import express from "express";
import { movieController } from "../controllers/movieController.js";
import auth from "../middleware/auth.js"
const router = express.Router();


//GET all       /movies/
router.get("/movies/", movieController.getAll);

//GET one       /movies/:noteId
router.get("/movies/:movieId", movieController.getOne);

//POST create   /movies/create
router.post("/movies/create", auth, movieController.createMovie);

//PUT update    /movies/update
router.put("/movies/update", auth, movieController.updateMovie);

//DELETE delete /movies/delete
router.put("/movies/delete/", auth, movieController.deleteMovie);

export { router };