import { movieModel as Movie } from "../models/movie.js";

const movieService = {

    getOne: async (id) => {
        const movie = await Movie.findByPk(id);
        if(!movie) {
            return false;
        }
        
        return movie;
    },

    getAll: async () => {
        const movies = await Movie.findAll({
            where: {
            "isDeleted" : false
            }
        });
        return movies;
    },

    createMovie: async (title, genre, quantity, description) => {
        const existingMovie = await Movie.findOne({
            where: { "title": title }
        });

        if (existingMovie) {
            return false;
        }

        const newMovie = await Movie.create({
            title: title,
            genre: genre,
            quantity: quantity,
            description: description
        });

        return newMovie;

    },

    updateMovie: async (id, title, genre, quantity, description) => {
        const existingMovie = await movieService.getOne(id);
       
        if(!existingMovie){
            return false;
        }

        const updatedMovie = await existingMovie.update({
            title: title,
            genre: genre,
            quantity: quantity,
            description: description
        });

        return updatedMovie;
    },

    deleteMovie: async (id)=> {
        const movie = await movieService.getOne(id);
        
        if(!movie) {
            return false;
        }
        const isDeleted = await movie.update({
            "isDeleted": true,
            "quantity": 0
        })
        const deleteMovieFromRentedList = movie.setUsers([])
        return isDeleted;
    }
}

export { movieService };