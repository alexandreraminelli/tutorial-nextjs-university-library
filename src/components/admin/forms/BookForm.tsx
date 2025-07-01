"use client"

import FileUpload from "@/components/FileUpload"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form" // formulário do Shadcn
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FIELD_TYPES } from "@/constants"
import { bookSchema } from "@/lib/validations"
import { zodResolver } from "@hookform/resolvers/zod" // resolver de validação do Zod
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form" // biblioteca de formulários do React
import z from "zod"
import ColorPicker from "./ColorPicker"

/**
 * Props do formulário de livros.
 *
 * `T`: Tipo genérico que estende `FieldValues`, permitindo que o formulário seja tipado dinamicamente.
 */
interface Props extends Partial<Book> {
  /** Tipo de formulário (criar ou editar livro). */
  type?: "create" | "update"
}

/** Formulário de autenticação. */
export default function BookForm(
  { type, ...book }: Props // props
) {
  /** Hook Next.js para manipulação de rotas. */
  const router = useRouter()

  /** Definição do formulário. */
  const form = useForm<z.infer<typeof bookSchema>>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: "",
      description: "",
      author: "",
      genre: "",
      rating: 1,
      totalCopies: 1,
      coverUrl: "",
      coverColor: "",
      videoUrl: "",
      summary: "",
    },
  })

  /** Função para enviar o formulário. */
  const onSubmit = async (values: z.infer<typeof bookSchema>) => {}

  // Renderizar o formulário
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Field: Título do Livro */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              {/* Label */}
              <FormLabel className="text-base font-normal text-dark-500">Book Title</FormLabel>

              {/* Controlador */}
              <FormControl>
                <Input
                  required
                  placeholder="Book title"
                  type={FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]} // tipo de input
                  {...field}
                  className="book-form-input min-h-14 border border-gray-100 bg-light-600 p-4 text-base font-semibold placeholder:font-normal placeholder:text-slate-500 text-dark-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Field: Autor */}
        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              {/* Label */}
              <FormLabel className="text-base font-normal text-dark-500">Author</FormLabel>

              {/* Controlador */}
              <FormControl>
                <Input
                  required
                  placeholder="Book author"
                  type={FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]} // tipo de input
                  {...field}
                  className="book-form-input min-h-14 border border-gray-100 bg-light-600 p-4 text-base font-semibold placeholder:font-normal placeholder:text-slate-500 text-dark-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Field: Gênero */}
        <FormField
          control={form.control}
          name="genre"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              {/* Label */}
              <FormLabel className="text-base font-normal text-dark-500">Genre</FormLabel>

              {/* Controlador */}
              <FormControl>
                <Input
                  required
                  placeholder="Book genre"
                  type={FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]} // tipo de input
                  {...field}
                  className="book-form-input min-h-14 border border-gray-100 bg-light-600 p-4 text-base font-semibold placeholder:font-normal placeholder:text-slate-500 text-dark-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Field: Avaliação */}
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              {/* Label */}
              <FormLabel className="text-base font-normal text-dark-500">Rating</FormLabel>

              {/* Controlador */}
              <FormControl>
                <Input
                  placeholder="Book rating"
                  type="number" // input type
                  min={1}
                  max={5}
                  step={0.5}
                  {...field}
                  className="book-form-input min-h-14 border border-gray-100 bg-light-600 p-4 text-base font-semibold placeholder:font-normal placeholder:text-slate-500 text-dark-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Field: Cópias */}
        <FormField
          control={form.control}
          name="totalCopies"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              {/* Label */}
              <FormLabel className="text-base font-normal text-dark-500">Total Copies</FormLabel>

              {/* Controlador */}
              <FormControl>
                <Input
                  placeholder="Total copies"
                  type="number" // input type
                  min={0}
                  max={10_000}
                  step={1}
                  {...field}
                  className="book-form-input min-h-14 border border-gray-100 bg-light-600 p-4 text-base font-semibold placeholder:font-normal placeholder:text-slate-500 text-dark-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Field: Capa (upload) */}
        <FormField
          control={form.control}
          name="coverUrl"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              {/* Label */}
              <FormLabel className="text-base font-normal text-dark-500">Book Image</FormLabel>

              {/* Controlador */}
              <FormControl>
                <FileUpload type="image" accept="image/*" variant="light" placeholder="Upload a book cover" folder="books/covers" onFileChange={field.onChange} value={field.value} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Field: Cor da capa */}
        <FormField
          control={form.control}
          name="coverColor"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              {/* Label */}
              <FormLabel className="text-base font-normal text-dark-500">Primary Color</FormLabel>

              {/* Controlador */}
              <FormControl>
                <ColorPicker onPickerChange={field.onChange} value={field.value} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Field: Descrição */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              {/* Label */}
              <FormLabel className="text-base font-normal text-dark-500">Book Description</FormLabel>

              {/* Controlador */}
              <FormControl>
                <Textarea placeholder="Book description" {...field} rows={10} className="book-form_input min-h-14 border border-gray-100 bg-light-600 p-4 text-base font-semibold placeholder:font-normal placeholder:text-slate-500" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Field: Video (upload) */}
        <FormField
          control={form.control}
          name="videoUrl"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              {/* Label */}
              <FormLabel className="text-base font-normal text-dark-500">Book Trailer</FormLabel>
              {/* Controlador */}
              <FileUpload type="video" accept="video/*" variant="light" placeholder="Upload a book trailer" folder="books/videos" onFileChange={field.onChange} value={field.value} />
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Field: Resumo */}
        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              {/* Label */}
              <FormLabel className="text-base font-normal text-dark-500">Book Summary</FormLabel>

              {/* Controlador */}
              <FormControl>
                <Textarea placeholder="Book summary" {...field} rows={5} className="book-form_input min-h-14 border border-gray-100 bg-light-600 p-4 text-base font-semibold placeholder:font-normal placeholder:text-slate-500" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Botão de enviar */}
        <Button type="submit" className="book-form_btn min-h-14 w-full bg-primary-admin text-white hover:text-black">
          Add Book to Library
        </Button>
      </form>
    </Form>
  )
}
