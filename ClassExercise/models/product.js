const fs = require('fs');
const path = require('path');
<<<<<<< HEAD
const Cart = require('./cart');
=======
>>>>>>> 1f9af7c520b3c0f43fa8c0e2f245c1dcb2a93e83

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'products.json'
);

<<<<<<< HEAD

=======
>>>>>>> 1f9af7c520b3c0f43fa8c0e2f245c1dcb2a93e83
const getProductsFromFile = (callBack) => {
    fs.readFile(p, (error, fileContent) => {
        if (error) {
            callBack([]);
        }
        else {
            callBack(JSON.parse(fileContent));
<<<<<<< HEAD
=======
            // ako e prazna databazata frla error 
            // SyntaxError: Unexpected end of JSON input
            // at JSON.parse (<anonymous>)
            // at C:\WEB development\Goran_class_materials\NodeJS\ClassExercise\models\product.js:16:27  
            // at FSReqCallback.readFileAfterClose [as oncomplete] (internal/fs/read_file_context.js:63:3)
>>>>>>> 1f9af7c520b3c0f43fa8c0e2f245c1dcb2a93e83
        }
    });
};

// constructor class
<<<<<<< HEAD
exports = class Product {

    constructor(id, title, imgUrl, description, price) {
        this.id = id,
            this.title = title;
=======
module.exports = class Product {

    constructor(title, imgUrl, description, price) {
        this.title = title;
>>>>>>> 1f9af7c520b3c0f43fa8c0e2f245c1dcb2a93e83
        this.imgUrl = imgUrl;
        this.description = description;
        this.price = price;
    }

    save() {
<<<<<<< HEAD


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
=======
        this.id = Math.random().toString();
        
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (error) => {
                console.log(error)
            });
>>>>>>> 1f9af7c520b3c0f43fa8c0e2f245c1dcb2a93e83
        });
    }

    static fetchAll(callBack) {
        getProductsFromFile(callBack);
    }

    static findById(id, cb) {
        getProductsFromFile(products => {
<<<<<<< HEAD
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
=======
            const product = products.find( p => p.id === id);
            cb(product);
        })
    }
};
>>>>>>> 1f9af7c520b3c0f43fa8c0e2f245c1dcb2a93e83


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