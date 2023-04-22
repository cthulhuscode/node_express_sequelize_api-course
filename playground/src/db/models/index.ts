import { Sequelize } from "sequelize";
import { User, UserSchema } from "./user.model";
import { Product, ProductsSchema } from "./product.model";
import { CategoriesSchema, Category } from "./category.model";
import { Customer, CustomerSchema } from "./customer.model";

/**
 * The models are gonna be initiated in this function
 */
export function setupModels(sequelize: Sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Product.init(ProductsSchema, Product.config(sequelize));
  Category.init(CategoriesSchema, Category.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
}
