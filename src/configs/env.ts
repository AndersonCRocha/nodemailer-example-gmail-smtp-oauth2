import { z } from "zod";

const schema = z.object({
  smtpUser: z.string(),
  smtpClientId: z.string(),
  smtpClientSecret: z.string(),
  smtpRefreshToken: z.string(),
});

export const env = schema.parse({
  smtpUser: process.env.SMTP_USER,
  smtpClientId: process.env.SMTP_CLIENT_ID,
  smtpClientSecret: process.env.SMTP_CLIENT_SECRET,
  smtpRefreshToken: process.env.SMTP_REFRESH_TOKEN,
});
