/*
 * Configuração do Drizzle ORM.
 * Define as opções de migração e conexão com o banco de dados.
 *
 * Comandos no Terminal:
 * - Gerar migrações: `npx drizzle-kit generate`
 * - Executar migrações: `npx drizzle-kit migrate`
 */

import { config } from "dotenv"
import { defineConfig } from "drizzle-kit"

config({ path: ".env.local" }) // Carregar variáveis de ambiente

// Configurações do Drizzle ORM
export default defineConfig({
  // Caminho para o esquema do banco de dados.
  schema: "./src/database/schema.ts",
  // Caminho para as migrações (arquivos SQL) geradas.
  out: "./migrations",
  // Dialeto do banco de dados utilizado (MySQL, PostgreSQL, etc).
  dialect: "postgresql",
  // Credenciais do banco de dados.
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})
