import mongoDb from "mongodb";
import { getDb } from "../util/database.js";


class User {
    constructor(userName, email, cart, id) {
        this.userName = userName;
        this.email = email;
        this.cart = cart; // {items: []}
        this._id = id;
        // this._id = id ? new mongoDb.ObjectId(id) : null 
    }

    save() {
        const db = getDb();
        return db.collection('users').insertOne(this);

        // let dbOp;
        // if(this._id){
        //     //update
        //     dbOp = db.collection('users').updateOne({_id: this._id}, {$set:this});
        // }
        // else {
        //     dbOp = db.collection('users').insertOne(this);
        // }
        // return dbOp
        // .then(result => {
        //     console.log("from inside user", result);
        // })
        // .catch(err => {
        //     console.log(err);
        // });

    }

    addToCart(product) {
        const cartProductIndex = this.cart.items.findIndex(cartProd => {
            return cartProd.productId.toString() === product._id.toString();
        });
        let newQuantity = 1;
        const updatedCartItems = [...this.cart.items];

        if (cartProductIndex >= 0) {
            newQuantity = this.cart.items[cartProductIndex].quantity + 1;
            updatedCartItems[cartProductIndex].quantity = newQuantity;

        }
        else {
            updatedCartItems.push(
                {
                    productId: new mongoDb.ObjectId(product._id),
                    quantity: newQuantity
                });

        }


        const updatedCart = { items: updatedCartItems };

        const db = getDb();
        return db
            .collection('users').updateOne(
                { _id: new mongoDb.ObjectId(this._id) },
                { $set: { cart: updatedCart } }
            );
    }

    getCart() {         // this returns array of Product objects ( user.cart.items)
        const db = getDb();
        const productIds = this.cart.items.map(item => {
            return item.productId;
        });
        // products.find vrakja cursor so referenci do site produkti spored Id! ne vrakja JS Objekt 
        return db
            .collection('products')
            .find({ _id: { $in: productIds } })
            .toArray()
            .then(products => {
                return products.map(p => {
                    return {
                        ...p,
                        quantity: this.cart.items.find(i => {
                            return i.productId.toString() === p._id.toString();
                        }).quantity
                    }
                })
            })
            .catch(err => {
                console.log(err);
            })


    }

    deleteCartItems(productId) {
        const updatedCartItems = this.cart.items.filter(item => {
            return item.productId.toString() !== productId.toString();
        });

        const db = getDb();
        return db
            .collection('users')
            .updateOne(
                { _id: new mongoDb.ObjectId(this._id) },
                { $set: { cart: { items: updatedCartItems } } }
            );
    }

    addOrder() {
        const db = getDb();

        return this.getCart()
            .then(products => {

                const order = {
                    items: products, // na ovoj naci gi vlecam site informacii za produktite. ne me interesira promenata kaj podatocije. ovde mi treba samo 'snapshot'
                    user: {
                        _id: new mongoDb.ObjectId(this._id),
                        userName: this.userName,
                        email: this.email
                    }
                };
                return db
                    .collection('orders')
                    .insertOne(order)
            })
            .then(result => {
                this.cart = { items: [] };

                return db
                    .collection('users')
                    .updateOne(
                        { _id: new mongoDb.ObjectId(this._id) },
                        { $set: { cart: { items: [] } } }
                    );
            });
    }

    getOrders() {
        const db = getDb();
        return db.collection('orders').find({"user._id": new mongoDb.ObjectId(this._id) }).toArray()
    }

    static findById(userId) {
        const db = getDb();
        return db.collection('users').find({ _id: new mongoDb.ObjectId(userId) })
            .next()
            .then(user => {
                console.log(user);
                return user;
            })
            .catch(err => {
                console.log(err);
            });
    }


}

export { User };