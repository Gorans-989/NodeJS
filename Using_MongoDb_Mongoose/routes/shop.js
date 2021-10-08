import path  from "path";
import express  from "express";
import { shopController } from "../controllers/shop.js"
const router = express.Router();


router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);
// //dvete tocki se mnogu vazni. urlto e localhost3000/products/ :productId
// // express znae deka rutata e do 2-te tocki i posle tockite kje go iskoristeme imeto za da izvleceme podatok od promenliva vo ovoj clucaj go koristime imeto productId

// router.get('/cart', shopController.getCart);

// router.post('/cart', shopController.postCart);

// router.post("/cart-delete-item", shopController.postCartDeleteProduct);

// router.get('/orders', shopController.getOrders);

// router.post('/create-order', shopController.postOrder);


// router.get('/products/details', shopController.getProduct);
// // mora da vnimavam na redosledot od gore pa nadole cita express. products kje se zbuni ako ima i products/delete bidejki /products e prvo i potoa nema da vleze vo delete
// // router.get('/products/delete',)




export { router };