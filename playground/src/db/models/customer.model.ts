import { Model, DataTypes, Sequelize, NOW } from "sequelize";

export const CUSTOMERS_TABLE = "customers";

export const CustomerSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  lastName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: "last_name",
  },
  phone: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "created_at",
    defaultValue: NOW,
  },
};

export class Customer extends Model {
  static associate() {}

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: "Customer",
      timestamps: false,
    };
  }
}
