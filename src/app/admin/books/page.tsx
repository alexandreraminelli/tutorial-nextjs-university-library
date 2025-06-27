import { Button } from "@/components/ui/button"
import Link from "next/link"

/**
 * Página de administração de livros.
 */
export default function BookAdminPage() {
  return (
    <section
      className="
        w-full rounded-2xl bg-white p-7"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        {/* Título "Todos os Livros" */}
        <h2 className="text-xl font-semibold">All Books</h2>

        {/* Botão de criar um novo livro */}
        <Button className="bg-primary-admin text-white">
          <Link href="/admin/books/new">Create a New Book</Link>
        </Button>
      </div>

      {/* Tabela com os livros */}
      <div className="mt-7 w-full overflow-hidden">
        <p>Table</p>
      </div>
    </section>
  )
}
