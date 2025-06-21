"use server"

import { db } from "@/database/drizzle"
import { users } from "@/database/schema"
import { hash } from "bcryptjs"
import { eq } from "drizzle-orm"

/**
 * Função para realizar o cadastro de um novo usuário.
 * @param params Objeto `AuthCredentials` contendo as informações do usuário fornecidas no formulário de cadastro.
 */
async function signUp(params: AuthCredentials) {
  // Desestruturar os parâmetros
  const { fullName, email, universityId, password, universityCard } = params

  // Verificar se usuário já existe
  const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1)
  // Se usuário já existe, retornar erro
  if (existingUser.length > 0) return { success: false, error: "User already exists" }

  // Fazer hash da senha
  const hashedPassword = await hash(password, 10)

  try {
    // Inserir novo usuário no banco de dados
    await db.insert(users).values({
      fullName,
      email,
      universityId,
      password: hashedPassword,
      universityCard,
    })
    // Iniciar sessão com novo usuário criado
    await signInWithCredentials({ email, password })
    return { success: true }
  } catch (error) {
    // Exibir e retornar erro
    console.error(error, "Signup error")
    return { success: false, error: "Signup error" }
  }
}
