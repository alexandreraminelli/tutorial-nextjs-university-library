import { signOut } from "@/auth"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"

/** Cabeçalho da aplicação. */
export default function Header() {
  return (
    <header className="my-10 flex justify-between gap-5">
      {/* Logo com link pra página root */}
      <Link href="/">
        <Image src={"/icons/logo.svg"} alt="Logo" width={40} height={40} />
      </Link>

      {/* Navbar */}
      <ul className="flex flex-row items-center gap-8">
        <li>
          {/* Opção de logout */}
          <form
            action={async () => {
              "use server"
              await signOut() // função para deslogar o usuário
            }}
            className="mb-10"
          >
            <Button>Logout</Button>
          </form>

          {/* Ícone da Conta */}
          {/* <Link href="/my-profile"> */}
          {/* <Avatar> */}
          {/* Iniciais do usuário */}
          {/* <AvatarFallback className="bg-amber-100 text-black">{getInitials(session?.user?.name || "")}</AvatarFallback> */}
          {/* </Avatar> */}
          {/* </Link> */}
        </li>
      </ul>
    </header>
  )
}
