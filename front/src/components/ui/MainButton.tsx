import { type ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  className?: string
  onClick?: () => void
}
export default function MainButton ({ text, className, onClick, type }: ButtonProps): JSX.Element {
  return (
    <button
      type={type}
      className={`bg-main text-white font-arsenal font-bold py-2 px-2 rounded-lg hover:bg-main/90 ${className}`}
      onClick={type !== 'submit' ? onClick : undefined }>
        {text}
    </button>
  )
}
