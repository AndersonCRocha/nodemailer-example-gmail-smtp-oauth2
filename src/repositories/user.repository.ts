import { CreateUserDTO } from "../models/create-user.dto";
import { User } from "../models/user";

export interface UserRepository {
  list(): Promise<User[]>;
  create(data: CreateUserDTO): Promise<User>;
}
