import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(5, { message: "Nome deve ter no mínimo 5 caracteres" }),
  email: z.string().email("Digite um email válido"),
  password: z
    .string()
    .min(8, { message: "Senha deve ter no mínimo 8 caracteres" }),
});

export type CreateUserDTO = z.infer<typeof createUserSchema>;
