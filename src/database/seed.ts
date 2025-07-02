import dummyBooks from "@/dummybooks.json"
import { neon } from "@neondatabase/serverless"
import { config } from "dotenv"
import { drizzle } from "drizzle-orm/neon-http"
import ImageKit from "imagekit"
import { books } from "./schema"

config({ path: ".env.local" }) // carregar variáveis de ambiente

// Configuração do banco de dados usando Neon
const sql = neon(process.env.DATABASE_URL!)
export const db = drizzle({ client: sql })

// Configuração do ImageKit
const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
})

/** Função para realizar o upload de uma imagem ou vídeo do livro para o ImageKit.
 * @param {string} url - URL da conteúdo a ser enviado.
 * @param {string} fileName - Nome do arquivo a ser salvo no ImageKit.
 * @param {string} folder - Pasta onde o conteúdo será salva no ImageKit.
 */
async function uploadToImageKit(url: string, fileName: string, folder: string) {
  try {
    // Realizar upload no ImageKit
    const response = await imagekit.upload({
      file: url, // URL do conteúdo
      fileName: fileName, // Nome do arquivo
      folder: folder, // Pasta onde o conteúdo será salva
    })
    // Retornar path do arquivo
    return response.filePath
  } catch (error) {
    console.error("Error uploading to ImageKit:", error)
  }
}

/** Função para popular o banco de dados com dados iniciais */
async function seed() {
  console.log("Seeding data...")

  try {
    // Iterar JSON com os livros
    for (const book of dummyBooks) {
      // Upload das imagens
      const coverUrl = (await uploadToImageKit(book.coverUrl, `${book.title}.jpg`, "/books/covers/")) as string
      // Upload dos vídeos
      const videoUrl = (await uploadToImageKit(book.videoUrl, `${book.title}.mp4`, "/books/videos/")) as string

      // Inserir livros no db
      await db.insert(books).values({
        ...book,
        coverUrl,
        videoUrl,
      })
    }

    // Log de sucesso
    console.log("Data seeded successfully!")
  } catch (error) {
    console.error("Error seeding data:", error)
  }
}

// Executar a função de seed
seed()
