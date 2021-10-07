const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
);

<<<<<<< HEAD
exports = class Cart {
=======

module.exports = class Cart {
>>>>>>> 1f9af7c520b3c0f43fa8c0e2f245c1dcb2a93e83

    static addProduct(id, productPrice) {
        //              Fetch the previous cart
        fs.readFile(p, (error, fileContent) => {

            let cart = { products: [], totalPrice: 0 };

            if (!error) {
                cart = JSON.parse(fileContent);
            }
            //          Analyze the cart => find existing product
            // const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            // const existingProduct = cart.products[existingProductIndex];
            // let updatedProduct;

            //          Add new product/ increase quantity
            // if (existingProduct) {
            //     updatedProduct = { ...existingProduct };
            //     updatedProduct.qty = updatedProduct.qty + 1;
            //     cart.products = [...cart.products];
            //     cart.products[existingProductIndex] = updatedProduct;
            // }
            // else {
            //     updatedProduct = { id: id, qty: 1 };
            //     cart.products = [...cart.products, updatedProduct];
            // }

            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];
            if (existingProduct) {
                cart.products[existingProductIndex].qty = cart.products[existingProductIndex].qty + 1;
            }
            else {
<<<<<<< HEAD
                cart.products.push({ id: id, qty: 1 });
=======
                cart.products.push({id:id, qty:1});
>>>>>>> 1f9af7c520b3c0f43fa8c0e2f245c1dcb2a93e83
            }

            //cart.totalPrice = cart.totalPrice + +productPrice;
            cart.totalPrice += +productPrice;

            fs.writeFile(p, JSON.stringify(cart), (error) => {
                console.log(error);
            })

        })
    }
<<<<<<< HEAD

    static deleteProduct(id, productPrice) {
        fs.readFile(p, (error, fileContent) => {
            if (error) {
                return;
            }
            const updatedCart = { ...JSON.parse(fileContent) };
            const product = updatedCart.products.find(p => p.id === id);
            if (!product) {
                return;
            }
            
            const prodQty = product.qty;

            updatedCart.products = updatedCart.products.filter(p => p.id !== id);
            updatedCart.totalPrice = updatedCart.totalPrice - productPrice * prodQty;

            fs.writeFile(p, JSON.stringify(updatedCart), (error) => {
                console.log(error);
            });
        });
    }

    static getCart(cb) {
        fs.readFile(p, (error, fileContent) => {
            const cart = JSON.parse(fileContent);

            if (error) {
                cb(null);
            }
            else {
                cb(cart);
            }
        });
    };
};
=======
}
>>>>>>> 1f9af7c520b3c0f43fa8c0e2f245c1dcb2a93e83
