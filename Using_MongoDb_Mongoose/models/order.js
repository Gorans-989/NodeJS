import mongoose from "mongoose";
const Schema = mongoose.Schema;


const orderSchema = new Schema({
    products: [{
        product: {
            type: Object,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    user: {
        name: {
            type: Object,
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User"
        }
    }
});

const orderModel = mongoose.model('Order', orderSchema);
export { orderModel };