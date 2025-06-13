/* Rota para realizar a autenticação no ImageKit.io. */

import ImageKit from "imagekit"
import config from "@/lib/config"
import { NextResponse } from "next/server"

// desestruturar configurações do ImageKit
const {
  env: {
    imagekit: { urlEndpoint, publicKey, privateKey },
  },
} = config
/**
 * Instância da classe `ImageKit`.
 * Construtor recebe as configurações do ImageKit definidas no `.env`.
 */
const imageKit = new ImageKit({ urlEndpoint, publicKey, privateKey })

/**
 * Rota GET para o endpoint `/api/auth/imagekit`.
 * Retorna os parâmetros de autenticação do ImageKit.
 */
export async function GET() {
  return NextResponse.json(imageKit.getAuthenticationParameters())
}
