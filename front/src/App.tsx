import Footer from './components/ui/Footer.jsx'
import Header from './components/ui/Header.js'
import Hero from './components/ui/hero/Hero.js'

export default function App (): JSX.Element {
  return (
    <>
      <Header/>
      <main className="min-h-full grow">
        <h2 className='text-center font-montserrat-alt text-3xl mt-5 mb-16'>
          Share your content in a <span className='text-main'>easier</span> <br />
          way.
        </h2>
        <Hero />
      </main>
     <Footer />
    </>
  )
}
