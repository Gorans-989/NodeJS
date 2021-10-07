const fs = require('fs');
const path = require('path');

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
            // ako e prazna databazata frla error 
            // SyntaxError: Unexpected end of JSON input
            // at JSON.parse (<anonymous>)
            // at C:\WEB development\Goran_class_materials\NodeJS\ClassExercise\models\product.js:16:27  
            // at FSReqCallback.readFileAfterClose [as oncomplete] (internal/fs/read_file_context.js:63:3)
        }
    });
};

// constructor class
module.exports = class Product {

    constructor(title, imgUrl, description, price) {
        this.title = title;
        this.imgUrl = imgUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        this.id = Math.random().toString();
        
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (error) => {
                console.log(error)
            });
        });
    }

    static fetchAll(callBack) {
        getProductsFromFile(callBack);
    }

    static findById(id, cb) {
        getProductsFromFile(products => {
            const product = products.find( p => p.id === id);
            cb(product);
        })
    }
};


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