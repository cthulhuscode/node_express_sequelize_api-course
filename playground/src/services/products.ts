import faker from "faker";
import { IProduct } from "../interfaces/IProduct";
import boom from "@hapi/boom";

export class ProductsService {
  private products: IProduct[] = [];

  constructor() {
    this.products = [];
    this.generate();
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
    let productsTemp = [...this.products];

    if (!productsTemp) throw boom.notFound("There are not any product yet");

    if (size && size <= 100) productsTemp = this.products.slice(0, size);

    return productsTemp;
  }

  async findOne(id: string) {
    const product = this.products.find((product) => product.id === id);

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
