import BookOverview from "@/components/BookOverview"
import BookList from "@/components/ui/BookList"
import { sampleBooks } from "@/constants"
import { db } from "@/database/drizzle"
import { users } from "@/database/schema"

/** Homepage da plataforma do usuário. */
export default async function HomePage() {
  const result = await db.select().from(users)
  console.log(
    JSON.stringify(result, null, 2) // Exibe os dados do usuário no console
  )

  return (
    <>
      {/* Hero Section com informações de um livro */}
      <BookOverview {...sampleBooks[0]} />

      {/* Lista de livros */}
      <BookList title="Latest Books" books={sampleBooks} containerClassName="mt-28" />
    </>
  )
}
