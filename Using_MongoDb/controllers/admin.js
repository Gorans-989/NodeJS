import { Product } from "../models/product.js";

const adminController = {

    getAddProduct: (req, res, next) => {
        res.render('admin/edit-product', {
            pageTitle: "Add Product",
            path: '/admin/add-product',
            editing: false
        });
    },

    postAddProduct: (req, res, next) => {
        const title = req.body.title;
        const price = req.body.price;
        const description = req.body.description;       
        const imgUrl = req.body.imgUrl;
        const user = req.user; //this is a string. we pulled it from the body

        const product = new Product(title, price, description, imgUrl, null, user._id);
        //console.log("=========================================================== the product:",product);
        product.save()
            .then(result => {
                console.log('Created Product succesfully');
                res.redirect('/admin/products');
            })
            .catch(error => {
                console.log(error);
            });
    },
    // admin products GET
    getAdminProducts: (req, res, next) => {
        Product.fetchAll()
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
    },
    // edit product GET
    getEditProduct: (req, res, next) => {
        const editMode = req.query.edit;
        console.log(typeof (editMode));
        if (!editMode) {
            return res.redirect("/");
        }
        const prodId = req.params.productId;

        Product.findById(prodId)
            // Product.findByPk(prodId)
            .then(product => {
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
    },
    // edit product POST
    postEditProduct: (req, res, next) => {
        const prodId = req.body.productId;

        const title = req.body.title;
        const price = req.body.price;
        const description = req.body.description;
        const imgUrl = req.body.imgUrl;


        // Product.findById(prodId)
        //     .then(productData =>  {
        const product = new Product(title, price, description, imgUrl, null, req.user._id);

        product.save()
            .then((result) => {
                console.log('Product updated successfully');
                res.redirect('/admin/products');
            })
            .catch(err => console.log(err));
    },
    // Delete product POST
    postDeleteProduct: (req, res, next) => {
        const prodId = req.body.productId;

        Product.deletebyId(prodId)
            .then(result => {
                req.user.deleteCartItems(prodId);

                console.log('Product deleted successfully');
                res.redirect("/admin/products");
            })
            .catch(err => { console.log(err) })

    }
}

export { adminController };