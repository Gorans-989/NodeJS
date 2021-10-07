const Product = require('../models/product')
const Cart = require('../models/cart');


exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All Products',
            path: '/products',
            //hasProducts: products.length > 0,
            // activeShop: true, // required for handle bars
            // productCSS: true
            //layout: false //'layot' => special key recognized by handle bars. if false => it will not use the default layout. if true uses default layout BY DEFAULT
        });
    });

}
// this are all middleware functions
exports.getIndex = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/'
        });
    });
};

exports.getCart = (req, res, next) => {
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for (p of products) {
                const cartProductData = cart.products.find(prod => prod.id === p.id);
                if (cartProductData) {
                    cartProducts.push({ productData: p, qty: cartProductData.qty });
                }
            }
            res.render('shop/cart', {
                pageTitle: 'Your cart',
                path: '/cart',
                products: cartProducts
            });
        });
    });
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: "Checkout",
        path: '/checkout'
    })
}

exports.getOrders = (req, res, next) => {
    // treba da ima array od proizvodi
    res.render('shop/orders', {
        pageTitle: 'Your orders',
        path: '/orders'
    })
}

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        res.render('shop/product-details', {
            product: product,
            pageTitle: 'Product details',
            path: '/products'
        });
    })
}

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, (product) => {
        Cart.addProduct(prodId, product.price);
    })
    res.redirect('/cart');
}

exports.postDeleteCartItems = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
        Cart.deleteProduct(prodId, product.price);
        res.redirect('/cart')
    });

}