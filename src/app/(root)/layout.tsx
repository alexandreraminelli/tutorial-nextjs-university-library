/**
 * Layout com componentes principais da aplicação, como navbar e footer.
 * Não é aplicado a todas as páginas (por exemplo, a página de login).
 */
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="root-container bg-pattern">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        Header
        {/* Página */}
        <div className="mt-20 pb-20">{children}</div>
      </div>
    </main>
  )
}
