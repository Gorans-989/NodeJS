import Mongoose from "mongoose";
import { Note } from "./note.js";
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
    // notes: [{
    //     note: {
    //         type: Object, required: true, ref: "Note"
    //     }
    // }],
    notes: [
        Note
    ]
})


// Array [
//     {
//             _id: "skjfslrj",
//             title: "blabla"
//         }
// ]
userSchema.methods.addNoteToUser = function (note) {
    console.log("======================================");

    const noteToAddIndex = this.notes.findIndex(n => {
        return note._id.toString() === n._id.toString();
    });
    // const isExisting = this.notes.find(n => n._id === note._id);
    // if (isExisting) {
    //     return null;
    // }


    if (noteToAddIndex < 0) {

        console.log(note);
        console.log(this.notes);
        this.notes.push(note);

        this.save();

        console.log("+++++++++++++++++++++++++++++++++++++++++")
        console.log(this.notes)

        return `Note ${note.title} added to user!`;
    }

    return `User already has this Note "${note.title}"`;

    // is it ok to try catch here? maybe is better if i only return the error and handled it in the controller


}



const User = Mongoose.model("User", userSchema);
export { User };