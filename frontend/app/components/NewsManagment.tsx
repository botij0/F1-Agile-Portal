"use client";

import Link from 'next/link'
import {IoIosAddCircleOutline} from 'react-icons/io'
import NoticiaMng from './NoticiaMng'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {paginate} from '../utils/paginate';
import Pagination from './Pagination';

const NewsManagment = () => {

    const pageSize = 5;
    const [currentPage, setCurrentPage] = useState<number>(1);

    const NOTICIA_API_BASE_URL = 'http://localhost:8080/api/v1/noticias';
    const [noticias, setNoticias] = useState<any[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    }

    const paginateNoticias = paginate(noticias, currentPage, pageSize);

    const headers = {
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('token'),
    }
    
    useEffect(() => {
        const getNoticias = async () => {
            setLoading(true);
            try{
                const response = await axios.get(NOTICIA_API_BASE_URL, {
                    method: 'GET',
                    headers: headers
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

    const deleteNoticia = (e: React.MouseEvent, id:number) => {
        e.preventDefault();
        axios.delete(NOTICIA_API_BASE_URL + "/" + id,{
            headers: headers
        }).then((res) => {
          if (noticias) {
            setNoticias((prevElement) => {
                if (prevElement == null) 
                    return null;
                else
                    return prevElement.filter((user) => user.id !== id);
            });
          }
        });
      };

  return (
    <div className="container mx-auto my-8">

        <h2 className="text-black text-2xl">Gestión de Noticias</h2>
        <hr className="border-black w-[100%] mb-5 mx-auto"/>

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
                            {paginateNoticias?.map((noticia:{id: number,titulo: string,texto: string, }) => (
                                <NoticiaMng key={noticia.id} noticia={noticia} deleteNoticia={deleteNoticia}/>
                            ))}
                    </tbody>
                )}
            </table>
        </div>
        <Pagination
                items={ noticias == null ? 0 : noticias.length}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
    </div>
  )
}

export default NewsManagment