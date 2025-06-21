import { signOut } from "@/auth"
import BookList from "@/components/ui/BookList"
import { Button } from "@/components/ui/button"
import { sampleBooks } from "@/constants"

/**
 * Página do perfil do usuário.
 * Nessa página, o usuário pode visualizar e editar suas informações pessoais.
 */
export default function MyProfilePage() {
  return (
    <>
      // Opção de logout
      <form
        action={async () => {
          "use server"
          await signOut() // função para deslogar o usuário
        }}
        className="mb-10"
      >
        <Button>Logout</Button>
      </form>
      <BookList title="Borrowed Books" books={sampleBooks} />
    </>
  )
}
