import { Model, DataTypes, Sequelize, NOW } from "sequelize";

export const PRODUCTS_TABLE = "products";

export const ProductsSchema = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "created_at",
    defaultValue: NOW,
  },
};

export class Product extends Model {
  // models
  static associate() {}

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: PRODUCTS_TABLE,
      modelName: "Product",
      timestamps: false,
    };
  }
}
