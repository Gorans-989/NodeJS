import { Sequelize } from "sequelize";
const sequelDB = new Sequelize('movieRentalDB', "root", "gogo989", {
    dialect: "mysql",
    host: "localhost"
},);

export  default sequelDB;