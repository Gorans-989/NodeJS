import sequelize from "sequelize";
import sequelDB from "../config/db.js";
import {Model} from "sequelize";

class Movie extends Model {};

const movieModel = sequelDB.define('movie', {
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title: {
        type: sequelize.STRING,
        allowNull: false
    },
    quantity: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    description: {
        type: sequelize.STRING,
        defaultValue: " "
    },
    genre: {
        type: sequelize.STRING,
        allowNull: false
    },
    isDeleted: {
        type: sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});

// class Movie extends movieModel{};
export { movieModel };