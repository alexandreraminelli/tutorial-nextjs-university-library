import { Button } from "@/components/ui/button"
import BookCover from "@/components/BookCover"
import Image from "next/image"

/** Informações gerais sobre um livro. */
export default function BookOverview(
  { title, author, genre, rating, total_copies, available_copies, description, color, cover }: Book // props
) {
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
            Total Books: <span>{total_copies}</span>
          </p>
          <p>
            Available Books: <span>{available_copies}</span>
          </p>
        </div>

        {/* Descrição */}
        <p className="book-description">{description}</p>

        {/* CTA Button */}
        <Button className="book-overview_btn">
          {/* Ícone de livro */}
          <Image src="/icons/book.svg" alt="book" width={20} height={20}></Image>
          <p className="font-bebas-neue text-xl text-dark-100c">Borrow Book</p>
        </Button>
      </div>

      {/* Capa do livro */}
      <div className="relative flex flex-1 justify-center">
        {/* Imagem normal */}
        <div className="relative">
          <BookCover variant="wide" className="z-10" coverColor={color} coverImage={cover} />
        </div>
        {/* "Sombra" da imagem */}
        <div className="absolute left-16 top-10 rotate-12 opacity-40 max-sm:hidden">
          <BookCover variant="wide" coverColor={color} coverImage={cover} />
        </div>
      </div>
    </section>
  )
}
