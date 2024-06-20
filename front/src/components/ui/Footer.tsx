export default function Footer ({ className }: { className?: string }): JSX.Element {
  return (
    <footer className={`text-center ${className} my-5`}>
        Made by <strong className="underline"><a href="https://github.com/monkig/" target="_blank">Monki</a></strong> 💞
    </footer>
  )
}
