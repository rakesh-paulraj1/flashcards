import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db";


export class Flashcards extends Model {}

Flashcards.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answer: {
      type: DataTypes.STRING,
      allowNull: false,
    }

  },
  {
    sequelize,
    modelName: "flashcards",
    timestamps: true,
    underscored: true,
    tableName: "flashcards",
  }
);

