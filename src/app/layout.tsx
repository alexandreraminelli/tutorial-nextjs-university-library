import type { Metadata } from "next" // metadados
import localFont from "next/font/local" // fontes
import "./globals.css" // Tailwind CSS
import { Toaster } from "sonner"
import { SessionProvider } from "next-auth/react"
import { auth } from "@/auth"

// Fontes
/** Fonte IBM Plex Sans (local). */
const ibmPlexSans = localFont({
  src: [
    { path: "../fonts/IBMPlexSans-Regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/IBMPlexSans-Medium.ttf", weight: "500", style: "" },
    { path: "../fonts/IBMPlexSans-SemiBold.ttf", weight: "600", style: "" },
    { path: "../fonts/IBMPlexSans-Bold.ttf", weight: "700", style: "" },
  ],
})
/** Fonte Bebas Neue (local). */
const bebasNeue = localFont({
  src: [{ path: "../fonts/BebasNeue-Regular.ttf", weight: "400", style: "normal" }],
  variable: "--bebas-neue", // variável CSS para aplicar a fonte
})

/** Metadados principais do projeto. */
export const metadata: Metadata = {
  title: {
    template: "%s | BookWise",
    default: "BookWise",
  },
  description: "BookWise is a book borrowing university library management solution.",
}

/** Layout principal da aplicação. */
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth() // Obtém a sessão do NextAuth

  return (
    <html lang="en">
      {/* Provedor de sessão do NextAuth */}
      <SessionProvider session={session}>
        <body className={`${ibmPlexSans.className} ${bebasNeue.variable} antialiased`}>
          {children} {/* Filho */}
          <Toaster richColors /> {/* Notificações */}
        </body>
      </SessionProvider>
    </html>
  )
}
