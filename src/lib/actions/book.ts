"use server"

import { db } from "@/database/drizzle"
import dayjs from "dayjs"
import { books, borrowRecords } from "@/database/schema"
import { eq } from "drizzle-orm"

/**
 * Função para emprestar um livro para um usuário.
 * Esta função deve ser implementada para lidar com a lógica de empréstimo de livros.
 */
export async function borrowBook(params: BorrowBookParams) {
  const { userId, bookId } = params // desestruturar parâmetros

  try {
    const book = await db
      .select({ availableCopies: books.availableCopies }) // obter número de cópias disponíveis do livro
      .from(books)
      .where(eq(books.id, bookId))
      .limit(1)

    // Se não houver cópias disponíveis para emprestar
    if (!book.length || book[0].availableCopies <= 0) {
      return { success: false, error: "Book is not available for borrowing." }
    }

    // Data de vencimento para devolver o livro (7 dias)
    const dueDate = dayjs().add(7, "day").toDate().toDateString()

    // Criar novo registro de empréstimo
    const record = db.insert(borrowRecords).values({
      userId,
      bookId,
      dueDate,
      status: "BORROWED",
    })

    // Atualizar o número de cópias disponíveis do livro
    await db
      .update(books)
      .set({ availableCopies: book[0].availableCopies - 1 })
      .where(eq(books.id, bookId))

    // Retornar o registro de empréstimo criado
    return { success: true, data: JSON.parse(JSON.stringify(record)) }
  } catch (error) {
    console.error("Erro ao emprestar livro:", error)
    return { success: false, error: "An error occurred while borrowing the book." }
  }
}
