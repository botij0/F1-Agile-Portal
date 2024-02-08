"use client";
import React from "react";
import { useEffect, useState } from "react";
import Loading from "@/app/components/Loading";
import Cabecera from "@/app/components/Cabecera";
import { deleteRequest, getRequest } from "@/app/(utils)/api";
import { createColumnHelper } from "@tanstack/react-table";
import Constantes from "@/app/(utils)/constantes";
import SimpleTable from "@/app/components/SimpleTable";
import Link from "next/link";
import toast from "react-hot-toast";
import VolverButton from "@/app/components/volverBtn";
const CircuitosGestionPage = () => {
    type Circuito = {
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
    };
    type Circuitos = Circuito[];

    const columnHelper = createColumnHelper<Circuito>();
    const columns = [
        columnHelper.accessor("trazado", {
            cell: (trazado: any) => (
                <img
                    src={Constantes.IMAGE_BASE_URL + trazado.getValue()}
                    alt="Trazado"
                    className="w-40 rounded-lg h-32 object-cover"
                    onError={(e) => {
                        e.currentTarget.src = "https://via.placeholder.com/150";
                    }}
                />
            ),
            header: "Trazado",
        }),
        {
            header: "Nombren del Circuito",
            accessorKey: "nombre",
        },
        columnHelper.accessor("pais", {
            cell: (pais: any) => (
                <div className="flex items-center gap-2">
                    <img
                        className="w-8 rounded "
                        src={`https://flagcdn.com/w320/${pais
                            .getValue()
                            ?.toLowerCase()}.png`}
                        width="30"
                        alt="Flag"
                    />
                    {pais.row.original.paisNombre}
                </div>
            ),
            header: "País",
        }),
        {
            header: "Ubicación",
            accessorFn: (row: { ciudad: any; paisNombre: any }) =>
                `${row.ciudad}, ${row.paisNombre}`,
        },
        {
            header: "Temporadas",
            accessorKey: "temporadasInterv",
        },
        {
            header: "Ediciones",
            accessorKey: "temporadas",
        },
        columnHelper.accessor("id", {
            cell: (id: any) => (
                <div className="flex gap-3">
                    <Link
                        href={"/Circuitos/Ver/" + id.getValue()}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                    >
                        Ver
                    </Link>
                    <Link
                        href={"/Circuitos/Gestion/Editar/" + id.getValue()}
                        className="bg-gray-800 hover:bg-gray-950 text-white font-bold py-2 px-4 rounded-lg"
                    >
                        Editar
                    </Link>
                    <button
                        onClick={() => {
                            handleDelete(id.getValue());
                        }}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
                    >
                        Eliminar
                    </button>
                </div>
            ),
            header: "Acciones",
        }),
    ];

    const [circuitos, setCircuitos] = useState<Circuitos | []>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const getCircuitos = async () => {
        setLoading(true);
        try {
            const response = await getRequest("circuitos");
            console.log(response.data.data);
            setCircuitos(response.data.data);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

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

    useEffect(() => {
        getCircuitos();
    }, []);

    return (
        <div className=" overflow-x-auto mt-[20px] px-24">
            <Cabecera
                titulo="Gestión de Circuitos"
                subtitulo="Aquí puedes gestionar los circuitos"
            />
            <div className="mt-5">
                <VolverButton />
            </div>
            {loading ? (
                <Loading />
            ) : (
                <div className="overflow-hidden">
                    <SimpleTable
                        data={circuitos}
                        columns={columns}
                        urlAniadir="/Circuitos/Gestion/Crear"
                        txtAniadir="Crear Circuito"
                    />
                </div>
            )}
        </div>
    );
};
export default CircuitosGestionPage;
