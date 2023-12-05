"use client";

import axios from "axios";
import toast, {Toaster} from 'react-hot-toast'
import {useForm} from 'react-hook-form'
import Link from "next/link";

export default function Login() {

  const {register, handleSubmit, formState:{errors}} = useForm();

  const onSubmit = handleSubmit((data: any) => {
    try {
      const request = {username: data.username, password: data.password}
      axios.post("http://localhost:8080/auth/login", request)
      .then(response => {
        if (!response.data.success)
        {
          toast.error(response.data.message)
        }
        else
        {
          toast.success(response.data.message, {duration: 4000})           
          localStorage.setItem('token', response.data.token)
          window.location.href = '/'
        }
      })
    } catch (err) {
      console.log(err);
    }
  });

  return (
    <div className="mt-[100px]">
      <Toaster />
      <h2 className="text-black text-2xl w-[50%] m-auto">Iniciar Sesión</h2>
      <hr className="border-black w-[50%] mb-5 m-auto"/>
      <form className="mx-auto max-w-xs" onSubmit={onSubmit}>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Nombre de usuario
          </label>
          {
            errors.username && (
                <span className="text-red-500 text-xs italic">{errors.username.message as string}</span>
            )
          }
          <input
            type="username"
            id="username"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500
                       focus:border-red-500 block w-full p-2.5 "
            placeholder="name@example.com"
            {...register("username",{
                required:{
                  value: true,
                  message: 'Este campo es obligatorio'
              },
              maxLength:{
                value: 50,
                message: 'El Usuario no puede tener mas de 50 caracteres'
              },
            })}
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Contraseña
          </label>
          {
            errors.password && (
                <span className="text-red-500 text-xs italic">{errors.password.message as string}</span>
            )
          }
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500
                       focus:border-red-500 block w-full p-2.5 "
            placeholder="********"
            {...register("password",{
                required:{
                  value: true,
                  message: 'Este campo es obligatorio'
              },
              maxLength:{
                value: 50,
                message: 'La Contraseña no puede tener mas de 50 caracteres'
              },
              minLength:{
                value: 5,
                message: 'La Contraseña no puede tener menos de 5 caracteres'
              }
            })}
          />
        </div>
        <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              value=""
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-red-300 accent-red-700"
            />
          </div>
          <label className="ml-2 text-sm font-medium text-gray-900">
            Recuérdame
          </label>
        </div>
        <button
          type="submit"
          className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium 
          rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
        >
          Iniciar sesión
        </button>
        <div className="py-6 text-sm font-medium text-red-600 hover:text-red-700">
          <Link href="/Login/ComprobarUser">
            ¿Has olvidado la contraseña?
          </Link>
        </div>
      </form>
    </div>
  );
}
