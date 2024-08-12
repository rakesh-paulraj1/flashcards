"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Flashcards = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../db");
class Flashcards extends sequelize_1.Model {
}
exports.Flashcards = Flashcards;
Flashcards.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    question: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    answer: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize: db_1.sequelize,
    modelName: "flashcards",
    timestamps: true,
    underscored: true,
    tableName: "flashcards",
});
