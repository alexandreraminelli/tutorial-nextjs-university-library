/*
 * Middleware: executa código no Edge antes de uma requisição ser completada.
 * Executa antes das páginas e APIs serem processadas.
 * Pode modificar, redirecionar ou bloquear requisições, sendo útil para autenticação, autorização, redirecionamentos, etc.
 */

// Mantêm a sessão ativa e atualiza a expiração da sessão
export { auth as middleware } from "@/auth"
