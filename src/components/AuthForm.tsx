"use client"

import FileUpload from "@/components/FileUpload"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form" // formulário do Shadcn
import { Input } from "@/components/ui/input"
import { FIELD_NAMES, FIELD_TYPES } from "@/constants"
import { zodResolver } from "@hookform/resolvers/zod" // resolver de validação do Zod
import Link from "next/link"
import { useRouter } from "next/navigation"
import { DefaultValues, FieldValues, Path, SubmitHandler, useForm, UseFormReturn } from "react-hook-form" // biblioteca de formulários do React
import { toast } from "sonner" // notificações (shadcn)
import { ZodType } from "zod"

/** Props do formulário de autenticação.
 *
 * `T`: Tipo genérico que estende `FieldValues`, permitindo que o formulário seja tipado dinamicamente.
 */
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
  /** Hook Next.js para manipulação de rotas. */
  const router = useRouter()

  /** Verifica se o formulário é de login. */
  const isSignIn = type == "SIGN_IN"

  /** Definição do formulário. */
  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  })
  /** Função para lidar com o envio do formulário. */
  const handleSubmit: SubmitHandler<T> = async (data) => {
    // Envia os dados do formulário
    const result = await onSubmit(data)
    // Verificar se a operação foi bem-sucedida
    if (result.success) {
      // Notificação de sucesso
      toast.success("Success", {
        description: isSignIn ? "You have successfully signed in" : "You have successfully signed up",
      })
      // Redirecionar para a página inicial
      router.push("/")
    } else {
      // Notificação de erro
      toast.error(`Error ${isSignIn ? "signing in" : "signing up"}`, {
        description: result.error || "An error occurred, please try again",
      })
    }
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
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          // style:
          className="space-y-6 w-full"
        >
          {/* Gerar os campos de formulários dinamicamente */}
          {Object.keys(defaultValues).map((field) => (
            <FormField
              key={field} // identificador (por ser iteração)
              control={form.control}
              name={field as Path<T>}
              render={({ field }) => (
                <FormItem>
                  {/* Label */}
                  <FormLabel className="capitalize">
                    {/* Nome do campo: se for o campo de cartão universitário, renderiza o icone de universidade */}
                    {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                  </FormLabel>

                  {/* Controle */}
                  <FormControl>
                    {/* Se for o campo de cartão universitário, renderiza o componente ImageUpload */}
                    {field.name == "universityCard" ? (
                      // Input para upload de imagem (ID universitário)
                      <FileUpload onFileChange={field.onChange} />
                    ) : (
                      // Senão, renderiza o componente Input
                      <Input
                        required
                        type={FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]} // tipo de input
                        {...field}
                        className="form-input"
                      />
                    )}
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          {/* Botão de envio */}
          <Button type="submit" className="form-btn">
            {isSignIn ? "Sign in" : "Sign up"}
          </Button>
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
