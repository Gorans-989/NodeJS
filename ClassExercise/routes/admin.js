const express = require('express');
const path = require('path');
// const rootDir = require('../util/path.js');

const adminController = require('../controllers/admin')


const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

// /admin/products => GET -- admin go predifinirav vo app.js (zatoa samo pisuvame slash / i patekata)
router.get('/products', adminController.getAdminProducts);

// /admin/add-product => POST
router.post("/add-product", adminController.postAddProduct);


module.exports = router;


// function someText() {
//     console.log("zosto se izvrshuva ova?? kade e povikana");
// };
// one way - no name assigned on variable
//module.exports = router;
// module.exports = someText;

// second way with name assigned

// module.exports.nameOfVariable = router;

// exports.text = someText;

// third way , exporting multiple properties you can assign or dont assign name for the export

// module.exports = 
//     {
//         router1 : router,
//         text : someText 
//     };

// exports.adminJS =
// {
//     routes: router,
//     text: someText,
    
// };