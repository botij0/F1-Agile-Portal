"use client";

import Link from 'next/link'
import {IoIosAddCircleOutline} from 'react-icons/io'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {paginate} from '../../utils/paginate';
import Pagination from '../Pagination';
import TeamRow from './TeamRow';



const NewsManagment = () => {

    const pageSize = 5;
    const [currentPage, setCurrentPage] = useState<number>(1);

    const EQUIPOS_API_BASE_URL = 'http://localhost:8080/api/v1/equipos';
    const [equipos, setEquipos] = useState<any[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    }

    const pagianteEquipos = paginate(equipos, currentPage, pageSize);
    
    useEffect(() => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + localStorage.getItem('token'),
        };
        const getEquipos = async () => {
            setLoading(true);
            try
            {
                const response = await axios.get(EQUIPOS_API_BASE_URL, {headers: headers});
                const data = await response.data.data;
                setEquipos(data);
                
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        }
        getEquipos();
        
    }, []);

    const deleteEquipos = (e: React.MouseEvent, id:number) => {
        e.preventDefault();
        axios.delete(EQUIPOS_API_BASE_URL + "/" + id,{                    
            headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + localStorage.getItem('token'),
        },})
        .then((res) => {
          if (equipos) {
            setEquipos((prevElement) => {
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

        <h2 className="text-black text-2xl">Gestión de Equipos</h2>
        <hr className="border-black w-[100%] mb-5 m-auto"/>

        <Link href="/Equipos/Crear" title='Crear Equipo' className='flex w-7 ml-auto' >
            <IoIosAddCircleOutline className="text-gray-500 hover:text-gray-800 w-7 h-7 mb-0.5"/>
        </Link>

        <div className="flex shadow border-b">
            <table className="min-w-full">
                
                <thead className="bg-red-500 border-b">
                    <tr>
                        <th className="text-left font-medium text-white uppercase tracking-wide py-3 px-6">
                            Logo
                        </th>
                        <th className="text-left font-medium text-white uppercase tracking-wide py-3 px-6">
                            Nombre
                        </th>
                        <th className="text-left font-medium text-white uppercase tracking-wide py-3 px-6">
                            Twitter
                        </th>
                        <th className="text-right font-medium text-white uppercase tracking-wide py-3 px-6">
                            Acciones
                        </th>
                    </tr>
                </thead>
                
                {!loading && (
                    <tbody className="bg-gray-50">
                            {pagianteEquipos?.map((equipo:{id: number,logo: string,nombre: string, twitter:string }) => (
                                <TeamRow key={equipo.id} equipo={equipo} deleteEquipo={deleteEquipos}/>
                            ))}
                    </tbody>
                )}
            </table>

        </div>
        <Pagination
                items={ equipos == null ? 0 : equipos.length}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
    </div>
  )
}

export default NewsManagment