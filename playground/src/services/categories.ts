import { ICategory } from "../interfaces/ICategory";
import faker from "faker";
import boom from "@hapi/boom";
import { sequelize } from "../libs";

const {
  models: { Category },
} = sequelize;

export class CategoriesService {
  private categories: ICategory[];

  constructor() {
    this.categories = [];
  }

  async find() {
    const response = await Category.findAll();

    if (!response.length) throw boom.notFound("No categories were found.");

    return response;
  }

  async findOne(id: number) {
    const response = await Category.findByPk(id);

    if (!response) throw boom.notFound("Category not found.");

    return response;
  }

  async create(category: Omit<ICategory, "id">) {
    const newCategory = {
      id: faker.datatype.uuid(),
      ...category,
    };

    if (!newCategory)
      throw boom.badImplementation(
        "There was an error while creating the new category"
      ); // status code: 500

    this.categories.push(newCategory);

    return newCategory;
  }

  async update(id: string, changes: Omit<ICategory, "id">) {
    const categoryIndex = this.categories.findIndex(
      (category) => category.id === id
    );

    if (categoryIndex === -1) throw boom.notFound("The category wasn't found");

    const categoryTemp = this.categories[categoryIndex];
    this.categories[categoryIndex] = { ...categoryTemp, ...changes };

    return this.categories[categoryIndex];
  }

  async delete(id: string) {
    const categoryIndex = this.categories.findIndex(
      (category) => category.id === id
    );

    if (categoryIndex === -1) throw boom.notFound("The category wasn't found");

    this.categories.splice(categoryIndex, 1);

    return true;
  }
}
