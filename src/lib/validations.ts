/* Esquemas de formulário */

import { z } from "zod" // biblioteca de validação de dados

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

/** Schema dos objetos livros. */
export const bookSchema = z.object({
  /** Título do livro.
   * Não pode estar vazio e deve ter entre 2 e 100 caracteres.
   */
  title: z.string().trim().min(2).max(100),
  /** Descrição do livro.
   * Não pode estar vazia e deve ter entre 10 e 1.000 caracteres.
   */
  description: z.string().trim().min(10).max(1_000),
  /** Autor do livro.
   * Não pode estar vazio e deve ter entre 2 e 100 caracteres.
   */
  author: z.string().trim().min(2).max(100),
  /** Gênero do livro (romance, ação, ficção cientifica, etc).
   * Não pode estar vazio e deve ter entre 2 e 50 caracteres.
   */
  genre: z.string().trim().min(2).max(50),
  /** Avaliação do livro.
   * Número entre 1 e 5.
   */
  rating: z.number().min(1).max(5),
  /** Quantidades total de cópias do livro.
   * Número inteiro positivo até 10.000.
   */
  totalCopies: z.coerce.number().int().positive().lte(10_000),
  /** URL da imagem da capa do livro. */
  coverUrl: z.string().nonempty(),
  /** Cor da capa do livro.
   * Cor hexadecimal no formato #RRGGBB
   */
  coverColor: z
    .string()
    .trim()
    .regex(/^#[0-9A-F]{6}$/i),
  /** URL do vídeo sobre o livro. */
  videoUrl: z.string().nonempty(),
  /** Resumo do livro. */
  summary: z.string().trim().min(10),
})
