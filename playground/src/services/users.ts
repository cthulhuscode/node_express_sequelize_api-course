import boom from "@hapi/boom";
import { sequelize } from "../libs";
const {
  models: { User },
} = sequelize;

export class UsersService {
  async find() {
    const response = await User.findAll();

    if (!response.length) throw boom.notFound("There are not any user yet.");

    return response;
  }

  async findOne(id: number) {
    if (!id) throw boom.badRequest("Invalid id.");

    const response = await User.findByPk(id);

    if (!response) throw boom.notFound("The user doesn't exist.");

    return response;
  }
  async create() {}
  async update() {}
  async delete() {}
}
