const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: "Add Product",
<<<<<<< HEAD
        path: '/admin/add-product',
        editing: false
=======
        path: '/admin/add-product'
>>>>>>> 1f9af7c520b3c0f43fa8c0e2f245c1dcb2a93e83
    });
};

exports.postAddProduct = (req, res, next) => {
    // const title = req.body.title;
    // const imgUrl = req.body.imgUrl;
    // const description = req.body.description;
    // const price = req.body.price;

<<<<<<< HEAD
    const product = new Product(null, req.body.title, req.body.imgUrl, req.body.description, req.body.price);
=======
    const product = new Product(req.body.title, req.body.imgUrl, req.body.description, req.body.price);
>>>>>>> 1f9af7c520b3c0f43fa8c0e2f245c1dcb2a93e83

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
<<<<<<< HEAD
    const editMode = req.query.edit;
    console.log(typeof (editMode));
    if (!editMode) {
        return res.redirect("/");
    }
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        if (!product) {
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            pageTitle: "Edit Product",
            path: '/admin/edit-product',
            editing: editMode,
            product: product
        });
    })
};

exports.postEditProduct = (req, res, next) => {
    // const prodId = req.body.productId;
    // const title = req.body.title;
    // const imgUrl = req.body.imgUrl;
    // const description = req.body.description;
    // const price = req.body.price;

    const product = new Product(req.body.productId, req.body.title, req.body.imgUrl, req.body.description, req.body.price);
    product.save();
    res.redirect('/admin/products')
};

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    
    Product.deleteById(prodId);


    res.redirect("/admin/products");
}
=======
    res.render('admin/edit-product', {
        pageTitle: "Add Product",
        path: '/admin/add-product'

    });
};
>>>>>>> 1f9af7c520b3c0f43fa8c0e2f245c1dcb2a93e83
