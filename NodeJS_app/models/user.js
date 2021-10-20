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
        note: {
            type: Schema.Types.ObjectId, ref: "Note", required: true
        }
    }]

})


const User = Mongoose.model("User", userSchema);
export { User };