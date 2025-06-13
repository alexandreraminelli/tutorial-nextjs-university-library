/**
 * Arquivo de configuração do projeto.
 * Contém as configurações de ambiente e outras variáveis globais.
 */
const config = {
  env: {
    /** Endpoint da API do Next.js criada nesse repositório. */
    apiEndpoint: process.env.NEXT_PUBLIC_API_ENDPOINT!,
    /** Variáveis de ambiente para conexão com o ImageKit. */
    imagekit: {
      /** URL do endpoint do ImageKit. */
      urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
      /** Chave pública da API do ImageKit. */
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
      /** Chave privada da API do ImageKit. */
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
    },
  },
}

export default config
