import { Movie } from "../models/movie.js";

const movieController = {

    getAll: async (req, res, next) => {

        try {
            const movieDb = await Movie.find();
            if (!movieDb) {
                return res.status(404).json({
                    message: "no movies in database"
                });
            }

            res.status(200).json({
                message: "Fetching data is successfully",
                movies: movies
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
            const movieDb = await Movie.findById(id);

            if (!movieDb) {
                res.status(404).json({
                    message: `Error! Cant find movie. `
                })
            }

            res.status(200).json({
                message: "Gettind data is successfull",
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

            const token = req.headers.authorization.split(" ")[1];
            const payload = decodeToken(token);

            if (payload.role !== "admin") {
                //one way 
                return res.status(403).json({
                    message: " not admin"
                })
            }

            const { title, genre, quantity, description } = req.body;
            const movieDb = await Movie.findOne({ "title": title });

            if (movieDb) {
                return res.status(200).json({
                    message: "the note already exists in database"
                });
            }
            const newMovie = new Movie({
                title: title,
                genre: genre,
                quantity: quantity,
                description: description ? description : ""
            })
            newMovie.save();
            res.status(201).json({
                message: "Note created!",
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

            const token = req.headers.authorization.split(" ")[1];
            const payload = decodeToken(token);

            if (payload.role !== "admin") {
                //one way 
                return res.status(403).json({
                    message: " not admin"
                })
            }

            const { _id, title, genre, quantity, description } = req.body;

            const newMovie = new Movie({
                title: title,
                genre: genre,
                quantity: quantity,
                description: description ? description : "",
                _id: _id
            })

            const movieDb = await Movie.findByIdAndUpdate(_id, newMovie);
            console.log(movieDb);
            if (!movieDb) {
                res.status(404).json({
                    message: `Movie doesnt exist. Cant update!`
                })
            }
            res.status(201).json({
                message: "Note updated!"
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

            const token = req.headers.authorization.split(" ")[1];
            const payload = decodeToken(token);

            if (payload.role !== "admin") {
                //one way 
                return res.status(403).json({
                    message: " not admin"
                })
            };

            const id = req.body._id;
            const movieDb = await Movie.findByIdAndDelete(id);
            console.log(movieDb);
            if (!movieDb) {
                res.status(404).json({
                    message: `Can find Movie to delete!`
                })
            }

            res.status(204).json({
                message: "note deleted successfully"
            })
        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            res.status(error.statusCode).json({
                message: error.message
            });
        }
    }
}



export { movieController };