/**
 * Página de limite de taxa.
 * Essa página é exibida quando o usuário excede o limite de requisições permitidas em um intervalo de tempo.
 */
export default function RatelimitPage() {
  return (
    <main
      className="root-container min-h-screen
        flex flex-col items-center justify-center"
    >
      <h1 className="font-bebas-neue text-5xl font-bold text-light-100">Whoa, Slow Down There, Speedy!</h1>
      <p className="mt-3 max-w-xl text-center text-light-400">Looks like you've been a little too eager. We've put a temporary pause on your excitement. &#128678; Chill for a bit, and try again shortly.</p>
    </main>
  )
}
