import Mongoose from "mongoose";

const Schema = Mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    notes: [{
        type: Object
    }]
});

userSchema.methods.assignNoteToUser = function (note) {

    const noteToAdd = this.notes.find(n => n._id.toString() === note._id.toString()); 
    console.log(noteToAdd);
    if (!noteToAdd) {
        this.notes.push(note);
        this.save();
        return `Note ${note.title} added to user!`;
    }
    throw new Error(`User already has this Note "${note.title}"`)
}


const User = Mongoose.model("User", userSchema);
export { User };
