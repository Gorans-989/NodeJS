const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: "Add Product",
        path: '/admin/add-product'
    });
};

exports.postAddProduct = (req, res, next) => {
    // const title = req.body.title;
    // const imgUrl = req.body.imgUrl;
    // const description = req.body.description;
    // const price = req.body.price;

    const product = new Product(req.body.title, req.body.imgUrl, req.body.description, req.body.price);

    product.save();
    res.redirect("/");
};

exports.getAdminProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('admin/product-list-admin', {
            prods: products,
            pageTitle: 'Admin products',
            path: '/admin/products'
        });
    });
};

exports.getEditProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: "Add Product",
        path: '/admin/add-product'

    });
};