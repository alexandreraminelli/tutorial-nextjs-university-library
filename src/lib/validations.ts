/* Esquemas de formulário */

import { number, z } from "zod" // biblioteca de validação de dados

/** Schema de autenticação para criar conta. */
export const signUpSchema = z.object({
  /** Nome completo do usuário. */
  fullName: z.string().min(3),
  /** Email do usuário. */
  email: z.string().email(),
  /** ID da universidade do usuário. */
  universityId: z.coerce.number(),
  /** Cartão da universidade do usuário. */
  universityCard: z.string().nonempty("University Card is required"),
  /** Senha do usuário. */
  password: z.string().min(8),
})

/** Schema de autenticação para login. */
export const signInSchema = z.object({
  /** Email do usuário. */
  email: z.string().email(),
  /** Senha do usuário. */
  password: z.string().min(8),
})