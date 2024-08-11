import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import path from "path";
import { env } from "process";



dotenv.config({path: path.join(__dirname, "../.env")});

export const sequelize = new Sequelize(`${process.env.DBURL}`)
