/*
 * Configuração do NextAuth
 * Exporta as funções utilizadas pelo NextAuth
 */

import { db } from "@/database/drizzle"
import { users } from "@/database/schema"
import { compare } from "bcryptjs"
import { eq } from "drizzle-orm"
import NextAuth, { User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
  // Gerenciar sessão do usuário
  session: {
    // Estratégia de sessão: JWT (JSON Web Token)
    strategy: "jwt",
  },
  providers: [
    // Provedor de autenticação por credenciais
    CredentialsProvider({
      async authorize(credentials) {
        // Se não houver e-mail ou senha, retorna null
        if (!credentials?.email || !credentials?.password) return null

        // Buscar usuário no banco de dados
        const user = await db.select().from(users).where(eq(users.email, credentials.email.toString())).limit(1)

        // Se o usuário não existir, retorna null
        if (user.length === 0) return null

        // Verificar senha
        const isPasswordValid = await compare(
          credentials.password.toString(), // senha fornecida pelo usuário
          user[0].password // hash da senha no db
        )
        // Se a senha for inválida, retorna null
        if (!isPasswordValid) return null
        // Se for correta, retorna o objeto do usuário
        else
          return {
            id: user[0].id.toString(),
            email: user[0].email.toString(),
            name: user[0].fullName.toString(),
          } as User
      },
    }),
  ],
  // Endpoint das páginas de autenticação
  pages: {
    signIn: "/sign-in", // login
  },
  // Callbacks (funções de retorno)
  callbacks: {
    // Retornar token do JWT
    async jwt({ token, user }) {
      // Se usuário foi autenticado, adiciona suas informações ao token
      if (user) {
        token.id = user.id
        token.name = user.name
      }
      return token
    },
    // Retornar sessão do usuário
    async session({ session, token }) {
      // Se o token contém informações do usuário, adiciona ao objeto de sessão
      if (session.user) {
        session.user.id = token.id as string
        session.user.name = token.name as string
      }
      return session
    },
  },
})
