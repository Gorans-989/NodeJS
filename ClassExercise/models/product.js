const fs = require('fs');
const path = require('path');
const Cart = require('./cart');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'products.json'
);


const getProductsFromFile = (callBack) => {
    fs.readFile(p, (error, fileContent) => {
        if (error) {
            callBack([]);
        }
        else {
            callBack(JSON.parse(fileContent));
        }
    });
};

// constructor class
exports = class Product {

    constructor(id, title, imgUrl, description, price) {
        this.id = id,
            this.title = title;
        this.imgUrl = imgUrl;
        this.description = description;
        this.price = price;
    }

    save() {


        getProductsFromFile(products => {
            if (this.id) {
                const prodIndex = products.findIndex(p => p.id === this.id);
                const updatedProducts = [...products];
                updatedProducts[prodIndex] = this;
                fs.writeFile(p, JSON.stringify(updatedProducts), (error) => {
                    console.log(error)
                });
            }
            else {
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), (error) => {
                    console.log(error)
                });
            }
        });
    }

    static fetchAll(callBack) {
        getProductsFromFile(callBack);
    }

    static findById(id, cb) {
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id);
            cb(product);
        })
    }

    static deleteById(id) {
        getProductsFromFile(products => {
            const prod = products.find(p => p.id === id);
            const updatedProducts = products.filter(p => p.id !== id);
            
            fs.writeFile(p, JSON.stringify(updatedProducts), (error) => {

                if (!error) {

                    Cart.deleteProduct(id, prod.price)


                }
            });
        });
    };
} 


// da ne zaboravam kako e napraveno
// static fetchAll(callBack) {
//     fs.readFile(p, (error, fileContent) => {
//         if (error) {
//             callBack([]);
//         }
//         callBack(JSON.parse(fileContent));
//         //od file gi cita , gi parsira vo jsObjekt i potoa ja povikuva callback funkcijata koja go prima parsiraniot objekt (produktite) i go renderira ( toa i e funkcijata)
//     });
// }