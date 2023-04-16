import { Request, Response } from "express";
import { IUser } from "../interfaces";
import { UsersService } from "../services";

const service = new UsersService();

export const getUsers = async (req: Request, res: Response) => {
  const users = await service.find();

  res.status(200).json({ users });
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await service.findOne(+id);
  res.status(200).json({ user });
};
