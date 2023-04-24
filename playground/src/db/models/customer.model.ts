import { Model, DataTypes, Sequelize, NOW } from "sequelize";
import { USER_TABLE } from "./user.model";

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
  userId: {
    field: "user_id",
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: USER_TABLE, // the other table
      key: "id", // the other table's id
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
};

export class Customer extends Model {
  static associate(models: Model[] | any) {
    this.belongsTo(models.User, {
      as: "user",
      foreignKey: "userId",
    });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: "customers",
      timestamps: false,
    };
  }
}
