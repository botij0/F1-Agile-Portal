"use client";
import Link from 'next/link'
import React from 'react'
import {useForm} from 'react-hook-form'

const FormNoticia = () => {

    const {register, handleSubmit} = useForm();

    const onSubmit = handleSubmit((data: any) => {
        console.log(data);
    });

  return (

    <div className='container mx-auto my-8'>

        <h2 className="text-black text-2xl">Añadir Noticia</h2>
        <hr className="border-black w-[100%] mb-5 m-auto"/>

        <form className="w-full max-w-lg mx-auto" onSubmit={onSubmit}>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="titulo">
                        Titulo
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded 
                                    py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white" 
                                    id="titulo" type="text" placeholder="Titulo de la noticia" {...register("titulo",
                                        {required: true, maxLength: 80}
                                    )}/>
                    <p className="text-gray-600 text-xs italic">Titulo de la noticia</p>
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="texto">
                        Texto
                    </label>
                    <textarea className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded 
                                            py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white" 
                                            id="texto" placeholder="Texto de la noticia" {...register("texto")}/>
                    <p className="text-gray-600 text-xs italic">Texto de la noticia</p>
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="titulo">
                        Imagen
                    </label>
                    <input className="appearance-none block text-gray-700 w-full text-sm border border-gray-200 shadow-sm rounded-lg focus:z-10 
                                    focus:border-red-500 focus:ring-red-500 disabled:opacity-50 disabled:pointer-events-none 
                                    file:border-0 bg-gray-50 file:me-4 file:py-2 file:px-4 file:text-gray-600 file:italic 
                                    file:bg-gray-200 file:hover:bg-gray-300 hover:bg-gray-200 cursor-pointer" 
                                    id="titulo" type="file" placeholder="Imagen" {...register("imagen")}/>
                    
                    <p className="text-gray-600 text-xs italic">Imagen</p>
                </div>
            </div>
            <div className="flex flex-wrap mb-6 items-center ">
                <div className="w-full px-3 flex justify-center">

                    <button className="bg-red-500 hover:bg-red-700 mr-5 text-white font-bold py-2 px-4 rounded" type='submit'>
                        Añadir Noticia
                    </button>

                    <Link href="/Noticias/Gestion">
                        <button className="border-2 border-gray-400 text-red-500 hover:text-red-700 hover:border-slate-600 uppercase text-xs xl:text-base font-bold py-2 px-4 rounded">
                            Volver
                        </button>
                    </Link>
                </div>
            </div>
        </form>

    </div>

  )
}

export default FormNoticia