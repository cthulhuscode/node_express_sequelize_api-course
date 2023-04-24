import boom from "@hapi/boom";
import { sequelize } from "../libs";
import { ICustomer } from "../interfaces";
const {
  models: { Customer },
} = sequelize;

export class CustomersService {
  async find() {
    const response = await Customer.findAll({
      include: ["user"],
    });

    if (!response.length)
      throw boom.notFound("There are not any customer yet.");

    return response;
  }

  async findOne(id: number) {
    if (!id) throw boom.badRequest("Invalid id.");

    const response = await Customer.findByPk(id);

    if (!response) throw boom.notFound("The customer wasn't found.");

    return response;
  }
  async create(data: Partial<ICustomer>) {
    const newCustomer = await Customer.create(data);

    if (!newCustomer)
      throw boom.internal("An error ocurred while creating the customer");

    return newCustomer;
  }
  async update(id: number, changes: Partial<ICustomer>) {
    const customer = await this.findOne(id);

    const updatedCustomer = await customer.update(changes);

    if (!updatedCustomer)
      throw boom.internal(
        "An error ocurred while updating the user. Please try again later."
      );

    return updatedCustomer;
  }
  async delete(id: number) {
    const customer = await this.findOne(id);

    await customer.destroy();

    return id;
  }
}
