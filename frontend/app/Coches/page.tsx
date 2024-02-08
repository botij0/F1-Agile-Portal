"use client";
import React from "react";
import { useEffect, useState } from "react";
import Loading from "@/app/components/Loading";
import Cabecera from "@/app/components/Cabecera";
import { deleteRequest, getRequest } from "@/app/(utils)/api";
import { createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
import toast from "react-hot-toast";
import SimpleTable from "@/app/components/SimpleTable";
import Constantes from "@/app/(utils)/constantes";
import VolverButton from "@/app/components/volverBtn";
const CochesGestionPage = () => {
    type Coche = {
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
    };
    type Coches = Coche[];
    const columnHelper = createColumnHelper<Coche>();
    const columns = [
        columnHelper.accessor("imagen", {
            cell: (imagen: any) => (
                <img
                    src={Constantes.IMAGE_BASE_URL + imagen.getValue()}
                    alt="Imagen"
                    className="w-40 rounded-lg h-32 object-cover"
                    onError={(e) => {
                        e.currentTarget.src = "https://via.placeholder.com/150";
                    }}
                />
            ),
            header: "Imagen",
        }),
        {
            header: "Nombre",
            accessorKey: "nombre",
        },
        {
            header: "Equipo",
            accessorKey: "equipo.nombre",
        },
        {
            header: "Código",
            accessorKey: "codigo",
        },
        {
            header: "Consumo",
            accessorKey: "consumo",
        },
        {
            header: "ERS Curva Lenta",
            accessorKey: "erscurvaLenta",
        },
        {
            header: "ERS Curva Media",
            accessorKey: "erscurvaMedia",
        },
        {
            header: "ERS Curva Rápida",
            accessorKey: "erscurvaRapida",
        },
        columnHelper.accessor("id", {
            cell: (id: any) => (
                <div className="flex gap-3 justify-end">
                    <Link
                        href={"/Coches/Editar/" + id.getValue()}
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
            header: () => (
                <div className="flex justify-end me-16">Acciones</div>
            ),
        }),
    ];

    const [coches, setCoches] = useState<Coches | []>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const handleDelete = async (id: number) => {
        if (confirm("¿Estás seguro de que quieres eliminar este coche?")) {
            const response = await deleteRequest(`coches/${id}`);

            if (response.data.success) {
                toast.success(response.data.message, { duration: 4000 });
                window.location.href = "/Equipos/Coches";
            } else {
                toast.error(response.data.message);
            }
        }
    };

    const getCoches = async () => {
        setLoading(true);
        try {
            const response = await getRequest("coches");
            setCoches(response.data.data);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        getCoches();
    }, []);

    return (
        <div className=" overflow-x-auto px-24">
            <Cabecera
                titulo="Gestión de Coches"
                subtitulo="Aquí puedes gestionar los coches"
            />
            <div className="mt-5">
                <VolverButton />
            </div>
            {loading ? (
                <Loading />
            ) : (
                <div className="overflow-hidden">
                    <SimpleTable
                        data={coches}
                        columns={columns}
                        urlAniadir="/Coches/Crear"
                        txtAniadir="Crear Coche"
                    />
                </div>
            )}
        </div>
    );
};
export default CochesGestionPage;
