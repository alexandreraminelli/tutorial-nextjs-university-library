import { auth } from "@/auth"
import BookOverview from "@/components/BookOverview"
import { db } from "@/database/drizzle"
import { books } from "@/database/schema"
import { eq } from "drizzle-orm"
import { redirect } from "next/navigation"

/**
 * Página de detalhes do livro.
 * Rota dinâmica com o ID do livro.
 */
export default async function BookDetailsPage(
  { params }: { params: Promise<{ id: string }> } // Props da rota dinâmica
) {
  /** ID do livro nos parâmetros da rota. */
  const id = (await params).id
  /** Sessão do usuário, se disponível. */
  const session = await auth()

  // Obter livro pelo ID
  const [bookDetails] = await db.select().from(books).where(eq(books.id, id)).limit(1)

  // Se não encontrar o livro, redireciona pro 404
  if (!bookDetails) redirect("/404")

  return (
    <>
      {/* Visão Geral do Livro */}
      <BookOverview
        {...bookDetails} // Passar detalhes do livro
        userId={session?.user?.id as string} // ID do usuário da sessão
      />

      {/* Detalhes do livro */}
      <div className="book-details lg:mt-36 mt-16 mb-20 flex flex-col gap-16 lg:flex-row">
        <div className="flex-[1.5]">
          {/* Vídeo do livro */}
          <section className="flex flex-col gap-7">
            <BookDetailsH3>Video</BookDetailsH3>
            VIDEO COMPONENT
          </section>

          {/* Resumo do livro */}
          <section className="mt-10 flex flex-col gap-7">
            <BookDetailsH3>Summary</BookDetailsH3>
            <div className="space-y-5 text-xl text-light-100 text-justify">
              {/* Dividir resumo em várias linhas */}
              {(bookDetails.summary || "No summary available.").split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

/** Título H3 da sessão de detalhes do livro. */
function BookDetailsH3({ children }: { children: React.ReactNode }) {
  return <h3 className="text-xl font-semibold text-primary">{children}</h3>
}
