import Mongoose from "mongoose";
const Schema = Mongoose.Schema;

const movieSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isDeleted: {
        type:Boolean,
        required:true
    }

})

const Movie = Mongoose.model("Movie", movieSchema);

export { Movie , movieSchema };