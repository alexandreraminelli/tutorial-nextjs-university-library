"use server"

import { signIn } from "@/auth"
import { db } from "@/database/drizzle"
import { users } from "@/database/schema"
import ratelimit from "@/lib/ratelimit"
import { hash } from "bcryptjs"
import { eq } from "drizzle-orm"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

/**
 * Função para realizar o login de um usuário com email e senha.
 *
 * @param params Objeto contendo as credenciais do usuário (email e senha).
 */
export async function signInWithCredentials(params: Pick<AuthCredentials, "email" | "password">) {
  // Desestruturar os parâmetros
  const { email, password } = params

  /** Endereço IP do usuário. */
  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1"
  const { success } = await ratelimit.limit(ip) // Limitar requisições por IP
  if (!success) return redirect("/too-fast") // Redirecionar se limite de requisições for atingido

  try {
    // Tentar iniciar sessão com as credenciais fornecidas
    // Armazena o resultado da tentativa de login (error ou success)
    const result = await signIn("credentials", { email, password, redirect: false })

    if (result?.error) {
      // Se houve erro, retornar objeto com sucesso falso e mensagem de erro
      return { success: false, error: result.error }
    }
    return { success: true }
  } catch (error) {
    // Exibir e retornar erro
    console.error(error, "Signin error")
    return { success: false, error: "Signin error" }
  }
}

/**
 * Função para realizar o cadastro de um novo usuário.
 * @param params Objeto `AuthCredentials` contendo as informações do usuário fornecidas no formulário de cadastro.
 * @returns Um objeto indicando o sucesso da operação e, em caso de falha, uma mensagem de erro.
 * @throws Erro ao inserir o usuário no banco de dados ou ao iniciar a sessão.
 */
export async function signUp(params: AuthCredentials) {
  // Desestruturar os parâmetros
  const { fullName, email, universityId, password, universityCard } = params

  /** Endereço IP do usuário. */
  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1"
  const { success } = await ratelimit.limit(ip) // Limitar requisições por IP
  if (!success) return redirect("/too-fast") // Redirecionar se limite de requisições for atingido

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
