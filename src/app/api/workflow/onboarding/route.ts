import { serve } from "@upstash/workflow/nextjs"

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

export const { POST } = serve<InitialData>(async (context) => {
  const { email } = context.requestPayload

  /*
   * Enviar e-mail de boas-vindas para o usuário recém-inscrito.
   */
  await context.run("new-signup", async () => {
    await sendEmail("Welcome to the platform", email)
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
      return await getUserState()
    })

    if (state === "non-active") {
      // Se usuário não estiver ativo, enviar e-mail de lembrete.
      await context.run("send-email-non-active", async () => {
        await sendEmail("Email to non-active users", email)
      })
    } else if (state === "active") {
      // Se usuário estiver ativo, enviar e-mail de newsletter.
      await context.run("send-email-active", async () => {
        await sendEmail("Send newsletter to active users", email)
      })
    }

    /* Espera por 1 mês antes de verificar novamente o estado do usuário.
     * `.sleep` pausa o workflow por um período especificado sem consumir tempo de execução.
     */
    await context.sleep("wait-for-1-month", 60 * 60 * 24 * 30)
  }
})

async function sendEmail(message: string, email: string) {
  // Implement email sending logic here
  console.log(`Sending ${message} email to ${email}`)
}

const getUserState = async (): Promise<UserState> => {
  // Implement user state logic here
  return "non-active"
}
