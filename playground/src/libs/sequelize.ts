import { Sequelize } from "sequelize";
import { config } from "../config";
import { setupModels } from "../db";

const USER = encodeURIComponent(config.dbUser!);
const PASSWORD = encodeURIComponent(config.dbPassword!);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

export const sequelize = new Sequelize(URI, {
  dialect: "postgres",
  logging: false,
});

// Pass the connection
setupModels(sequelize);

// Take the models and create the structure
sequelize
  .sync() // not recommended for production, is preferable to use a migration system
  .then((res) => console.log(`${res.config.database} connected`))
  .catch((e) => console.log(e));
