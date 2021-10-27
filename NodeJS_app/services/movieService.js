import { Movie } from "../models/movie.js";
import { User } from "../models/user.js";

const movieService = {

    getAll: async () => {
        const moviesDb = await Movie.find();//.filter(m => m.quantity > 0)
        return moviesDb;
    },

    getOne: async (id) => {

        const movieDb = await Movie.findById(id);
        return movieDb;
    },

    createMovie: async (title, genre, quantity, description) => {
        const movieObj = await Movie.findOne({ "title": title });
        if (movieObj) {
            return false;
        }

        const newMovie = new Movie({
            title: title,
            genre: genre,
            quantity: quantity,
            description: description ? description : ""
        })
        newMovie.save(); // is this a promise?? should i use await
        return newMovie;
    },

    updateMovie: async (_id, title, genre, quantity, description) => {

        const newMovie = new Movie({
            title: title,
            genre: genre,
            quantity: quantity,
            description: description ? description : "",
            _id: _id
        })

        const updatedMovie = await Movie.findByIdAndUpdate(_id, newMovie);
        return updatedMovie;
    },

    deleteMovie: async (id) => {
        //add logic to remove movies from user property Rented movies!!!
        const allUsers = await User.find(); // array of users
        // Update the rented movie list 
        //const [{rentedMovies}] = allUsers; // rented movie list for first user
        
       

        const deletedMovie = await Movie.findByIdAndDelete(id); // to use for each user.rentedMoviList

        console.log("==========", deletedMovie);
        return deletedMovie;
    }
}


export { movieService };