import BookOverview from "@/components/BookOverview"
import BookList from "@/components/ui/BookList"
import { sampleBooks } from "@/constants"

/** Homepage da plataforma do usuário. */
export default function HomePage() {
  return (
    <>
      {/* Hero Section com informações de um livro */}
      <BookOverview {...sampleBooks[0]} />

      {/* Lista de livros */}
      <BookList title="Latest Books" books={sampleBooks} containerClassName="mt-28" />
    </>
  )
}
