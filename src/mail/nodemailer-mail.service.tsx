import { google } from "googleapis";
import { createTransport, Transporter } from "nodemailer";
import { env } from "../configs/env";
import { Mail } from "../models/mail";

class NodemailerMailService {
  private nodemailer?: Transporter;

  constructor() {
    this.init();
  }

  private async init() {
    const oauth2Client = new google.auth.OAuth2(
      env.smtpClientId,
      env.smtpClientSecret,
      "https://developers.google.com/oauthplayground"
    );

    oauth2Client.setCredentials({
      refresh_token: env.smtpRefreshToken,
    });

    const accessToken = await oauth2Client.getAccessToken();

    this.nodemailer = createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: env.smtpUser,
        accessToken: accessToken.token!,
        clientId: env.smtpClientId,
        clientSecret: env.smtpClientSecret,
        refreshToken: env.smtpRefreshToken,
      },
    });
  }

  async send(mail: Mail) {
    await this.nodemailer!.sendMail({
      from: `Finanças ${env.smtpUser}`,
      to: mail.to,
      subject: mail.subject,
      html: mail.body,
    });
  }
}

export const nodemailerMailService = new NodemailerMailService();
