import BookCover from "@/components/BookCover"
import { db } from "@/database/drizzle"
import { users } from "@/database/schema"
import { eq } from "drizzle-orm"
import Image from "next/image"
import BorrowBook from "./BorrowBook"

/** Props de `BookOverview`. */
interface Props extends Book {
  /** ID do usuário. */
  userId: string
}

/** Informações gerais sobre um livro. */
export default async function BookOverview(
  { title, author, genre, rating, totalCopies, availableCopies, description, coverColor, coverUrl, id, userId }: Props // props
) {
  // Buscar dados do usuário
  const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1)
  // Se o usuário não existir
  if (!user) return null

  // Se usuário pode pedir livros emprestados
  const borrowingEligibility = {
    isEligible: availableCopies > 0 && user.status === "APPROVED",
    message: availableCopies <= 0 ? "Book is not available" : "You are not eligible to borrow this book",
  }

  return (
    <section className="book-overview">
      <div className="flex flex-1 flex-col gap-5">
        {/* Título */}
        <h1>{title}</h1>

        <div className="book-info">
          {/* Autor */}
          <p>
            By <span className="font-semibold text-light-200">{author}</span>
          </p>
          {/* Categoria/Gênero */}
          <p>
            Category: <span className="font-semibold text-light-200">{genre}</span>
          </p>
          {/* Avaliação */}
          <div className="flex flex-row gap-1">
            {/* Ícone de estrela */}
            <Image src="/icons/star.svg" alt="star" width={22} height={22} />
            <p>{rating}</p>
          </div>
        </div>

        {/* Informação de copias disponíveis */}
        <div className="book-copies">
          <p>
            Total Books: <span>{totalCopies}</span>
          </p>
          <p>
            Available Books: <span>{availableCopies}</span>
          </p>
        </div>

        {/* Descrição */}
        <p className="book-description">{description}</p>

        {/* Botão de Empréstimo */}
        <BorrowBook bookId={id} userId={userId} borrowingEligibility={borrowingEligibility} />
      </div>

      {/* Capa do livro */}
      <div className="relative flex flex-1 justify-center">
        {/* Imagem normal */}
        <div className="relative">
          <BookCover variant="wide" className="z-10" coverColor={coverColor} coverImage={coverUrl} />
        </div>
        {/* "Sombra" da imagem */}
        <div className="absolute left-16 top-10 rotate-12 opacity-40 max-sm:hidden">
          <BookCover variant="wide" coverColor={coverColor} coverImage={coverUrl} />
        </div>
      </div>
    </section>
  )
}
