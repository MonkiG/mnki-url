import { type ChangeEvent, type FormEvent, type HTMLAttributes } from 'react'
import MainButton from './MainButton'
import { type InputData } from './../../types'

interface FromProps extends HTMLAttributes<HTMLFormElement> {
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
  data: InputData
}

export default function Form ({ onSubmit, handleChange, data }: FromProps): JSX.Element {
  return (
    <form
        className="w-full flex flex-col gap-5"
        onSubmit={onSubmit}>
        <div className="flex flex-col w-full gap-1">
            <label htmlFor="url">Put a long URL</label>
            <input
                onChange={handleChange}
                value={data.url}
                className="border-[1px] border-solid border-black py-1 px-2 w-full rounded-lg "
                type="text"
                name="url"
                placeholder="https://my-long-url.com.mx"
            />
        </div>
        <div className="flex flex-col w-full gap-1">
            <label htmlFor="alias">Put an alias for your <strong>shorten url</strong></label>
            <input
                onChange={handleChange}
                value={data.alias}
                className="border-[1px] border-solid border-black py-1 px-2 w-full rounded-lg "
                type="text"
                name="alias"
                placeholder="my-alias"
            />
        </div>
        <MainButton text='Shorten URL' type='submit'/>
    </form>
  )
}
