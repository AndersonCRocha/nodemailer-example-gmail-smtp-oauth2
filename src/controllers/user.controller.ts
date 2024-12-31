import { Request, Response } from "express";
import { createUserSchema } from "../models/create-user.dto";
import { userService, UserService } from "../services/user.service";

class UserController {
  constructor(private userService: UserService) {}

  async list(_: Request, response: Response) {
    const users = await this.userService.list();
    response.send(users);
  }

  async create(request: Request, response: Response) {
    const data = createUserSchema.parse(request.body);
    const user = await this.userService.create(data);
    response.status(201).send(user);
  }
}

export const userController = new UserController(userService);
