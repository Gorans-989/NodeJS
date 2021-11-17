import sequelize from "sequelize";
import sequelDB from "../config/db.js";

const rentedMoviesModel = sequelDB.define("rentedMovies", {});

export {rentedMoviesModel};