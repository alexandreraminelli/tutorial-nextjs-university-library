import { auth } from "@/auth"
import Header from "@/components/Header"
import { db } from "@/database/drizzle"
import { users } from "@/database/schema"
import { eq } from "drizzle-orm"
import { redirect } from "next/navigation"
import { after } from "next/server"

/**
 * Layout com componentes principais da aplicação, como navbar e footer.
 * Não é aplicado a todas as páginas (por exemplo, a página de login).
 */
export default async function Layout({ children }: { children: React.ReactNode }) {
  // Redirecionar usuários não autenticados para a tela de autenticação
  const session = await auth()
  if (!session) redirect("/sign-in")

  // Executar código após a renderização do layout (evitar bloqueio de renderização)
  after(async () => {
    // Encerra se o usuário não estiver autenticado
    if (!session?.user?.id) return

    // Se o usuário já tiver uma atividade registrada hoje, não precisa fazer nada
    const user = await db.select().from(users).where(eq(users.id, session.user.id)).limit(1)
    if (user[0].lastActivityDate === new Date().toISOString().slice(0, 10)) return
    else
      // Atualizar a data da última atividade do usuário
      await db
        .update(users)
        .set({ lastActivityDate: new Date().toISOString().slice(0, 10) })
        .where(eq(users.id, session?.user?.id))
  })

  return (
    <main className="root-container bg-pattern">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <Header session={session} />
        {/* Página */}
        <div className="mt-20 pb-20">{children}</div>
      </div>
    </main>
  )
}
