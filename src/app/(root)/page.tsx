import BookOverview from "@/components/BookOverview"
import BookList from "@/components/ui/BookList"

/** Homepage da plataforma do usuário. */
export default function HomePage() {
  return (
    <>
      {/* Hero Section com informações de um livro */}
      <BookOverview />

      {/* Lista de livros */}
      <BookList />
    </>
  )
}
