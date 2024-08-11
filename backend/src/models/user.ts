import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db";


export class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }

  },
  {
    sequelize,
    modelName: "user",
    timestamps: true,
    underscored: true,
    tableName: "user",
  }
);


