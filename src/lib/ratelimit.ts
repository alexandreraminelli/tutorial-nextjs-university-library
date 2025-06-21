import redis from "@/database/redis"
import { Ratelimit } from "@upstash/ratelimit"

/**
 * Limitador de taxa de requisições usando Upstash Ratelimit.
 * Este limitador é usado para controlar a quantidade de requisições que um usuário pode fazer em um determinado período de tempo.
 *
 * Isso ajuda a prevenir ataques de negação de serviço (DoS) e a garantir que os recursos do servidor sejam usados de forma eficiente.
 */
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(5, "1m"), // Quantidade de requisições que podem ser feitas por um usuário em um intervalo de tempo fixo
  analytics: true,
  /* Prefixo opcional para as chaves usadas no redis.
   * Isso é útil se você quiser compartilhar uma instância do redis com outros aplicativos e evitar colisões de chaves.
   * O prefixo padrão é "@upstash/ratelimit"
   */
  prefix: "@upstash/ratelimit",
})

export default ratelimit
