'use client'

import { useState } from 'react'
import axios from 'axios'

const registerURL = process.env.REGISTER_URL || 'http://localhost:8080/auth/signup'

type InputData = {
  name: string
  username: string
  email: string
  password1: string
  password2: string
}

type RegisterData = {
  name: string
  username: string
  email: string
  password: string
}

type AuthResponse = {
  success: boolean
  message: string
  token: string
}

const PERSON_NAME_REG_EX = /^[a-záéíóúñ.'-]+(?:\s[a-z.'-]+)*$/i
const USERNAME_REG_EX = /^[a-z_][a-z0-9_]{1,19}$/i
const EMAIL_REG_EX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,40}$/i
const PASSWORD_REG_EX = /^(?=.*[A-Z])(?=.*\d)[A-Z\d.]{8,32}$/i

function validateInput(data: InputData): RegisterData {
  const { name, username, email, password1, password2 } = data
  if (!PERSON_NAME_REG_EX.test(name)) throw new Error('Invalid display name')
  if (!USERNAME_REG_EX.test(username)) throw new Error('Invalid username')
  if (!EMAIL_REG_EX.test(email)) throw new Error('Invalid email')
  if (!PASSWORD_REG_EX.test(password1)) throw new Error('Invalid password')
  if (password1 !== password2) throw new Error('Passwords do not match')
  return { name, username, email, password: password1 }
}

const labelConfig = 'block mb-2 text-sm font-medium text-white-900' // text-gray-900 dark:text-white
const fieldsConfig =
  'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'

export default function Register() {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')

  const jsonRegister: InputData = { name, username, email, password1, password2 }

  const handleSubmit = async () => {
    try {
      const request = validateInput(jsonRegister)
      const response = await axios.post<AuthResponse>(registerURL, request)
      if (!response.data.success) throw new Error(response.data.message)

      localStorage.setItem('token', response.data.token)
      window.location.href = '/'
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='mt-[100px]'>
      <form className='mx-4 max-w-xs'>
        <div className='mb-6'>
          <label className={labelConfig}>Nombre de visualización</label>
          <input
            aria-label='Nombre de visualización'
            type='text'
            placeholder='Introduce tu nombre de visualización'
            className={fieldsConfig}
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='mb-6'>
          <label className={labelConfig}>Nombre de usuario</label>
          <input
            aria-label='Nombre de usuario'
            type='text'
            placeholder='Introduce tu nombre de usuario'
            className={fieldsConfig}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='mb-6'>
          <label className={labelConfig}>Correo Electrónico</label>
          <input
            aria-label='Email'
            type='email'
            placeholder='Introduce tu Email'
            className={fieldsConfig}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='mb-6'>
          <label className={labelConfig}>Contraseña</label>
          <input
            aria-label='Contraseña'
            type='password'
            placeholder='Introduce tu contraseña'
            className={fieldsConfig}
            required
            onChange={(e) => setPassword1(e.target.value)}
          />
        </div>
        <div className='mb-6'>
          <label className={labelConfig}>Confirmar contraseña</label>
          <input
            aria-label='Confirmar contraseña'
            type='password'
            placeholder='Introduce tu contraseña de nuevo'
            className={fieldsConfig}
            required
            onChange={(e) => setPassword2(e.target.value)}
          />
        </div>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          type='button'
          onClick={handleSubmit}
        >
          Regitrarse
        </button>
      </form>
    </div>
  )
}
