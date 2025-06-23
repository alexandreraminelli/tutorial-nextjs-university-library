import { Client as WorkflowClient } from "@upstash/workflow"
import config from "@/lib/config"

/**
 * Workflow Client para interagir com o Upstash Workflow.
 */
export const workflowClient = new WorkflowClient({
  baseUrl: config.env.upstash.qstashUrl, // URL do Qstash
  token: config.env.upstash.qstashToken, // Token de autenticação do Qstash
})
