"use client"

import config from "@/lib/config"
import { cn } from "@/lib/utils"
import { IKImage, IKUpload, IKVideo, ImageKitProvider } from "imagekitio-next"
import Image from "next/image"
import { useRef, useState } from "react"
import { toast } from "sonner"

// desestruturar configurações do ImageKit
const {
  env: {
    imagekit: { urlEndpoint, publicKey },
  },
} = config

/**
 * Função de autenticação para o ImageKit.
 */
async function authenticator() {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`)

    // Se o code status não for 200, lança um erro
    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Request failed with status ${response.status}: ${errorText}`)
    }

    /** Resposta da mensagem. */
    const data = await response.json()
    const { signature, expire, token } = data

    return { token, expire, signature } // Retornar dados
  } catch (error: any) {
    // Tratamento de exceções
    throw new Error(`Authenticator request failed: ${error.message}`)
  }
}

/** Props do componente `FileUpload`. */
interface Props {
  /** Tipo de arquivo do upload. */
  type: "image" | "video"
  /** Tipos de arquivos aceitos no upload. */
  accept: string
  /** Placeholder do input de upload. */
  placeholder: string
  /** Pasta onde o arquivo será colocado. */
  folder: string
  /** Variação do input. */
  variant: "dark" | "light"
  /** Função de callback chamada quando um novo arquivo for enviado com sucesso pelo usuário.  */
  onFileChange: (filePath: string) => void
}

/** Input para upload de arquivo de imagem. */
export default function FileUpload(
  // Props
  { type, accept, placeholder, folder, variant, onFileChange }: Props
) {
  /** Referência para o componente `IKUpload`. */
  const iKUploadRef = useRef(null)
  // Estado para armazenar o arquivo carregado.
  const [file, setFile] = useState<{ filePath: string } | null>(null)
  // Estado para armazenar o progresso do upload.
  const [progress, setProgress] = useState(0)

  /** Estilos pro botão de upload. */
  const styles = {
    button: variant === "dark" ? "bg-dark-300" : "bg-light-600 border-gray-100 border",
    placeholder: variant === "dark" ? "text-light-100" : "text-slate-500",
    text: variant === "dark" ? "text-light-100" : "text-slate-500",
  }

  /** Função chamada quando ocorre um erro no upload. */
  const onError = (error: any) => {
    console.log(error) // Log de erro
    // Exibir notificação de erro:
    toast.error(`${type} uploaded failed`, { description: `Your ${type} could not be upload. Please try again.` })
  }
  /** Função chamada quando o upload é bem-sucedido. */
  const onSuccess = (res: any) => {
    setFile(res) // Atualiza o estado com o arquivo carregado
    onFileChange(res.filePath) // Chama a função de callback com o caminho do arquivo
    // Exibir notificação de sucesso:
    toast.success(`${type} uploaded successfully`, {
      description: `${res.filePath} uploaded successfully`,
    })
  }

  /** Validações dos arquivos. */
  const onValidate = (file: File) => {
    if (type === "image" && file.size > 20 * 1024 * 1024) {
      // tamanho máximo de imagens: 20MB
      toast.warning("File size too large", {
        description: "Please upload a file that is less than 20MB in size.",
      })
      return false
    } else if (type === "video" && file.size > 50 * 1024 * 1024) {
      // tamanho máximo de vídeos: 50MB
      toast.warning("File size too large", {
        description: "Please upload a file that is less than 50MB in size.",
      })
      return false
    }
    return true
  }

  return (
    <ImageKitProvider
      // Atributos de autenticação:
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      {/* Componente de Upload do ImageKit */}
      <IKUpload
        ref={iKUploadRef} // renderização de outro componente
        onError={onError} // função de erro
        onSuccess={onSuccess} // função de sucesso
        useUniqueFileName={true} // usar nome de arquivo único
        validateFile={onValidate} // função de validação de arquivo
        onUploadStart={() => setProgress(0)} // função chamada quando o upload começa: progresso = 0
        onUploadProgress={({ loaded, total }) => {
          // função chamada quando o upload está em progresso
          /** Porcentagem do upload */
          const percent = Math.round((loaded / total) * 100)
          setProgress(percent) // Atualiza o progresso do upload
        }}
        folder={folder} // pasta onde o arquivo será colocado
        accept={accept} // tipo de arquivo aceito
        className="hidden" // style
      />

      {/* Botão de Upload */}
      <button
        className={cn("upload-btn flex min-h-14 w-full items-center justify-center gap-1.5 rounded-md cursor-pointer", styles.button)}
        // chamar componente de upload
        onClick={(e) => {
          e.preventDefault()
          if (iKUploadRef.current) {
            // @ts-ignore
            iKUploadRef.current?.click()
          }
        }}
      >
        {/* Ícone de Upload */}
        <Image src="/icons/upload.svg" alt="upload-icon" width={20} height={20} className="object-contain" />
        {/* Placeholder do botão de upload */}
        <p className={cn("text-base", styles.placeholder)}>{placeholder}</p>

        {/* Nome do arquivo carregado (se houver) */}
        {/* {file && <p className={cn("upload-filename mt-1 text-center text-xs", styles.text)}>{file.filePath}</p>} */}
      </button>

      {/* Barra de progresso do upload */}
      {progress > 0 && progress !== 100 && (
        <div className="w-full rounded-full bg-green-200">
          <div className="progress rounded-full bg-green-800 p-0.5 text-center font-bebas-neue text-[8px] font-bold leading-none text-light-100" style={{ width: `${progress}%` }}>
            {progress}%
          </div>
        </div>
      )}

      {/* Exibir imagem carregada (se houver) */}
      {file && type === "image" ? ( // se arquivo for uma imagem
        <IKImage alt={file.filePath} path={file.filePath} width={500} height={275} />
      ) : (
        type === "video" && (
          // se arquivo for um vídeo
          <IKVideo path={file?.filePath} controls={true} className="h-96 w-full rounded-xl" />
        )
      )}
    </ImageKitProvider>
  )
}
