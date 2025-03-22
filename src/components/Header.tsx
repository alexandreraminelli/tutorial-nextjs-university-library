"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

/** Cabeçalho da aplicação. */
export default function Header() {
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
        <li>
          {/* Link do navbar */}
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
      </ul>
    </header>
  )
}
