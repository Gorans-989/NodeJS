import { getDb } from "../util/database.js";
import mongoDb from "mongodb";

class Product {
    constructor(title, price, description, imgUrl, id, userId) {
        this.title = title,
            this.price = price,
            this.description = description,
            this.imgUrl = imgUrl,
            this._id = id ? new mongoDb.ObjectId(id) : null,
            this.userId = userId
    }

    save() {
        const db = getDb();
        let dbOp;
        if (this._id) {
            //update product
            dbOp = db.collection('products').updateOne({ _id: this._id }, { $set: this }); //$set: title : this.title setiranje propertinja poedinecno
        }
        else {
            dbOp = db.collection('products')
                .insertOne(this);
        }
        return dbOp
            .then(result => {
                console.log("from inside product", result);
            })
            .catch(err => {
                console.log(err);
            });
    };
    static fetchAll() {
        const db = getDb();
        return db.collection('products')
            .find()
            .toArray()// find returns a cursor (mongo db function find ())
            //cursor holds references to objects
            .then(products => {
                console.log('why is active', products);
                return products;
            })
            .catch(err => {
                console.log(err);
            });
    };
    static findById(prodId) {
        const db = getDb();
        return db.collection('products')
            .find({ _id: new mongoDb.ObjectId(prodId) })
            .next()
            .then(product => {
                console.log(product);
                return product;
            })
            .catch(err => {
                console.log(err);
            })
    };
    static deletebyId(prodId) {
        const db = getDb();
        return db
            .collection('products')
            .deleteOne({ _id: new mongoDb.ObjectId(prodId) })
            .then(result => {
                console.log("Deleted successfully");
            })
            .catch(err => {
                console.log(err);
            })
    };
};

export { Product };