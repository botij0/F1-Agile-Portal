"use client";
import React, { useState } from "react";
import PaginationComponent from "./pagination";
import Loading from "@/app/components/Loading";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { deleteRequest } from "@/app/(utils)/api";

const IMAGE_BASE_URL =
    "https://pxfvrkflonlookyusxtb.supabase.in/storage/v1/object/public/Images/";

interface Circuitos {
    id: number;
    nombre: string;
    ciudad: string;
    pais: string;
    trazado: string;
    paisNombre: string;
    temporadasInterv: string;
    granPremio: string;
    temporadas: number;
    carreras: [];
}

function PaginatedItems({ circuitos }: { circuitos: Circuitos[] | null }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    if (!circuitos) {
        return <Loading />;
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = circuitos?.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(circuitos?.length / itemsPerPage);

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
                circuitos={currentItems}
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
    circuitos,
    onChange,
}: {
    circuitos: any[] | null;
    onChange: any;
    onSearch: any;
}) {
    const handleDelete = async (id: number) => {
        if (confirm("¿Estás seguro de que quieres eliminar este circuito?")) {
            const response = await deleteRequest(`circuitos/${id}`);

            if (response.data.success) {
                toast.success(response.data.message, { duration: 4000 });
                window.location.href = "/Circuitos/Gestion";
            } else {
                toast.error(response.data.message);
            }
        }
    };

    return (
        <div className="mx-4 mt-4">
            <div className="flex justify-between items-center w-full bg-gray-100 p-2 mb-2 rounded-lg ">
                <Link
                    href="/Circuitos/Gestion/Crear"
                    className="bg-gray-800 hover:bg-gray-950 text-white font-bold py-2 px-4 rounded-lg"
                >
                    Crear nuevo circuito
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
                        <option value="4">10</option>
                        <option value="6">20</option>
                    </select>
                </div>
            </div>
            <div className="rounded-lg overflow-hidden">
                <table className="w-full text-sm text-left rtl:text-right text-gray-800 border ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-200 ">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Trazado
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Nombre del circuito
                            </th>
                            <th scope="col" className="px-6 py-3">
                                País
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Ubicación
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Temporadas
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Ediciones
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {circuitos?.length === 0 && (
                            <tr className="bg-white border-b hover:bg-gray-50">
                                <td
                                    className="px-6 py-4 whitespace-nowrap"
                                    colSpan={7}
                                >
                                    No hay circuitos para mostrar
                                </td>
                            </tr>
                        )}
                        {circuitos?.map((circuito) => (
                            <tr
                                className="bg-white border-b  hover:bg-gray-50 "
                                key={circuito.id}
                            >
                                <td className="px-6 py-4 whitespace-nowrap h-32">
                                    <img
                                        src={IMAGE_BASE_URL + circuito.trazado}
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
                                        {circuito.nombre}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {circuito.granPremio}
                                    </div>
                                </td>
                                <td className="px-6 py-4 ">
                                    <div className="flex items-center gap-2">
                                        <img
                                            className="w-8 rounded "
                                            src={`https://flagcdn.com/w320/${circuito.pais?.toLowerCase()}.png`}
                                            width="30"
                                            alt="Flag"
                                        />
                                        {circuito.paisNombre}
                                    </div>
                                </td>
                                <td className="px-6 py-4 ">
                                    {circuito.ciudad}, {circuito.paisNombre}
                                </td>
                                <td className="px-6 py-4">
                                    {circuito.temporadasInterv}
                                </td>
                                <td className="px-6 py-4">
                                    {circuito.temporadas}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <Link
                                            href={`/Circuitos/Ver/${circuito.id}`}
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                                        >
                                            Ver
                                        </Link>
                                        <Link
                                            href={`/Circuitos/Gestion/Editar/${circuito.id}`}
                                            className="bg-gray-800 hover:bg-gray-950 text-white font-bold py-2 px-4 rounded-lg"
                                        >
                                            Editar
                                        </Link>
                                        <button
                                            onClick={() => {
                                                handleDelete(circuito.id);
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
