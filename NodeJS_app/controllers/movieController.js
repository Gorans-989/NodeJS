// import { Movie } from "../models/movie.js";
import { checkPayload } from "../services/tokenService.js"
import { movieService } from "../services/movieService.js"


const movieController = {

    getAll: async (req, res, next) => {

        try {
            const moviesDb = await movieService.getAll();//.filter(m => m.quantity > 0)
            if (!moviesDb) {
                return res.status(404).json({
                    message: "no movies in database"
                });
            }

            return res.status(200).json({
                message: "Fetching data is successfully",
                movies: moviesDb
            })

        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            res.status(error.statusCode).json({
                message: error.message
            });
        }
    },

    getOne: async (req, res, next) => {
        try {
            const id = req.params.movieId;
            const movieDb = await movieService.getOne(id);

            if (!movieDb) {
                return res.status(404).json({
                    message: `Error! Cant find movie. `
                })
            }

            return res.status(200).json({
                message: "Getting data is successfull",
                movie: movieDb
            })

        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            res.status(error.statusCode).json({
                message: error.message
            });
        }
    },

    createMovie: async (req, res, next) => {
        try {
            if (!checkPayload(req.headers)) {
                return res.status(403).json({
                    message: " not admin"
                })
            }

            const { title, genre, quantity, description } = req.body;
            const newMovie = await movieService.createMovie(title, genre, quantity, description);
            if (!newMovie) {
                return res.status(400).json({
                    message: " Movie already exists"
                })
            }

            return res.status(201).json({
                message: "Movie created!",
                movie: newMovie
            });

        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            res.status(error.statusCode).json({
                message: error.message
            });
        }
    },

    updateMovie: async (req, res, next) => {
        try {
            if (!checkPayload(req.headers)) {
                return res.status(403).json({
                    message: " not admin"
                })
            }

            const { _id, title, genre, quantity, description } = req.body;
            const movieDb = await movieService.updateMovie(_id, title, genre, quantity, description);

            if (!movieDb) {
                return res.status(404).json({
                    message: `Movie doesnt exist. Cant update!`
                })
            }
            return res.status(201).json({
                message: "Movie updated!"
            })

        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            res.status(error.statusCode).json({
                message: error.message
            });
        }
    },

    deleteMovie: async (req, res, next) => {

        try {

            if (!checkPayload(req.headers)) {
                return res.status(403).json({
                    message: " not admin"
                })
            }

            const { id } = req.body;
            const deletedMovie = await movieService.deleteMovie(id); // returns null of the object

            if (!deletedMovie) {
                return res.status(404).json({
                    message: `Cant find Movie to delete!`
                })
            }

            // if i use 204 i cant return the message because is no content
            return res.status(204).json({
                message: `Movie deleted successfully!` 
            })

        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            return res.status(error.statusCode).json({
                message: error.message
            });
        }
    }
}



export { movieController };