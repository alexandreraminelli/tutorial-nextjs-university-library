/* Configuração do banco de dados Redis */

import { Redis } from "@upstash/redis"
import config from "@/lib/config"

/**
 * Instância do Redis configurada para uso com **Upstash**.
 * Esta instância é usada para armazenar dados em cache, gerenciar sessões e outras operações de banco de dados.
 * A URL e o token de autenticação são obtidos a partir das variáveis de ambiente.
 */
const redis = new Redis({
  url: config.env.upstash.redisUrl,
  token: config.env.upstash.redisToken,
})

export default redis
