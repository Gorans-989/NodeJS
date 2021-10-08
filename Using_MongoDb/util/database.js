import { MongoClient as _MongoClient } from 'mongodb';
const MongoClient = _MongoClient;


let _db;
//mongodb+srv://Gost:<password>@mycluster.7iwvx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
const mongoConnect = callback => {
    MongoClient.connect("mongodb+srv://Gost:gogo989@mycluster.7iwvx.mongodb.net/shop?retryWrites=true&w=majority")
        .then(client => {
            console.log('Connected to MyCluster');
            _db = client.db();
            callback()
        })
        .catch(err => {
            console.log("error in the catch block when trying to connect",err);
            throw err;
        });
     
};

const getDb = () => {
    if(_db) {
        return _db;
    }
    throw 'no database found'
}

export {mongoConnect , getDb}
