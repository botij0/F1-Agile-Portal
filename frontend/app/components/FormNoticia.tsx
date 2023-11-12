"use client";
import axios from 'axios';
import Link from 'next/link'
import React from 'react'
import {useForm} from 'react-hook-form'
import { createClient } from "@supabase/supabase-js";
import { v4 as uuid } from 'uuid';

const supabase = createClient("https://pxfvrkflonlookyusxtb.supabase.co", 
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4ZnZya2Zsb25sb29reXVzeHRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgwODYyNTUsImV4cCI6MjAxMzY2MjI1NX0.I3v1fYevo3rzWOT8KvkIVDrZ0LbyvABN6YaynXIYE4I");

async function uploadImage(img: any) {
    let file = img;
    console.log(file);
    console.log(supabase);

    const { data, error } = await supabase
      .storage
      .from('Images')
      .upload("" + uuid(),file) 

    if(data) {
      return data;
    } else {
      return -1;
    }
}

const FormNoticia = () => {

    const {register, handleSubmit, formState:{errors}} = useForm();

    const NOTICIA_API_BASE_URL = 'http://localhost:8080/api/v1/noticias';
    const headers = {
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY5OTc5MDMyNiwiZXhwIjoxNjk5ODc2NzI2fQ.KDkCZSxFbytHHXYojSsIrVQeEmlVpPPH4HAOhvbIhpU'         //localStorage.getItem('token'),
    };

    const onSubmit = handleSubmit((data: any) => {
        console.log(data);
        let img_Name = uploadImage(data.imagen[0]);

        img_Name.then((value) => {
            if (value != -1) {
                console.log(value);
                axios.post(NOTICIA_API_BASE_URL, {
                    titulo: data.titulo,
                    texto: data.texto,
                    imagen: value.path
                }, {
                    headers: headers
                })
                .then(data => {
                    console.log(data);
                })
                .catch(error => {
                    console.log(error);
                })
            }
        });
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

                    {
                        errors.titulo && (
                            <span className="text-red-500 text-xs italic">{errors.titulo.message as string}</span>
                        )
                    }

                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded 
                                    py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white" 
                                    id="titulo" type="text" placeholder="Titulo de la noticia" {...register("titulo",{
                                        required:{
                                            value: true,
                                            message: 'Este campo es obligatorio'
                                        }, 
                                        maxLength:{
                                            value: 100,
                                            message: 'El titulo no puede tener mas de 100 caracteres'
                                        }
                                    })}
                    />

                    <p className="text-gray-600 text-xs italic">Titulo de la noticia</p>
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="texto">
                        Texto
                    </label>
                    {
                        errors.texto && (
                            <span className="text-red-500 text-xs italic">{errors.texto.message as string}</span>
                        )
                    }
                    <textarea className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded 
                                            py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white" 
                                            id="texto" placeholder="Texto de la noticia" {...register("texto",{
                                                required:{
                                                    value: true,
                                                    message: 'Este campo es obligatorio'
                                                },                                                
                                                 maxLength:{
                                                    value: 2000,
                                                    message: 'El texto no puede tener mas de 2000 caracteres'
                                                 }, 
                                                 minLength:{
                                                    value: 500,
                                                    message: 'El texto no puede tener menos de 500 caracteres'
                                                 }                                            
                                            })}
                    />

                    <p className="text-gray-600 text-xs italic">Texto de la noticia</p>
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="titulo">
                        Imagen
                    </label>
                    {
                        errors.imagen && (
                            <span className="text-red-500 text-xs italic">{errors.imagen.message as string}</span>
                        )
                    }
                    <input className="appearance-none block text-gray-700 w-full text-sm border border-gray-200 shadow-sm rounded-lg focus:z-10 
                                    focus:border-red-500 focus:ring-red-500 disabled:opacity-50 disabled:pointer-events-none 
                                    file:border-0 bg-gray-50 file:me-4 file:py-2 file:px-4 file:text-gray-600 file:italic 
                                    file:bg-gray-200 file:hover:bg-gray-300 hover:bg-gray-200 cursor-pointer" 
                                    id="titulo" type="file" placeholder="Imagen" {...register("imagen", {
                                        required:{
                                            value: true,
                                            message: 'Este campo es obligatorio'
                                        },                                                                        
                                    })}
                    />
                    
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