import Footer from './components/ui/Footer.jsx'
import Header from './components/ui/Header.js'
import { Toaster, toast } from 'sonner'
import { type FormEvent, useState, type ChangeEvent, useRef } from 'react'
import { type shorternUrl, type InputData } from './types.js'
import createShortUrl from './services/url.js'
import Aside from './components/ui/Aside.js'
import Form from './components/ui/Form.js'
import MainButton from './components/ui/MainButton.js'

export default function App (): JSX.Element {
  const [data, setData] = useState<InputData>({
    url: '',
    alias: ''
  })
  const [shortenUrl, setShortenUrl] = useState<shorternUrl | null>()
  const timeoutIdRef = useRef<NodeJS.Timeout | null>()

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = e.target

    setData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current)
    }

    timeoutIdRef.current = setTimeout(() => {
      try {
        /* eslint-disable-next-line */
        new URL(data.url)
        createShortUrl(data.alias ? data : { url: data.url })
          .then(res => {
            console.log('enviado')
            setShortenUrl(res.alias ? { shortenAlias: `${res.serverUrl}${res.alias}`, shortenHash: `${res.serverUrl}${res.hash}` } : `${res.serverUrl}${res.hash}`)
          })
          .catch(e => { console.error(e) })
      } catch (error) {
        toast.error('Put a valid Url!')
      }
    }, 300)
  }
  return (
    <>
      <Toaster position='top-center' richColors />

      <Header/>
      <main className="min-h-full grow">
        <h2 className='text-center font-montserrat-alt text-3xl mt-5 mb-16'>
          Share your content in a <span className='text-main'>easier</span> <br />
          way.
        </h2>
        <section className='h-full w-full flex gap-10'>
          <div className='w-full'>
            {shortenUrl && typeof shortenUrl === 'string' && <>
              <h2 className='text-3xl font-poetsen mb-2'>Your shorten url</h2>
              <a href={shortenUrl} target='_blank' className='underline block my-5 font-arsenal'>{shortenUrl}</a>
              <MainButton text='Short another URL' onClick={() => { setShortenUrl(null) }}/>
            </>}
            {shortenUrl && typeof shortenUrl === 'object' && <>
              <h2 className='text-3xl font-poetsen mb-2'>Your shorten url's</h2>
              <ul className='my-5'>
                <li><a href={shortenUrl.shortenAlias} target='_blank' className='underline font-arsenal'>{shortenUrl.shortenAlias}</a></li>
                <li><a href={shortenUrl.shortenHash} target='_blank' className='underline font-arsenal'>{shortenUrl.shortenHash}</a></li>
              </ul>
              <MainButton text='Short another URL' onClick={() => { setShortenUrl(null) }}/>
            </>}
            {!shortenUrl && <Form data={data} handleChange={handleChange} onSubmit={onSubmit}/>}
          </div>
          <Aside/>
        </section>
      </main>
     <Footer />
    </>
  )
}
