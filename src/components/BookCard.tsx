import BookCover from "@/components/BookCover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"

/** Card de livro. */
export default function BookCard(
  { id, title, genre, coverColor, coverUrl, isLoanedBook = false }: Book // props
) {
  return (
    <li className={cn(isLoanedBook && "xs:w-52 w-full")}>
      {/* Card com link para a página do livro */}
      <Link
        href={`/books/${id}`} // página do livro
        // style:
        className={cn(isLoanedBook && "w-full flex flex-col items-center")}
      >
        {/* Imagem da capa */}
        <BookCover coverColor={coverColor} coverImage={coverUrl} />

        {/* Informações do livro */}
        <div className={cn("mt-4", !isLoanedBook && "xs:max-w-40 max-w-28")}>
          <p className="book-title">{title}</p>
          <p className="book-genre">{genre}</p>
        </div>

        {/* Informação de livro emprestado */}
        {isLoanedBook && (
          <div className="mt-3 w-full">
            <div className="book-loaned">
              {/* Ícone de calendário */}
              <Image src="/icons/calendar.svg" alt="calendar" width={18} height={18} className="object-contain" />
              {/* Dias restantes pro livro ser devolvido */}
              <p className="text-light-100">11 days left to return</p>
            </div>
            {/* Botão de download do recibo */}
            <Button className="book-btn">Download receipt</Button>
          </div>
        )}
      </Link>
    </li>
  )
}
