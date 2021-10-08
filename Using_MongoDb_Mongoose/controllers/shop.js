import { Product } from "../models/product.js";

const shopController = {
    getProducts: (req, res, next) => {

        Product.find()
            .then(products => {
                console.log("=======", products)
                res.render('shop/product-list', {
                    prods: products,
                    pageTitle: 'All Products',
                    path: '/products'
                });
            })
            .catch(error => console.log(error));

    },
    // this are all middleware functions
    getIndex: (req, res, next) => {
        Product.find()
            .then(products => {
                res.render('shop/index', {
                    prods: products,
                    pageTitle: 'Shop',
                    path: '/'
                });
            })
            .catch(error => console.log(error));
    },

    getCart: (req, res, next) => {
        req.user
            .getCart()
            .then(products => {
                res.render('shop/cart', {
                    pageTitle: 'Your cart',
                    path: '/cart',
                    products: products
                });
            })
            .catch(err => { console.log(err) });

        // Cart.getCart(cart => {
        //     Product.fetchAll(products => {
        //         const cartProducts = [];
        //         for (p of products) {
        //             const cartProductData = cart.products.find(prod => prod.id === p.id);
        //             if (cartProductData) {
        //                 cartProducts.push({ productData: p, qty: cartProductData.qty });
        //             }
        //         }
        //         
        //     });
        // });
    },

    getProduct: (req, res, next) => {
        console.log("========================",req.url);
        const prodId = req.params.productId;

        Product.findById(prodId)
            .then(product => {
                res.render('shop/product-details', {
                    product: product,
                    pageTitle: product.title,
                    path: '/products'
                });
            })
            .catch(err => console.log(err));
    },

    postCart: (req, res, next) => {
        const prodId = req.body.productId;
        Product.findById(prodId)
            .then(product => {
                req.user.addToCart(product);
                res.redirect('/cart');
            })
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            });
    },

    postCartDeleteProduct: (req, res, next) => {
        const prodId = req.body.productId;

        req.user.deleteCartItems(prodId)
            .then(result => {
                res.redirect('/cart')
            })
            .catch(err => {
                console.log(err);
            })


    },

    postOrder: (req, res, next) => {
        let fetchedCart;

        req.user
            .addOrder()
            .then(result => {
                res.redirect('./orders');
            })
            .catch(err => console.log(err))
    },

    getOrders: (req, res, next) => {
        // treba da ima array od proizvodi
        req.user.getOrders()
            .then(orders => {
                res.render('shop/orders.ejs', {
                    pageTitle: 'Your orders',
                    path: '/orders',
                    orders: orders
                })
            })
            .catch(err => {
                console.log(err);
            })
    }
}


export { shopController };