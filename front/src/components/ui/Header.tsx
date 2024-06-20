export default function Header ({ className }: { className?: string }): JSX.Element {
  return (
    <header className={`w-full ${className}`}>
        <h1 className="flex items-end gap-2 text-3xl font-poetsen text-main my-3">
            <img src="/logo.png" alt="MnkiUrl official logo" className="w-[80px] h-[80px]"/>
            MnkiUrl
        </h1>
    </header>
  )
}
