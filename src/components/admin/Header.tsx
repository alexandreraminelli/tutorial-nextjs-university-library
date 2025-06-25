import { Session } from "next-auth"

export default function AdminHeader({ session }: { session: Session }) {
  return (
    <header className="admin-header flex lg:items-end items-start justify-between lg:flex-row flex-col gap-5 sm:mb-10 mb-5">
      <div>
        {/* Nome do usuário */}
        <h2 className="text-dark-400 font-semibold text-2xl">{session?.user?.name}</h2>
        {/* Descrição do painel */}
        <p className="text-slate-500 text-base">Monitor all of your users and books here</p>
      </div>

      {/* Barra de busca */}
      <p>Search</p>
    </header>
  )
}
