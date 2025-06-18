// Conexão do Drizzle com o banco de dados do Neon

import { drizzle } from "drizzle-orm/neon-http"
import { neon } from "@neondatabase/serverless"
import config from "@/lib/config"

/** Instância do cliente Neon configurada com a URL do banco de dados. */
const sql = neon(config.env.database.databaseUrl)

// Exporte a instância do Drizzle configurada com o cliente Neon
export const db = drizzle({ client: sql })
