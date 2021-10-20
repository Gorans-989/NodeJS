import Mongoose, { SchemaTypes } from "mongoose";
const Schema = Mongoose.Schema;

const noteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: false
    },
    userId: {
        type: Schema.Types.ObjectId, ref: "User",required:true
    }

})

const Note = Mongoose.model("Note", noteSchema);
export { Note };