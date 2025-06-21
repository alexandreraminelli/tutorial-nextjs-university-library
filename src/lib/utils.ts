import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Função para obter as iniciais de um nome.
 * @param name Nome completo do usuário.
 * @returns Iniciais do nome.
 */
export function getInitials(name: string): string {
  return name
    .split(" ") // dividir nome em array
    .map((part) => part[0]) // pegar a primeira letra de cada nome
    .join("") // juntar as letras
    .toUpperCase() // capitalizar
    .slice(0, 2) // limitar a 2 caracteres
}
