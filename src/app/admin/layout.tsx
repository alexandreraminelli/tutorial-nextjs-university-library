import { auth } from "@/auth"
import Header from "@/components/admin/Header"
import AdminSidebar from "@/components/admin/Sidebar"
import { db } from "@/database/drizzle"
import { users } from "@/database/schema"
import "@/styles/admin.css"
import { eq } from "drizzle-orm"
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
  // Verificar se o usuário é um administrador
  const isAdmin = await db
    .select({ isAdmin: users.role })
    .from(users)
    .where(eq(users.id, session.user.id))
    .limit(1)
    .then((res) => res[0]?.isAdmin === "ADMIN")

  // Se não for administrador, redirecionar para a página inicial
  if (!isAdmin) redirect("/")

  // TSX
  return (
    <main className="flex min-h-screen w-full flex-row">
      {/* Sidebar com as opções de adm */}
      <AdminSidebar session={session} />

      {/* Container do admin */}
      <div className="admin-container flex w-[calc(100%-264px)] flex-1 flex-col bg-light-300 p-5 xs:p-10">
        {/* Cabeçalho */}
        <Header session={session} />

        {/* Página de admin */}
        {children}
      </div>
    </main>
  )
}
