/*
 * Schema (estrutura) do banco de dados.
 * Define as tabelas e suas colunas e relacionamentos.
 * Cria automaticamente a tipagem de dados para usar no TS.
 */

import { date, integer, pgEnum, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core"

/** Enumeration dos status da conta de um usuário, como pendente, aprovado e rejeitado.*/
export const STATUS_ENUM = pgEnum("status", ["PENDING", "APPROVED", "REJECTED"])
/** Enumeration para o papel de um usuário.
 * Pode assumir dois valores:
 * - `USER`: Usuário comum
 * - `ADMIN`: Administrador do sistema, responsável por tarefas como gerenciar livros.
 */
export const ROLE_ENUM = pgEnum("role", ["USER", "ADMIN"])

/** Enumeration para o status de um livro.
 * Pode assumir dois valores:
 * - `BORROWED`: Livro emprestado
 * - `RETURNED`: Livro devolvido
 */
export const BORROW_STATUS_ENUM = pgEnum("borrow_status", ["BORROWED", "RETURNED"])

/** Tabela de usuário. */
export const users = pgTable("users", {
  /** ID do usuário. */
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  /** Nome completo do usuário. */
  fullName: varchar("full_name", { length: 255 }).notNull(),
  /** E-mail do usuário. */
  email: text("email").notNull().unique(),
  /** ID universitário do usuário. */
  universityId: integer("university_id").notNull().unique(),
  /** Hash da senha do usuário. */
  password: text("password").notNull(),
  /** Cartão universitário do usuário. */
  universityCard: text("university_card").notNull(),
  /** Status da conta do usuário. Padrão: pendente. */
  status: STATUS_ENUM("status").default("PENDING"),
  /** Papel do usuário no sistema. Padrão: usuário comum. */
  role: ROLE_ENUM("role").default("USER"),
  /** Data da última atividade do usuário no sistema. */
  lastActivityDate: date("last_activity_date").defaultNow(),
  /** Data de criação da conta. */
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
})
