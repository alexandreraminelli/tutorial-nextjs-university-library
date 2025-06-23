import config from "@/lib/config"
import { Client as QStash, resend } from "@upstash/qstash"
import { Client as WorkflowClient } from "@upstash/workflow"

/**
 * Workflow Client para interagir com o Upstash Workflow.
 */
export const workflowClient = new WorkflowClient({
  baseUrl: config.env.upstash.qstashUrl, // URL do Qstash
  token: config.env.upstash.qstashToken, // Token de autenticação do Qstash
})

const client = new Client({ token: "<QSTASH_TOKEN>" })

// Envio de e-mail com Resend
await client.publishJSON({
  api: {
    name: "email",
    provider: resend({ token: "<RESEND_TOKEN>" }),
  },
  body: {
    from: "Acme <onboarding@resend.dev>",
    to: ["delivered@resend.dev"],
    subject: "Hello World",
    html: "<p>It works!</p>",
  },
})
