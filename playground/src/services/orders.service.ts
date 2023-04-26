import boom from "@hapi/boom";
import { sequelize } from "../libs";
import { IOrder } from "../interfaces/IOrder";
import { User } from "../db";

const {
  models: { Order },
} = sequelize;

export class OrdersService {
  async find(size?: number | undefined) {
    const response: any = await Order.findAll({
      include: [
        {
          association: "customer",
          include: [
            {
              association: "user",
              model: User,
              as: "user",
              attributes: ["id", "email", "role", "createdAt"],
            },
          ],
        },
      ],
    });

    if (!response.length) throw boom.notFound("There is not any order yet");

    if (size && size >= 1 && size <= 100) return response.slice(0, size);

    return response;
  }

  async findOne(id: number) {
    const order = await Order.findByPk(id, {
      include: [
        {
          association: "customer",
          include: [
            {
              association: "user",
              model: User,
              as: "user",
              attributes: ["id", "email", "role", "createdAt"],
            },
          ],
        },
      ],
    });

    if (!order) throw boom.notFound("The order wasn't found");

    return order;
  }

  async create(order: Omit<IOrder, "id">) {
    const newOrder = await Order.create(order);

    if (!newOrder)
      throw boom.internal(
        "An error occurred while creating the order. Please try again later."
      );

    return newOrder;
  }

  async update(id: number, changes: Omit<IOrder, "id">) {
    const currentOrder = await this.findOne(id);

    let updatedOrder = await currentOrder.update(changes);

    if (!updatedOrder)
      throw boom.internal(
        "An error occurred while updating the order. Please try again later."
      );

    // Reload data
    updatedOrder = await this.findOne(id);

    return updatedOrder;
  }

  async delete(id: number) {
    const order = await this.findOne(id);

    await order.destroy();

    return id;
  }
}
