"use client"

import AuthForm from "@/components/AuthForm"
import { signUp } from "@/lib/actions/auth"
import { signUpSchema } from "@/lib/validations"

/** Página de criar conta. */
export default function SignUpPage() {
  return (
    <AuthForm
      type="SIGN_UP" // tipo de formulário
      schema={signUpSchema}
      defaultValues={{ email: "", password: "", fullName: "", universityId: 0, universityCard: "" }} // valores padrão: strings vazias e 0
      onSubmit={signUp} // função para lidar com o envio do formulário
    />
  )
}
