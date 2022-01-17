import sequelize from "sequelize";
import sequelDB from "../config/db.js";

const userModel = sequelDB.define("user", {
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    email: {
        type: sequelize.STRING,
        allowNull: false
    },
    password: {
        type: sequelize.STRING,
        allowNull: false
    },
    userName: {
        type: sequelize.STRING,
        allowNull: false
    },
    role: {
        type: sequelize.STRING,
        allowNull: false,
        defaultValue: "user"
    }
});


class User extends userModel{};
export {userModel};