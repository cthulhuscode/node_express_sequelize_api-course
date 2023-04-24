"use strict";

import { DataTypes } from "sequelize";
import { CustomerSchema, CUSTOMERS_TABLE } from "../models/customer.model";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface: any, Sequelize: any) {
    await queryInterface.changeColumn(CUSTOMERS_TABLE, "user_id", {
      field: "user_id",
      allowNull: true,
      type: DataTypes.INTEGER,
      unique: true,
    });
  },

  async down(queryInterface: any, Sequelize: any) {
    // await queryInterface.dropTable(CUSTOMERS_TABLE);
  },
};
