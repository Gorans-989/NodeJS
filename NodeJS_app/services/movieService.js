import { Movie } from "../models/movie.js";
import { User } from "../models/user.js";

const movieService = {

    getAll: async () => {
        const moviesDb = (await Movie.find()).filter(m => m.isDeleted === false);//.filter(m => m.quantity > 0)
        return moviesDb;
    },

    getOne: async (id) => {
        const movieDb = await Movie.findById(id);
        if (movieDb.isDeleted === true) {
            return false;
        }
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
            description: description ? description : " "
        })
        newMovie.save();
        return newMovie;
    },

    updateMovie: async (id, title, genre, quantity, description) => {
        //  findByIdAndUpdate returns the original document, not the updated one
        const updatedMovie = await Movie.findByIdAndUpdate(id, {
            $set: {
                "title": title,
                "quantity": quantity,
                "genre": genre,
                "description": description,
                "isDeleted" : false
            }
        });

        if(!updatedMovie){
            return false;
        }
        
        //update movie in rented movies!
        const users = await User.find();//array of users
       
        if(!users) {
            return false;
        }

        for (let u of users) {
            const movieForUpdate = u.rentedMovies.find(m => m._id.toString() === id.toString());
            //const indexOfMovie = u.rentedMovies.indexOf(movieForUpdate);
            if (movieForUpdate) {
                movieForUpdate.title = title? title: updatedMovie.title;
                movieForUpdate.description = description? description: updatedMovie.description;
                u.save();
            }
        }

        return updatedMovie;// the original document is returned// think it a little
    },

    deleteMovie: async (id) => {
        
        const deletedMovie = await Movie.findByIdAndUpdate(id, { 
            $set: {
                "isDeleted": true,
                "quantity": 0 
            }
        }); // to use for each user.rentedMoviList
        const users = await User.find();//array of users
                
        for (let u of users) {
            const updatedRentedMovies = u.rentedMovies.filter(m => m._id.toString() !== id.toString());
            console.log(`****-${updatedRentedMovies} \n`);
            u.rentedMovies = [...updatedRentedMovies];
            u.save();
        }
        
        return deletedMovie;
    }
}


export { movieService };