"use client";

import Link from "next/link";
import NoticiaMng from "@/app/components/Noticias/NoticiaMng";
import React, { useEffect, useState } from "react";
import { paginate } from "@/app/utils/paginate";
import Pagination from "@/app/components/Pagination";
import { getRequest, deleteRequest } from "@/app/(utils)/api";
import Loading from "@/app/components/Loading";

import toast from "react-hot-toast";
import PaginationComponent from "@/app/Circuitos/Gestion/(components)/pagination";

interface Noticia {
    id: number;
    titulo: string;
    texto: string;
}

function PaginatedItems({ noticias }: { noticias: Noticia[] | null }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    if (!noticias) {
        return <Loading />;
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = noticias?.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(noticias?.length / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div>
            <TableComponent
                onSearch={(search: string) => {
                    console.log(search);
                }}
                noticias={currentItems}
                onChange={setItemsPerPage}
            />
            <PaginationComponent
                currentPage={currentPage}
                totalPages={totalPages}
                handlePrevPage={handlePrevPage}
                handleNextPage={handleNextPage}
            />
        </div>
    );
}

function TableComponent({
    noticias,
    onChange,
}: {
    noticias: any[] | null;
    onChange: any;
    onSearch: any;
}) {
    const handleDelete = async (id: number) => {
        if (confirm("¿Estás seguro de que quieres eliminar esta noticia?")) {
            const response = await deleteRequest(`noticias/${id}`);
            if (response.data) {
                toast.success(response.data.message, { duration: 4000 });
                window.location.href = "/Noticias/Gestion";
            } else {
                toast.error(response.data.message);
            }
        }
    };

    return (
        <div className="my-3">
            <div className="flex justify-between items-center w-full bg-gray-200 p-2 mb-2 rounded-lg ">
                <Link
                    href="/Noticias/Crear"
                    title="Crear Noticia"
                    className="bg-gray-800 hover:bg-gray-950 text-white font-bold py-2 px-4 rounded-lg"
                >
                    Crear nueva noticia
                </Link>

                <div className="flex justify-center items-center gap-2">
                    <label htmlFor="itemsPerPage">Items por página:</label>
                    <select
                        name="itemsPerPage"
                        id="itemsPerPage"
                        onChange={(e) => onChange(e.target.value)}
                        className="border rounded-lg p-2"
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                    </select>
                </div>
            </div>

            <div className="rounded-lg overflow-hidden">
                <table className="w-full text-sm text-left rtl:text-right text-gray-800 border">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                        <tr>
                            <th className="py-3 px-6">Titulo</th>
                            <th className="py-3 px-6">Texto</th>
                            <th className="py-3 px-6">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-50">
                        {noticias?.length === 0 && (
                            <tr className="bg-white border-b hover:bg-gray-50">
                                <td
                                    className="px-6 py-4 whitespace-nowrap"
                                    colSpan={7}
                                >
                                    No hay coches para mostrar
                                </td>
                            </tr>
                        )}
                        {noticias?.map((noticia) => (
                            <tr
                                className="bg-white border-b  hover:bg-gray-50 "
                                key={noticia.id}
                            >
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">
                                        {noticia.titulo}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">
                                        <span title={noticia.texto}>
                                            {noticia.texto.slice(0, 50) + "..."}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <Link
                                            href={`/Noticias/Editar/${noticia.id}`}
                                            className="bg-gray-800 hover:bg-gray-950 text-white font-bold py-2 px-4 rounded-lg"
                                        >
                                            Editar
                                        </Link>
                                        <button
                                            onClick={() => {
                                                handleDelete(noticia.id);
                                            }}
                                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PaginatedItems;
