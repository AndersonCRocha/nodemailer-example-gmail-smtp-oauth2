import { nodemailerMailService } from "../mail/nodemailer-mail.service";
import { renderConfirmSubscriptionMail } from "../mail/templates/confirm-subscription";
import { CreateUserDTO } from "../models/create-user.dto";
import { inMemoryUserRepository } from "../repositories/inmemory/in-memory-user-repository";
import { UserRepository } from "../repositories/user.repository";
import { MailService } from "./mail.service";

export class UserService {
  constructor(
    private userRepository: UserRepository,
    private mailProvider: MailService
  ) {}

  async list() {
    const users = await this.userRepository.list();
    return users;
  }

  async create(data: CreateUserDTO) {
    const user = await this.userRepository.create(data);

    await this.mailProvider.send({
      to: user.email,
      subject: "Seja bem vindo ao meu sistema XPTO",
      body: await renderConfirmSubscriptionMail(user),
    });

    return user;
  }
}

export const userService = new UserService(
  inMemoryUserRepository,
  nodemailerMailService
);
