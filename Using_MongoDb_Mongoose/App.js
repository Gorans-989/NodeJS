import path, { join } from 'path';
import { fileURLToPath } from 'url';
import express from "express";
import bodyParser from "body-parser";

import { get404 } from './controllers/error.js';
import { mongoConnect } from './util/database.js';


const dirName = path.dirname(fileURLToPath(import.meta.url));
console.log(dirName);

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

import { router as adminRoutes } from './routes/admin.js';
import {router as shopRoutes} from "./routes/shop.js";

import {User} from "./models/user.js";


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(join(dirName, 'public')));
// za public folderot da moze da go cita.
//ja dava rutata t.e. kade se naoga na pc-to lokalno

app.use((req, res, next) => {
    User.findById("615d50801a32c6f580e3b434")
        .then(user => {
            req.user = new User(user.userName, user.email, user.cart, user._id);
            next();
        })
        .catch(err => {
            console.log(err);
        })
    // next();
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);



app.use(get404);

mongoConnect(() => {
    
    app.listen(3000);
})

//default routa e " / ". zatoa ne e definirana
// gi targetirame site url adresi sto zapocnuvaat so localhost:3000/ dokolku tekstot posle /  ne odgovara na nitu eden end point (na primer /admin/add-product) da go prenasoci na nashiot 'page not found file'