"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn, getInitials } from "@/lib/utils"
import { Session } from "next-auth"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

/** Cabeçalho da aplicação. */
export default function Header({ session }: { session: Session }) {
  /** Caminho da URL atual. */
  const pathname = usePathname()

  return (
    <header className="my-10 flex justify-between gap-5">
      {/* Logo com link pra página root */}
      <Link href="/">
        <Image src={"/icons/logo.svg"} alt="Logo" width={40} height={40} />
      </Link>

      {/* Navbar */}
      <ul className="flex flex-row items-center gap-8">
        {/* Links do navbar */}
        <li>
          {/* Link: biblioteca */}
          <Link
            href="/library"
            className={cn(
              "text-base cursor-pointer capitalize", // Estilo base
              pathname === "/library"
                ? "text-light-200" // estilo ativo
                : "text-light-100" // estilo inativo
            )}
          >
            Library
          </Link>
        </li>
        <li>
          {/* Ícone da Conta */}
          <Link href="/my-profile">
            <Avatar>
              {/* Iniciais do usuário */}
              <AvatarFallback className="bg-amber-100 text-black">{getInitials(session?.user?.name || "")}</AvatarFallback>
            </Avatar>
          </Link>
        </li>
      </ul>
    </header>
  )
}
