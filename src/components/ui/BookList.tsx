import BookCard from "@/components/BookCard"

/** Props de `BookList`. */
interface Props {
  /** Título da lista. */
  title: string
  /** Livros da lista. */
  books: Book[]
  /** Classe CSS do container. (opcional) */
  containerClassName?: string
}

/** Lista de livros. */
export default function BookList(
  { title, books, containerClassName }: Props // props
) {
  // Verificar se há elementos para mostrar
  if (books.length < 2) return
  // Há mais de 2 livros
  return (
    <section className={containerClassName}>
      {/* Título da lista */}
      <h2 className="font-bebas-neue text-4xl text-light-100">{title}</h2>

      {/* Lista de livros */}
      <ul className="book-list">
        {books.map((book) => (
          <BookCard key={book.title} {...book} />
        ))}
      </ul>
    </section>
  )
}
