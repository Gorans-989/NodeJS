import express from 'express';
import path from 'path';
// const rootDir = require('../util/path.js');

import {adminController} from '../controllers/admin.js';


const router = express.Router();

// // /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

// // /admin/products => GET -- admin go predifinirav vo app.js (zatoa samo pisuvame slash / i patekata)
router.get('/products', adminController.getAdminProducts);

// // admin/edit-product/:productId
router.get('/edit-product/:productId', adminController.getEditProduct);

// // /admin/add-product => POST
router.post("/add-product", adminController.postAddProduct);

// // /admin/edit-product => POST ( update method )
router.post('/edit-product', adminController.postEditProduct);

// // /admin/delete-product
// router.post("/delete-product/", adminController.postDeleteProduct);

export { router };
