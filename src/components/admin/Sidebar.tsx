import Image from "next/image"

/**
 * Componente Sidebar da área do administrador.
 * Agrupa os links das opções de administração.
 */
export default function AdminSidebar() {
  return (
    <div className="admin-sidebar sticky left-0 top-0 flex h-dvh flex-col justify-between bg-white px-5 pb-5 pt-10">
      <div>
        {/* Logo */}
        <div className="flex flex-row items-center gap-2 border-b border-dashed border-primary-admin/20 pb-10 max-md:justify-center">
          {/* Imagem da logo */}
          <Image src="/icons/admin/logo.svg" alt="logo" height={37} width={37} />
        </div>
      </div>
    </div>
  )
}
