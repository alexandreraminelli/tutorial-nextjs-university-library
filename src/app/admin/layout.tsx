import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { ReactNode } from "react"

/**
 * Layout do painel de administrador.
 */
export default async function AdminLayout({ children }: { children: ReactNode }) {
  // Sessão do usuário
  const session = await auth()

  // Se não houver sessão ativa
  if (!session?.user?.id) redirect("/sign-in")
  // TSX
  return (
    <main className="flex min-h-screen w-full flex-row">
      {/* Sidebar com as opções de adm */}
      <p>Sidebar</p>

      {/* Container do admin */}
      <div className="admin-container">
        {/* Cabeçalho */}
        <p>Header</p>

        {/* Página de admin */}
        {children}
      </div>
    </main>
  )
}
