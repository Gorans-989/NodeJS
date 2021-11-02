import express from "express";
import { movieController } from "../controllers/movieController.js";
import auth from "../middleware/auth.js"
const router = express.Router();


//GET all       /notes/
router.get("/movies/", movieController.getAll);

//GET one       /notes/:noteId
router.get("/movies/:movieId", movieController.getOne);

//POST create   /notes/create
router.post("/movies/create", auth, movieController.createMovie);

//PUT update    /notes/update
router.put("/movies/update", auth,movieController.updateMovie);

//DELETE delete /notes/delete
router.put("/movies/delete/",auth , movieController.deleteMovie);

export { router };