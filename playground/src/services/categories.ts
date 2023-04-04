import { ICategory } from "../interfaces/ICategory";
import faker from "faker";
import boom from "@hapi/boom";

export class CategoriesService {
  private categories: ICategory[];

  constructor() {
    this.categories = [];
    this.generate();
  }

  private generate() {
    for (let i = 0; i < 100; i++) {
      this.categories.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.department(),
      });
    }
  }

  async find() {
    return [...this.categories];
  }

  async findOne(id: string) {
    const category = this.categories.find((category) => category.id === id);

    if (!category) throw boom.notFound("The category wasn't found");

    return category;
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
