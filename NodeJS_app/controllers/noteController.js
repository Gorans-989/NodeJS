import { Note } from "../models/note.js";

const noteController = {

    getAll: async (req, res, next) => {

        try {
            const noteDb = await Note.find();
            if (!noteDb) {
                return res.status(200).json({
                    message: "no notes in database"
                });
            }

            res.status(200).json({
                message: "Fetching data is successfully",
                notes: noteDb
            })

        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            //next(error);
        }
    },

    getOne: async (req, res, next) => {
        try {
            const id = req.params.noteId;
            const noteDb = await Note.findById(id);

            if (!noteDb) {
                res.status(200).json({
                    message: `Cant find note with id: ${id}`
                })
            }

            res.status(200).json({
                message: "Gettind data is successfull",
                note: noteDb
            })

        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
           res.redirect(500,"/");
           //next(error);
        }
    },

    createNote: async (req, res, next) => {

        const { title, content, type, color } = req.body;

        try {
            const noteDb = await Note.findOne({ "title": title });

            if (noteDb) {
                return res.status(200).json({
                    message: "the note already exists in database"
                });
            }
            const newNote = new Note({
                title: title,
                content: content,
                type: type,
                color: color ? color : null

            })
            newNote.save();
            res.status(201).json({
                message: "Note created!",
                note: newNote
            })

        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            res.redirect(500, "/");
            //next(error);
        }
    },

    updateNote: async (req, res, next) => {

        const { _id, title, type, color, content } = req.body;
        try {

            const newNote = new Note({
                title: title,
                content: content,
                type: type,
                color: color ? color : null,
                _id: _id
            })

            const noteDb = await Note.findByIdAndUpdate(_id, newNote);
            if (!noteDb) {
                // do i need return here? i cant send 2 responces at once
                res.status(200).json({
                    message: `Note with id: ${_id} doesnt exist. cant update!`
                })
            }
            res.status(201).json({
                message: "Note updated!"
            })

        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            res.redirect(500, "/");
            //next(error);
        }
    },

    deleteNote: async (req, res, next) => {

        try {
            const id = req.body._id;
            const noteDb = await Note.findByIdAndDelete(id);
            if (!noteDb) {
                res.status(200).json({
                    message: `Can find note with id: ${id} to delete!`
                })
            }

            res.status(200).json({
                message: "note deleted successfully"
            })

        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            res.redirect(500, "/");
            //next(error);
        }
    }
}



export { noteController };