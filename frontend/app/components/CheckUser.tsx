"use client";
import axios from 'axios';
import { useRouter } from 'next/navigation';

import React from 'react'
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast'

const CheckUser = () => {
    const [usuario, setUsuario] = React.useState("");
    const router = useRouter();

    const {register, handleSubmit, formState:{errors}, setValue} = useForm();

    const USUARIOS_API_BASE_URL = 'http://localhost:8080/api/v1/usuarios';
    const headers = {
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('token'),
    };

    const onSubmit = handleSubmit((data: any) => {

        try {
            const request = {username: data.usuario};
            axios.put(USUARIOS_API_BASE_URL, request, {headers: headers})
            .then(response => {
              if (!response.data.success)
              {
                toast.error(response.data.message)
              }
              else
              {
                toast.success(response.data.message, {duration: 4000})           
                window.location.href = "/Login/RecuperarPsw/" + response.data.id;
              }
            })
        } catch (err) 
        {
            console.log(err);
        }
    });

  return (
    <div className='mx-auto my-8 w-[70%]'>
        <Toaster />
        <h2 className="text-black text-2xl">
            Recuperar Contraseña
        </h2>
        <hr className="border-black w-[100%] mb-5 m-auto"/>

        <form className="w-full max-w-lg mx-auto" onSubmit={onSubmit}>

            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                    <label className="block tracking-wide text-gray-700 text-sm font-bold mb-2" htmlFor="usuario">
                        Usuario del que desea recuperar la contraseña:
                    </label>
                    {
                        errors.usuario && (
                            <span className="text-red-500 text-xs italic">{errors.usuario.message as string}</span>
                        )
                    }
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded 
                                    p-2.5 mb-1 leading-tight focus:outline-none focus:bg-white"
                                    id="usuario" type="text" placeholder="Usuario" {...register("usuario",{
                                        required:{
                                            value: true,
                                            message: 'Este campo es obligatorio'
                                        },                                                
                                        maxLength:{
                                            value: 50,
                                            message: 'El usuario no puede tener mas de 50 caracteres'
                                        },                                            
                                    })}
                    />

                    <p className="text-gray-600 text-xs italic">Nombre de Usuario</p>
                </div>
            </div>           
            
            <div className="flex flex-wrap mb-6 items-center ">
                <div className="w-full px-3 flex justify-center">

                    <button className="bg-red-500 hover:bg-red-700 mr-5 text-white font-bold py-2 px-4 rounded" type='submit'>
                        Comprobar
                    </button>

                    <button className="border-2 border-gray-400 text-red-500 hover:text-red-700 hover:border-slate-600 
                    uppercase text-xs xl:text-base font-bold py-2 px-4 rounded"
                    onClick={() => router.back()}>
                        Volver
                    </button>
                </div>
            </div>
        </form>
    </div>
  )
}

export default CheckUser