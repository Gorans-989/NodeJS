import express from "express";
import { noteController } from "../controllers/noteController.js";
const router = express.Router();


//GET all       /notes/
router.get("/notes/", noteController.getAll);

//GET one       /notes/:noteId
router.get("/notes/:noteId", noteController.getOne);

//POST create   /notes/create
router.post("/notes/create", noteController.createNote);

//PUT update    /notes/update
router.put("/notes/update", noteController.updateNote);

//DELETE delete /notes/delete
router.delete("/notes/delete/", noteController.deleteNote);

export {router};