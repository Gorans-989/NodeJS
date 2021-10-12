import path, { join } from 'path';
import { fileURLToPath } from 'url';
import express from "express";
import bodyParser from "body-parser";

import { get404 } from './controllers/error.js';
//import { mongoConnect } from './util/database.js';
import { urlDb } from './util/database.js';

import mongoose from 'mongoose';

const dirName = path.dirname(fileURLToPath(import.meta.url));
console.log(dirName);

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

import { router as adminRoutes } from './routes/admin.js';
import { router as shopRoutes } from "./routes/shop.js";

import { User } from "./models/user.js";


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(join(dirName, 'public')));
// za public folderot da moze da go cita.
//ja dava rutata t.e. kade se naoga na pc-to lokalno

app.use((req, res, next) => {
    User.findById("616163361be2b40b15258d73")
        .then(user => {
            req.user = user;
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

// mongoConnect(() => {
//     app.listen(3000);
// })
mongoose.connect(urlDb)
    .then(result => {
        if (!User.findById("616163361be2b40b15258d73")) 
        {
            const user = new User({
                name: "Gost",
                email: "goran@email.com",
                cart: {
                    items: []
                }
            });
            user.save();
        }

        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    }
);