import { Product } from "../models/product.js";
import { orderModel as Order } from "../models/order.js";

const shopController = {
    getProducts: (req, res, next) => {

        Product.find()
            //.select("title price -_id") // select the properties you need - for nested object use "." eg: Product.userId.cart.items etc
            //.populate('userId', " -_id ") // with the "-" you specify what to exclude
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
            .populate("cart.items.productId")
            .then(user => {
                const products = [...user.cart.items];
                console.log(products);
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
        console.log("========================", req.url);
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
                console.log("===+++", product);
                return req.user.addToCart(product);
            })
            .then(result => {
                console.log("=======", result);
                res.redirect('/cart');
            })
            .catch(err => {
                console.log(err);
            });
    },

    postCartDeleteProduct: (req, res, next) => {
        const prodId = req.body.productId;

        req.user.removeFromCart(prodId)
            .then(result => {
                res.redirect('/cart')
            })
            .catch(err => {
                console.log(err);
            })


    },

    postOrder: (req, res, next) => {
        req.user
            .populate("cart.items.productId")
            .then(user => {
                console.log("=============", user.cart.items);
                const products = user.cart.items.map(i => {
                    return {
                        quantity: i.quantity,
                        product: { ...i.productId._doc }
                    };
                });
                const order = new Order({
                    user: {
                        name: req.user.name,
                        userId: req.user
                    },
                    products: products
                });
                console.log(products)
                return order.save();
            })
            .then(result => {
                return req.user.clearCart();

            })
            .then(() => {
                res.redirect('./orders');
            })
            .catch(err => console.log(err))
    },

    getOrders: (req, res, next) => {
        // treba da ima array od proizvodi
        Order.find({"user.userId": req.user._id})
            .then(orders => {
                console.log("===============================================",orders)
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