"use client"

import config from "@/lib/config"
import { IKVideo, ImageKitProvider } from "imagekitio-next"

/**
 * Vídeo de apresentação do livro.
 */
export default function BookVideo({ videoUrl }: { videoUrl: string }) {
  return (
    <ImageKitProvider publicKey={config.env.imagekit.publicKey} urlEndpoint={config.env.imagekit.urlEndpoint}>
      {/* Componente de vídeo do ImageKit */}
      <IKVideo
        path={videoUrl}
        controls={true} // exibir controles (play/pause, volume, tela cheia...)
        className="w-full rounded-xl"
      />
    </ImageKitProvider>
  )
}
