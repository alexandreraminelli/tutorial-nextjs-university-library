"use client"

import AuthForm from "@/components/AuthForm"
import { signInSchema } from "@/lib/validations"

/** Página de login. */
export default function SignInPage() {
  return (
    <AuthForm
      type="SIGN_IN" // tipo de formulário
      schema={signInSchema}
      defaultValues={{ email: "", password: "" }} // valores padrão: strings vazias
      onSubmit={() => {}} // função para lidar com o envio do formulário
    />
  )
}
