const fs = require('fs');

const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: "Add Product",
        path: '/admin/add-product',
        editing: false
    });
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imgUrl = req.body.imgUrl;
    const description = req.body.description;
    const price = req.body.price;

    const userId = req.user.id;

    req.user
        .createProduct({
            title: title,
            price: price,
            description: description,
            imgUrl: imgUrl
        })
        .then(result => {
            console.log('Created Product succesfully');
            res.redirect('/admin/products');
        })
        .catch(error => {
            console.log(error);
        })


    // Product.create({
    //     title: title,
    //     price: price,
    //     description: description,
    //     imgUrl: imgUrl
    // })
    //     .then(result => {
    //         console.log('Created Product succesfully');
    //         res.redirect('/admin/products');
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     })
};

exports.getAdminProducts = (req, res, next) => {
    req.user.getProducts()
        .then(products => {
            res.render('admin/product-list-admin', {
                prods: products,
                pageTitle: 'Admin products',
                path: '/admin/products'
            });
        })
        .catch(err => {
            console.log(err)
        });
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    console.log(typeof (editMode));
    if (!editMode) {
        return res.redirect("/");
    }
    const prodId = req.params.productId;

    req.user.getProducts({ where: { id: prodId } })// Product.findByPk(prodId)
        .then(products => {
            const product = products[0];
            if (!product) {
                return res.redirect("/");
            }

            res.render('admin/edit-product', {
                pageTitle: "Edit Product",
                path: '/admin/edit-product',
                editing: editMode,
                product: product
            });
        })
        .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;

    const title = req.body.title;
    const imgUrl = req.body.imgUrl;
    const description = req.body.description;
    const price = req.body.price;

    Product.findByPk(prodId)
        .then(product => {
            product.title = title,
                product.imgUrl = imgUrl,
                product.description = description,
                product.price = price
            return product.save()
        })
        .then((result) => {
            console.log('Product updated successfully');
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;

    Product.findByPk(prodId)
        .then(product => {
            return product.destroy();

        })
        .then(result => {
            console.log('Product deleted successfully');
            res.redirect("/admin/products");
        })
        .catch(err => { console.log(err) })
};