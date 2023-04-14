import { Sequelize } from "sequelize";
import { config } from "../config";
import { setupModels } from "../db";

const USER = encodeURIComponent(config.dbUser!);
const PASSWORD = encodeURIComponent(config.dbPassword!);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

export const sequelize = new Sequelize(URI, {
  dialect: "postgres",
  //  logging: console.log,
});

// Pass the connection
setupModels(sequelize);

// Take the models and create the structure
sequelize.sync();
