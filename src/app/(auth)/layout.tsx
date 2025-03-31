import Image from "next/image"

/** Layout das rotas de autenticação. */
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="auth-container">
      <section className="auth-form">
        <div className="auth-box gradient-vertical">
          {/* Logotipo do site */}
          <div className="flex flex-row gap-3">
            <Image src="/icons/logo.svg" alt="Logo" width={37} height={37} className="mb-4" />
            <h1 className="text-2xl font-semibold text-white">BookWise</h1>
          </div>

          <div>
            {/* Página */}
            {children}
          </div>
        </div>
      </section>

      {/* Imagem decorativa de livros */}
      <section className="auth-illustration">
        <Image src="/images/auth-illustration.png" alt="auth illustration" height={1000} width={1000} className="size-full object-cover" />
      </section>
    </main>
  )
}
