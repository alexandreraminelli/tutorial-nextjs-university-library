import { auth } from "@/auth"
import Header from "@/components/Header"
import { redirect } from "next/navigation"

/**
 * Layout com componentes principais da aplicação, como navbar e footer.
 * Não é aplicado a todas as páginas (por exemplo, a página de login).
 */
export default async function Layout({ children }: { children: React.ReactNode }) {
  // Redirecionar usuários não autenticados para a tela de autenticação
  const session = await auth()
  if (!session) redirect("/")

  return (
    <main className="root-container bg-pattern">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <Header />
        {/* Página */}
        <div className="mt-20 pb-20">{children}</div>
      </div>
    </main>
  )
}
