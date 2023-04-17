import faker from "faker";
import boom from "@hapi/boom";
import { IProduct } from "../interfaces/IProduct";
import { pool, sequelize } from "../libs";
import { Pool } from "pg";

const {
  models: { Product },
} = sequelize;

export class ProductsService {
  private products: IProduct[] = [];
  private pool: Pool;

  constructor() {
    this.products = [];
    this.generate();
    this.pool = pool;
    this.pool.on("error", (err) => {
      throw boom.internal(err.message);
    });
  }

  private generate() {
    const limit = 100;
    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
      });
    }
  }

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
    const newProduct = {
      id: faker.datatype.uuid(),
      ...product,
    };

    if (!newProduct)
      throw boom.badImplementation(
        "There was an error while creating the new product"
      ); // status code: 500

    this.products.push(newProduct);

    return newProduct;
  }

  async update(id: string, changes: Omit<IProduct, "id">) {
    const productIndex = this.products.findIndex(
      (product) => product.id === id
    );

    if (productIndex === -1) throw boom.notFound("The product wasn't found");

    const productTemp = this.products[productIndex];

    this.products[productIndex] = { ...productTemp, ...changes };

    return this.products[productIndex];
  }

  async delete(id: string) {
    const productIndex = this.products.findIndex(
      (product) => product.id === id
    );
    if (productIndex === -1) throw boom.notFound("The product wasn't found");

    this.products.splice(productIndex, 1);

    return true;
  }
}
