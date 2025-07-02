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
  totalCopies: number
  /** Cópias disponíveis do livro. */
  availableCopies: number
  /** Descrição do livro. */
  description: string
  /** Cor do livro. */
  coverColor: string
  /** Capa do livro (URL). */
  coverUrl: string
  /** Vídeo do livro (URL). */
  videoUrl: string
  /** Resumo do livro. */
  summary: string
  /** Data de criação do livro. */
  createdAt: Date | null
  /** Se o livro está emprestado. */
  isLoanedBook?: boolean
}

/** Tipagem das credenciais de autenticação. */
interface AuthCredentials {
  /** Nome do usuário. */
  fullName: string
  /** Senha do usuário. */
  email: string
  /** Senha do usuário. */
  password: string
  /** ID universitário do usuário. */
  universityId: number
  /** Imagem do cartão universitário do usuário. */
  universityCard: string
}

/** Parâmetros para criação de um livro. */
interface BookParams {
  /** Título do livro. */
  title: string
  /** Autor do livro. */
  author: string
  /** Gênero do livro. */
  genre: string
  /** Avaliação do livro. */
  rating: number
  /** Capa do livro (URL). */
  coverUrl: string
  /** Cor da capa. */
  coverColor: string
  /** Descrição do livro. */
  description: string
  /** Número de cópias. */
  totalCopies: number
  /** Vídeo do livro (URL). */
  videoUrl: string
  /** Resumo do livro. */
  summary: string
}

/** Parâmetros da função `borrowBook`. */
interface BorrowBookParams {
  /** ID do livro a ser emprestado. */
  bookId: string
  /** ID do usuário que está emprestando o livro. */
  userId: string
}
