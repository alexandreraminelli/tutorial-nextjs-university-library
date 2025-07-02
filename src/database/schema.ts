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

/** Tabela de livros. */
export const books = pgTable("books", {
  /** ID do livro. */
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  /** Título do livro. */
  title: varchar("title", { length: 255 }).notNull(),
  /** Autor do livro. */
  author: varchar("author", { length: 255 }).notNull(),
  /** Gênero do livro. */
  genre: varchar("genre").notNull(),
  /** Avaliação do livro. */
  rating: integer("rating").notNull().default(1),
  /** URL da capa do livro. */
  coverUrl: text("cover_url").notNull(),
  /** Cor da capa no formato hexadecimal (#RRGGBB) */
  coverColor: varchar("cover_color", { length: 7 }).notNull(),
  /** Descrição do livro. */
  description: text("description").notNull(),
  /** Cópias totais do livro. */
  totalCopies: integer("total_copies").notNull().default(1),
  /** Cópias do livro disponíveis para empréstimo. */
  availableCopies: integer("available_copies").notNull().default(0),
  /** URL do vídeo do livro. */
  videoUrl: text("video_url").notNull(),
  /** Resumo do livro. */
  summary: varchar("summary").notNull(),
  /** Data de inserção do livro no sistema. */
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
})

/** Tabela de registros de empréstimos de livros. */
export const borrowRecords = pgTable("borrow_records", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  bookId: uuid("book_id")
    .references(() => books.id)
    .notNull(),
  borrowDate: timestamp("borrow_date", { withTimezone: true }).defaultNow().notNull(),
  dueDate: date("due_date").notNull(),
  returnDate: date("return_date"),
  status: BORROW_STATUS_ENUM("status").default("BORROWED").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
})
