import boom from "@hapi/boom";
import { IProduct } from "../interfaces/IProduct";
import { sequelize } from "../libs";

const {
  models: { Product },
} = sequelize;

export class ProductsService {
  async find(size?: number | undefined) {
    const response: any = await Product.findAll();

    if (!response.length) throw boom.notFound("There are not any product yet");

    if (size && size >= 1 && size <= 100) return response.slice(0, size);

    return response;
  }

  async findOne(id: number) {
    const product = await Product.findByPk(id);

    if (!product) throw boom.notFound("The product wasn't found");

    return product;
  }

  async create(product: Omit<IProduct, "id">) {
    const newProduct = await Product.create(product);

    if (!newProduct)
      throw boom.internal(
        "An error occurred while creating the product. Please try again later."
      );

    return newProduct;
  }

  async update(id: number, changes: Omit<IProduct, "id">) {
    const currentProduct = await this.findOne(id);

    const updatedProduct = await currentProduct.update(changes);

    if (!updatedProduct)
      throw boom.internal(
        "An error occurred while updating the product. Please try again later."
      );

    return updatedProduct;
  }

  async delete(id: number) {
    const product = await this.findOne(id);

    await product.destroy();

    return id;
  }
}
