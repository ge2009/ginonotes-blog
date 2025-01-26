import { ReactNode } from 'react'

interface HighlightProps {
  children: ReactNode
}

export function Highlight({ children }: HighlightProps) {
  return (
    <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text font-semibold text-transparent">
      {children}
    </span>
  )
} 