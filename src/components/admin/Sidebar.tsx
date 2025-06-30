"use client"

import { adminSideBarLinks } from "@/constants"
import { cn, getInitials } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar"
import { Session } from "next-auth"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

/**
 * Componente Sidebar da área do administrador.
 * Agrupa os links das opções de administração.
 */
export default function AdminSidebar({ session }: { session: Session }) {
  const pathname = usePathname() // obter URL atual

  return (
    <div className="admin-sidebar sticky left-0 top-0 flex h-dvh flex-col justify-between bg-white px-5 pb-5 pt-10">
      <div>
        {/* Logo */}
        <div className="flex flex-row items-center gap-2 border-b border-dashed border-primary-admin/20 pb-10 max-md:justify-center">
          {/* Imagem da logo */}
          <Image src="/icons/admin/logo.svg" alt="logo" height={37} width={37} />
          {/* Título */}
          <h1 className="text-2xl font-semibold text-primary-admin max-md:hidden">BookWise</h1>
        </div>

        {/* Links da Sidebar */}
        <div className="mt-10 flex flex-col gap-5">
          {adminSideBarLinks.map((link) => {
            const isSelected = (link.route !== "/admin" && pathname.includes(link.route) && link.route.length > 1) || pathname === link.route // se link está ativo
            return (
              <Link href={link.route} key={link.route}>
                <div
                  className={cn(
                    "link flex flex-row items-center w-full gap-2 rounded-lg px-5 py-3.5 max-md:justify-center",
                    isSelected && "bg-primary-admin shadow-sm" // destacar link ativo
                  )}
                >
                  {/* Ícone do link */}
                  <div className="relative size-5">
                    <Image
                      src={link.img}
                      alt="icon"
                      fill
                      className={cn("object-contain", isSelected && "brightness-0 invert")} // inverter cor do fundo se estiver ativo
                    />
                  </div>
                  {/* Texto do link */}
                  <p className={cn("text-base font-medium max-md:hidden", isSelected ? "text-white" : "text-dark")}>{link.text}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Informações do usuário logado */}
      <div className="user my-8 flex w-full flex-row gap-2 rounded-full border border-light-400 px-6 py-2 shadow-sm max-md:px-2">
        {/* Iniciais do usuário */}
        <Avatar>
          <AvatarFallback className="bg-amber-100 text-black flex items-center justify-center rounded-full w-10 h-10">{getInitials(session?.user?.name || "")}</AvatarFallback>
        </Avatar>
        {/*  */}
        <div className="flex flex-col max-md:hidden">
          {/* Nome do usuário */}
          <p className="font-semibold text-dark-200">{session?.user?.name}</p>
          {/* E-mail do usuário */}
          <p className="text-light-500 text-xs">{session?.user?.email}</p>
        </div>
      </div>
    </div>
  )
}
