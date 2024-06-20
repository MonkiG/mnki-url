import { type FormEvent, useState, type ChangeEvent } from 'react'
import Aside from './Aside'
import Form from './Form'
import { Toaster, toast } from 'sonner'

export interface InputData {
  url: string
  alias?: string
}
export default function Hero (): JSX.Element {
  const [data, setData] = useState<InputData>({
    url: '',
    alias: ''
  })
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = e.target

    setData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    if (!data.url) {
      toast.error('Put a valid Url!')
    }

    console.log('enviado', data.alias ? data : { url: data.url })
  }
  return (
    <>
      <Toaster position='top-center' richColors />
      <section className='h-full w-full flex gap-10'>
          <Form data={data} handleChange={handleChange} onSubmit={onSubmit}/>
          <Aside/>
      </section>
    </>
  )
}
