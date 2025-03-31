"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form" // formulário do Shadcn
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod" // resolver de validação do Zod
import Link from "next/link"
import { DefaultValues, FieldValues, SubmitHandler, useForm, UseFormReturn } from "react-hook-form" // biblioteca de formulários do React
import { ZodType } from "zod"

/** Props do formulário de autenticação. */
interface Props<T extends FieldValues> {
  /** Schema de validação do formulário. */
  schema: ZodType<T>
  /** Valores padrão do formulário. */
  defaultValues: T
  /** Função executada ao enviar o formulário. */
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>
  /** Tipo de formulário. */
  type: "SIGN_IN" | "SIGN_UP"
}

/** Formulário de autenticação. */
export default function AuthForm<T extends FieldValues>(
  { type, schema, defaultValues, onSubmit }: Props<T> // props
) {
  /** Verifica se o formulário é de login. */
  const isSignIn = type == "SIGN_IN"

  /** Definição do formulário. */
  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  })
  /** Função para lidar com o envio do formulário. */
  const handleSubmit: SubmitHandler<T> = async (data) => {
    console.log(data)
  }

  // Renderizar o formulário
  return (
    <div className="flex flex-col gap-4">
      {/* Título do formulário */}
      <h1 className="text-2xl font-semibold text-white">{isSignIn ? "Welcome back to BookWise" : "Create your library account"}</h1>
      {/* Descrição do formulário */}
      <p className="text-light-100">{isSignIn ? "Access the vast collection of resources, and stay updated" : "Please complete all fields and upload a valid university ID to gain access to the library"}</p>

      {/* Formulário */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>This is your public display name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>

      {/* Link pro formulário alternativo */}
      <p className="text-center text-base font-medium">
        {(isSignIn ? "Don't have an account?" : "Already have an account?") + " "}
        <Link className="font-bold text-primary" href={isSignIn ? "/sign-up" : "/sign-in"}>
          {isSignIn ? "Create an account" : "Sign in"}
        </Link>
      </p>
    </div>
  )
}
