"use client";
import React, { useState } from "react";
import PaginationComponent from "@/app/Circuitos/Gestion/(components)/pagination";
import Loading from "@/app/components/Loading";
import Link from "next/link";

import toast from "react-hot-toast";
import { deleteRequest } from "@/app/(utils)/api";

const IMAGE_BASE_URL =
    "https://pxfvrkflonlookyusxtb.supabase.in/storage/v1/object/public/Images/";

interface Coches {
    id: number;
    nombre: string;
    codigo: number;
    imagen: string;
    erscurvaLenta: number;
    erscurvaMedia: number;
    erscurvaRapida: number;
    consumo: number;
    equipo: {
        id: number;
        nombre: string;
    };
}

function PaginatedItems({ coches }: { coches: Coches[] | null }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    if (!coches) {
        return <Loading />;
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = coches?.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(coches?.length / itemsPerPage);

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
                coches={currentItems}
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
    coches,
    onChange,
}: {
    coches: any[] | null;
    onChange: any;
    onSearch: any;
}) {
    const handleDelete = async (id: number) => {
        if (confirm("¿Estás seguro de que quieres eliminar este coche?")) {
            const response = await deleteRequest(`coche/${id}`);

            if (response.data.success) {
                toast.success(response.data.message, { duration: 4000 });
                window.location.href = "/Equipos/Coches";
            } else {
                toast.error(response.data.message);
            }
        }
    };

    return (
        <div className="mx-4 mt-4">
            <div className="flex justify-between items-center w-full bg-gray-200 p-2 mb-2 rounded-lg ">
                <Link
                    href="/Equipos/Coches/Crear"
                    className="bg-gray-800 hover:bg-gray-950 text-white font-bold py-2 px-4 rounded-lg"
                >
                    Crear nuevo coche
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
                <table className="w-full text-sm text-left rtl:text-right text-gray-800 border ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-200 ">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Imagen
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Nombre
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Equipo
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Código
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Consumo
                            </th>
                            <th scope="col" className="px-6 py-3">
                                ERS-CurvaLenta
                            </th>
                            <th scope="col" className="px-6 py-3">
                                ERS-CurvaMedia
                            </th>
                            <th scope="col" className="px-6 py-3">
                                ERS-CurvaRápida
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {coches?.length === 0 && (
                            <tr className="bg-white border-b hover:bg-gray-50">
                                <td
                                    className="px-6 py-4 whitespace-nowrap"
                                    colSpan={7}
                                >
                                    No hay coches para mostrar
                                </td>
                            </tr>
                        )}
                        {coches?.map((coches) => (
                            <tr
                                className="bg-white border-b  hover:bg-gray-50 "
                                key={coches.id}
                            >
                                <td className="px-6 py-4 whitespace-nowrap h-32">
                                    <img
                                        src={IMAGE_BASE_URL + coches.imagen}
                                        alt="Trazado"
                                        className="w-40 rounded-lg h-32 object-cover"
                                        onError={(e) => {
                                            e.currentTarget.src =
                                                "https://via.placeholder.com/150";
                                        }}
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">
                                        {coches.nombre}
                                    </div>
                                </td>
                                <td className="px-6 py-4 ">
                                    <div className="text-sm text-gray-900">
                                        {coches.equipo.nombre}
                                    </div>
                                </td>
                                <td className="px-6 py-4 ">
                                    <div className="text-sm text-gray-900">
                                        {coches.codigo}
                                    </div>
                                </td>
                                <td className="px-6 py-4 ">
                                    <div className="text-sm text-gray-900">
                                        {coches.consumo}
                                    </div>
                                </td>
                                <td className="px-6 py-4 ">
                                    <div className="text-sm text-gray-900">
                                        {coches.erscurvaLenta}
                                    </div>
                                </td>
                                <td className="px-6 py-4 ">
                                    <div className="text-sm text-gray-900">
                                        {coches.erscurvaMedia}
                                    </div>
                                </td>
                                <td className="px-6 py-4 ">
                                    <div className="text-sm text-gray-900">
                                        {coches.erscurvaRapida}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <Link
                                            href={`/Equipos/Coches/Editar/${coches.id}`}
                                            className="bg-gray-800 hover:bg-gray-950 text-white font-bold py-2 px-4 rounded-lg"
                                        >
                                            Editar
                                        </Link>
                                        <button
                                            onClick={() => {
                                                handleDelete(coches.id);
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
