"use client";

import Link from 'next/link'
import {IoIosAddCircleOutline} from 'react-icons/io'
import NoticiaMng from './NoticiaMng'
import { useEffect, useState } from 'react';
import axios from 'axios';

const NewsManagment = () => {
    const NOTICIA_API_BASE_URL = 'http://localhost:8080/api/v1/noticias';
    const [noticias, setNoticias] = useState<any[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const getNoticias = async () => {
            setLoading(true);
            try{
                const response = await axios.get(NOTICIA_API_BASE_URL, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTcwMDA3MzM2MSwiZXhwIjoxNzAwMTU5NzYxfQ.BpyEDIAeI18Sk8DwY3FOVaSG9RNMTU-jqEpGPyuJknI'         //localStorage.getItem('token'),
                    },
                });
                const data = await response.data;
                setNoticias(data);
                
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        }
        getNoticias();
    }, []);
  return (
    <div className="container mx-auto my-8">

        <h2 className="text-black text-2xl">Gestión de Noticias</h2>
        <hr className="border-black w-[100%] mb-5 m-auto"/>

        <Link href="/Noticias/Crear" title='Crear Noticia' className='flex w-7 ml-auto' >
            <IoIosAddCircleOutline className="text-gray-500 hover:text-gray-800 w-7 h-7 mb-0.5"/>
        </Link>

        <div className="flex shadow border-b">
            <table className="min-w-full">
                
                <thead className="bg-red-500 border-b">
                    <tr>
                        <th className="text-left font-medium text-white uppercase tracking-wide py-3 px-6">
                            Titulo
                        </th>
                        <th className="text-left font-medium text-white uppercase tracking-wide py-3 px-6">
                            Texto
                        </th>
                        <th className="text-right font-medium text-white uppercase tracking-wide py-3 px-6">
                            Acciones
                        </th>
                    </tr>
                </thead>
                
                {!loading && (
                    <tbody className="bg-gray-50">
                            {noticias?.map((noticia) => (
                                <NoticiaMng key={noticia.id} noticia={noticia}/>
                            ))}
                    </tbody>
                )}
            </table>
        </div>
    </div>
  )
}

export default NewsManagment