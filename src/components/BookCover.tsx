import { cn } from "@/lib/utils"
import Image from "next/image"
import BookCoverSvg from "./BookCoverSvg"

/** Variações de estilos da capa. */
type BookCoverVariant = "extraSmall" | "small" | "medium" | "regular" | "wide"
/** Variação de estilos da capa. */
const variantStyles: Record<BookCoverVariant, string> = {
  extraSmall: "book-cover_extra_small",
  small: "book-cover_small",
  medium: "book-cover_medium",
  regular: "book-cover_regular",
  wide: "book-cover_wide",
}

/** Tipos dos props de `BookCover`. */
interface Props {
  /** Classes adicionais. (opcional) */
  className?: string
  /** Variante da capa. (opcional) */
  variant?: BookCoverVariant
  /** Cor da capa. */
  coverColor: string
  /** URL da capa. */
  coverImage: string
}

/** Imagem da capa de um livro. */
export default function BookCover(
  { className, variant = "regular", coverColor = "#012B48", coverImage: coverURL = "https://placehold.co/400x600.png" }: Props // props
) {
  return (
    <div
      className={cn(
        "relative transition-all duration-300", // estilo base
        variantStyles[variant], // estilo da variante
        className // classes adicionais
      )}
    >
      {/* SVG de um desenho de livro */}
      <BookCoverSvg coverColor={coverColor} />
      {/* Imagem da capa */}
      <div className="absolute z-10" style={{ left: "12%", width: "87.5%", height: "88%" }}>
        <Image src={coverURL} alt="Book cover" fill className="rounded-sm object-fill" />
      </div>
    </div>
  )
}
