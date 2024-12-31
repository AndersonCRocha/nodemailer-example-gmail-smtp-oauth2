import { Mail } from "../models/mail";

export interface MailService {
  send(mail: Mail): Promise<void>;
}
