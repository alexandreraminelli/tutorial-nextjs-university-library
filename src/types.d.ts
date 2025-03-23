// Arquivo de tipos
// Ao invés de criar tipos em arquivos separados, eles podem ser declarados aqui.
// Não é necessário usar a palavra-chave export, pois o arquivo types.d.ts é global.

/** Tipo de dados de um livro. */
interface Book {
  /** Identificador do livro. */
  id: string
  /** Título do livro. */
  title: string
  /** Autor do livro. */
  author: string
  /** Gênero do livro. */
  genre: string
  /** Avaliação do livro. */
  rating: number
  /** Total de cópias do livro. */
  total_copies: number
  /** Cópias disponíveis do livro. */
  available_copies: number
  /** Descrição do livro. */
  description: string
  /** Cor do livro. */
  color: string
  /** Capa do livro (URL). */
  cover: string
  /** Vídeo do livro (URL). */
  video: string
  /** Resumo do livro. */
  summary: string
  /** Se o livro está emprestado. */
  isLoanedBook?: boolean
}
