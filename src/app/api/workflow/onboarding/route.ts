import { db } from "@/database/drizzle"
import { users } from "@/database/schema"
import { sendEmail } from "@/lib/workflow"
import { serve } from "@upstash/workflow/nextjs"
import { eq } from "drizzle-orm"

/* Tipagem */
/** Status do usuário. */
type UserState = "non-active" | "active"
/**  */
type InitialData = {
  email: string
  fullName: string
}

/* Constantes */
const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000
const THREE_DAYS_IN_MS = 3 * ONE_DAY_IN_MS
const THIRTY_DAYS_IN_MS = 30 * ONE_DAY_IN_MS

/**
 * Função para obter o estado do usuário.
 * @param email O e-mail do usuário para verificar o estado.
 * @returns O estado do usuário, que pode ser `"non-active"` ou `"active"`.
 */
async function getUserState(email: string): Promise<UserState> {
  // Obter usuário do banco de dados pelo e-mail
  const user = await db.select().from(users).where(eq(users.email, email)).limit(1)

  // Se usuário não existir, retornar "non-active"
  if (user.length === 0) return "non-active"

  /** Data da última atividade do usuário. */
  const lastActivityDate = new Date(user[0].lastActivityDate!)
  /** Data atual. */
  const now = new Date()
  /** Quantos dias foi a última atividade do usuário. (em ms) */
  const timeDifference = now.getTime() - lastActivityDate.getTime()

  // Se a última atividade foi entre 3 e 30 dias, considerar o usuário como "non-active"
  if (timeDifference > THREE_DAYS_IN_MS && timeDifference <= THIRTY_DAYS_IN_MS) return "non-active"
  // Última atividade a menos de 3 dias
  else return "active"
}

// Workflow de Onboarding
export const { POST } = serve<InitialData>(async (context) => {
  // Desestruturação dos dados do contexto
  const { email, fullName } = context.requestPayload

  /* Enviar e-mail de boas-vindas para o usuário recém-inscrito. */
  await context.run("new-signup", async () => {
    await sendEmail({
      // e-mail, assunto e mensagem
      email,
      subject: "Welcome to the platform!",
      message: `Welcome ${fullName}!`,
    })
  })

  /*
   * Período Inicial de Espera
   * Espera por 3 dias, deixando o usuário interagir e explorar a plataforma, antes de iniciar o fluxo de verificação de estado do usuário.
   */
  await context.sleep("wait-for-3-days", 60 * 60 * 24 * 3)

  // Verificação de Estado do Usuário periódica
  while (true) {
    /** Estado do usuário (ativo ou inativo). */
    const state = await context.run("check-user-state", async () => {
      return await getUserState(email)
    })

    if (state === "non-active") {
      // Se usuário não estiver ativo, enviar e-mail de lembrete.
      await context.run("send-email-non-active", async () => {
        await sendEmail({
          email,
          subject: "Are you still there?",
          message: `Hey ${fullName}, we miss you!`,
        })
      })
    } else if (state === "active") {
      // Se usuário estiver ativo, enviar e-mail de newsletter.
      await context.run("send-email-active", async () => {
        await sendEmail({
          email,
          subject: "Welcome back!",
          message: `Welcome back ${fullName}!`,
        })
      })
    }

    /* Espera por 1 mês antes de verificar novamente o estado do usuário.
     * `.sleep` pausa o workflow por um período especificado sem consumir tempo de execução.
     */
    await context.sleep("wait-for-1-month", 60 * 60 * 24 * 30)
  }
})
