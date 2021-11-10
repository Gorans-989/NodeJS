import sequelize from "sequelize";
import sequelDB from "../config/db.js";

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
        allowNull: false
    }
});

// class Movie extends movieModel{};
export default movieModel;