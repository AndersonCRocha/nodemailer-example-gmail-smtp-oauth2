import { randomUUID } from "node:crypto";
import { CreateUserDTO } from "../../models/create-user.dto";
import { User } from "../../models/user";

class InMemoryUserRepository {
  users: User[] = [];

  async list(): Promise<User[]> {
    return this.users;
  }

  async create(data: CreateUserDTO): Promise<User> {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password: data.password,
    };

    this.users.push(user);

    return user;
  }
}

export const inMemoryUserRepository = new InMemoryUserRepository();
