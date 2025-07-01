"use server"

import { db } from "@/database/drizzle"
import { books } from "@/database/schema"

export async function createBook(params: BookParams) {
  try {
    const newBook = await db
      .insert(books) // inserir dados na tabela books
      .values({
        ...params, // dados do formulário de criação
        availableCopies: params.totalCopies, // todos os livros disponíveis inicialmente
      })
      .returning() // recuperar valor adicionado no db

    // Retornar o novo livro criado
    return {
      success: true,
      data: JSON.parse(JSON.stringify(newBook[0])),
    }
  } catch (error) {
    /* Tratar erros */
    console.error("Error creating book:", error)
    return {
      success: false,
      message: "An error occurred while creating the book.",
    }
  }
}
