import config from "@/lib/config"
import { Client as QStashClient, resend } from "@upstash/qstash"
import { Client as WorkflowClient } from "@upstash/workflow"

/**
 * Workflow Client para interagir com o Upstash Workflow.
 */
export const workflowClient = new WorkflowClient({
  baseUrl: config.env.upstash.qstashUrl, // URL do Qstash
  token: config.env.upstash.qstashToken, // Token de autenticação do Qstash
})

/**
 * Cliente QStash para enviar mensagens.
 * Utilizado para enviar e-mails através do Resend.
 */
const qstashClient = new QStashClient({ token: config.env.upstash.qstashToken })
/**
 * Função para enviar um e-mail utilizando o QStash e Resend.
 *
 * @param {Object} params - Parâmetros para enviar o e-mail.
 * @param params.email - Endereço de e-mail do destinatário.
 * @param params.subject - Assunto do e-mail.
 * @param params.message - Mensagem do e-mail.
 *
 * @return {Promise<void>} Promise que resolve quando o e-mail for enviado.
 * @throws {Error} Se ocorrer um erro ao enviar o e-mail.
 */
export async function sendEmail({ email, subject, message }: { email: string; subject: string; message: string }) {
  return await qstashClient.publishJSON({
    api: {
      name: "email",
      provider: resend({ token: config.env.resendToken }),
    },
    body: {
      from: "Alexandre Raminelli <library.alexandreraminelli.me>",
      to: [email], // Destinatário
      subject: subject, // Assunto
      html: message, // Mensagem em HTML
    },
  })
}
