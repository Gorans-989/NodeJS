const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');

const db = require('./util/database.js');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require("./routes/admin.js");
const shopRoutes = require('./routes/shop.js');
const pageNotFoundController = require('./controllers/error');

// db.execute('SELECT * FROM products')
//     .then((result)=> {
//         console.log(result[0],"the next one", result[1])
//     })
//     .catch((error) => {
//         console.log(error)
//     });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')))// za public folderot da moze da go cita.
console.log(__dirname); //ja dava rutata t.e. kade se naoga na pc-to lokalno


app.use("/admin", adminRoutes);
app.use(shopRoutes);


//default routa e " / ". zatoa ne e definirana
// gi targetirame site url adresi sto zapocnuvaat so localhost:3000/ dokolku tekstot posle /  ne odgovara na nitu eden end point (na primer /admin/add-product) da go prenasoci na nashiot 'page not found file'
app.use(pageNotFoundController.get404);


app.listen(3000);

//const expressHbs = require('express-handlebars');
// da procitam za express app ( ima mnogu moduli)
// app.engine('hbs', expressHbs({
//     layoutsDir: 'views/layouts/',
//     defaultLayout: 'main-layout',
//     extname: 'hbs'
// }));
//global configuration value // (first approach) using PUG
//app.set('view engine','pug');
// app.set('view engine', 'hbs');// using handleBars