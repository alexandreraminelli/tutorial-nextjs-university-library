/**
 * Arquivo de configuração do projeto.
 * Contém as configurações de ambiente e outras variáveis globais.
 */
const config = {
  // `!`: Indica ao TS que a variável é obrigatório e não pode ser `undefined`.
  env: {
    /** Endpoint da API do Next.js criada nesse repositório. */
    apiEndpoint: process.env.NEXT_PUBLIC_API_ENDPOINT!,
    /** Variáveis de ambiente para o banco de dados. */
    database: {
      /** URL de conexão com o banco de dados */
      databaseUrl: process.env.DATABASE_URL!,
    },
    /** Variáveis de ambiente para conexão com o ImageKit. */
    imagekit: {
      /** URL do endpoint do ImageKit. */
      urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
      /** Chave pública da API do ImageKit. */
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
      /** Chave privada da API do ImageKit. */
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
    },
    /** Variáveis de ambiente para conexão com o Upstash (Redis). */
    upstash: {
      redisUrl: process.env.UPSTASH_REDIS_REST_URL!,
      redisToken: process.env.UPSTASH_REDIS_REST_TOKEN!,
    },
  },
}

export default config
