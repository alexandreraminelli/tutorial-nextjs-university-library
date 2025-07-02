import { auth } from "@/auth"
import BookOverview from "@/components/BookOverview"
import BookList from "@/components/ui/BookList"
import { sampleBooks } from "@/constants"
import { db } from "@/database/drizzle"
import { books, users } from "@/database/schema"
import { desc } from "drizzle-orm"

/** Homepage da plataforma do usuário. */
export default async function HomePage() {
  // Obter sessão do usuário
  const session = await auth()

  /** Lista de livros mais recentes. Obtêm os livros adicionados recentemente no banco de dados. */
  const latestBooks = (await db.select().from(books).limit(10).orderBy(desc(books.createdAt))) as Book[]

  return (
    <>
      {/* Hero Section com informações de um livro */}
      <BookOverview {...latestBooks[0]} userId={session?.user?.id as string} />

      {/* Lista de livros */}
      <BookList title="Latest Books" books={latestBooks.slice(1)} containerClassName="mt-28" />
    </>
  )
}
