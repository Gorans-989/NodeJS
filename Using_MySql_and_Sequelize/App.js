const path = require('path');

const express = require("express");
const bodyParser = require("body-parser");

const pageNotFoundController = require('./controllers/error');
const sequelize = require('./util/database.js');
const Product = require('./models/product');
const User = require('./models/user.js');
const CartItem = require('./models/cart-item.js');
const Cart = require('./models/cart.js');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');



const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require("./routes/admin.js");
const shopRoutes = require('./routes/shop.js');




app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')))// za public folderot da moze da go cita.
console.log(__dirname); //ja dava rutata t.e. kade se naoga na pc-to lokalno

app.use((req, res, next) => {
    User.findByPk(1)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => {
            console.log(err);
        })
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);


//default routa e " / ". zatoa ne e definirana
// gi targetirame site url adresi sto zapocnuvaat so localhost:3000/ dokolku tekstot posle /  ne odgovara na nitu eden end point (na primer /admin/add-product) da go prenasoci na nashiot 'page not found file'
app.use(pageNotFoundController.get404);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);

User.hasOne(Cart);
Cart.belongsTo(User);

Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, {through: OrderItem});

sequelize
    //.sync({ force: true })
    .sync()
    .then(result => {
        return User.findByPk(1);
    })
    .then(user => {
        if (!user) {
            return User.create({ name: 'Goran', email: "test@test.com" })
        }
        return user;
    })
    .then(user => {
        return user.createCart();
        // console.log(u);
        
    })
    .then( cart => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });