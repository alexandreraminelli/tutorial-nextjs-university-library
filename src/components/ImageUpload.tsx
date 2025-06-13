"use client"

import { Image as IKImage, Video as IKVideo, ImageKitProvider, upload as IKUpload, ImageKitContext } from "@imagekit/next"
import config from "@/lib/config"

/**
 * Função de autenticação para o ImageKit.
 */
async function authenticator() {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`)

    // Se o code status não for 200, lança um erro
    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Request failed with status ${response.status}: ${errorText}`)
    }

    /** Resposta da mensagem. */
    const data = await response.json()
    const { signature, expire, token } = data

    return { token, expire, signature } // Retornar dados
  } catch (error: any) {
    // Tratamento de exceções
    throw new Error(`Authenticator request failed: ${error.message}`)
  }
}

/** Input para upload de arquivo de imagem. */
export default function ImageUpload() {
  return <div>Image Upload</div>
}
