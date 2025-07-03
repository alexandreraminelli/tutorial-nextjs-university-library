"use client"

import { Button } from "@/components/ui/button"
import { borrowBook } from "@/lib/actions/book"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

/** Props de `BorrowBook`. */
interface Props {
  /** ID do usuário. */
  userId: string
  /** ID do livro. */
  bookId: string
  /** Indica se o usuário pode pegar o livro emprestado. */
  borrowingEligibility: {
    /** Se o livro está disponível para empréstimo. Aprovação da conta do usuário ou inventário da biblioteca. */
    isEligible: boolean
    /** Motivo pelo qual o usuário não pode pegar o livro emprestado. */
    message: string
  }
}

/** Botão de empréstimo de livro. */
export default function BorrowBook(
  { userId, bookId, borrowingEligibility: { isEligible, message } }: Props // props
) {
  const router = useRouter() // Roteador do Next.js
  const [borrowing, setBorrowing] = useState(false) // Estado de empréstimo do livro

  // Função executada ao clicar no botão de empréstimo
  const handleBorrowBook = async () => {
    if (!isEligible) {
      // Se usuário não pode pegar o livro emprestado
      toast.warning("Error", {
        description: message,
      })
    }
    // Define o estado de empréstimo como verdadeiro
    setBorrowing(true)

    try {
      // Chama a função de ação para pegar o livro emprestado
      const result = await borrowBook({ bookId, userId })

      if (result.success) {
        // msg de livro emprestado com sucesso
        toast.success("Success", { description: "Book borrowed successfully!" })
        // Redireciona para a página de perfil do usuário
        router.push("/my-profile")
      } else {
        // msg de erro
        toast.error("Error", { description: "An error occurred while borrowing the book." })
      }
    } catch (error) {
      // msg de erro
      toast.error("Error", { description: `An error occurred while borrowing the book: ${error}` })
    } finally {
      // Redefine o estado de empréstimo como falso
      setBorrowing(false)
    }
  }

  return (
    <Button
      className="book-overview_btn"
      onClick={handleBorrowBook}
      disabled={borrowing} // desabilitar se o usuário não puder pegar o livro emprestado
    >
      {/* Ícone de livro */}
      <Image src="/icons/book.svg" alt="book" width={20} height={20}></Image>
      <p className="font-bebas-neue text-xl text-dark-100c">
        {/* Texto do botão */}
        {borrowing ? "Borrowing..." : "Borrow Book"}
      </p>
    </Button>
  )
}
