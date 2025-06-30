import BookForm from "@/components/admin/forms/BookForm"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function NewBookPage() {
  return (
    <>
      {/* Botão de voltar */}
      <Button asChild className="back-btn mb-10 w-fit border border-light-300 bg-white text-xs font-medium text-dark-200">
        <Link href="/admin/books">Go Back</Link>
      </Button>

      {/* Formulário de Novo Livro */}
      <section className="w-full max-w-2xl">
        <BookForm />
      </section>
    </>
  )
}
