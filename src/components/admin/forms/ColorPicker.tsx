import { useState } from "react"
import { HexColorInput, HexColorPicker } from "react-colorful"

/** Props do `ColorPicker`. */
interface Props {
  /** Valor da cor. */
  value?: string
  /** Função quando a cor do seletor mudar. */
  onPickerChange?: (color: string) => void
}

/** Seletor de cores para formulários. */
export default function ColorPicker({ value, onPickerChange }: Props) {
  return (
    <div className="relative">
      {/* Input de cor */}
      <div className="flex flex-row items-center">
        <p>#</p>
        <HexColorInput color={value} onChange={onPickerChange} className="hex-input h-full flex-1 bg-transparent font-ibm-plex-sans outline-none" />
      </div>
      {/* Seletor de cor */}
      <HexColorPicker color={value} onChange={onPickerChange} />
    </div>
  )
}
