"use client";
import React, { useEffect, useState } from "react";
import { Equipo } from "@/app/logic/types";
import { createColumnHelper } from "@tanstack/react-table";
import Constantes from "@/app/(utils)/constantes";
import Link from "next/link";
import { deleteRequest, getRequest } from "@/app/(utils)/api";
import toast from "react-hot-toast";
import Cabecera from "@/app/components/Cabecera";
import Loading from "@/app/components/Loading";
import SimpleTable from "@/app/components/SimpleTable";
import VolverButton from "@/app/components/volverBtn";

export default function DefaultTable() {
    type Piloto = {
        id: number;
        nombre: string;
        apellidos: string;
        dorsal: number;
        pais: string;
        siglas: string;
        twitter: string;
        coche: number;
        equipo: Equipo;
        foto: string;
    };
    type Pilotos = Piloto[];

    const columnHelper = createColumnHelper<Piloto>();
    const columns = [
        columnHelper.accessor("foto", {
            cell: (foto: any) => (
                <img
                    src={Constantes.IMAGE_BASE_URL + foto.getValue()}
                    alt="foto"
                    className="w-20 h-16 rounded-full"
                />
            ),
            header: "Foto",
        }),
        {
            header: "Nombre",
            accessorKey: "nombre",
        },
        {
            header: "Apellidos",
            accessorKey: "apellidos",
        },
        {
            header: "Dorsal",
            accessorKey: "dorsal",
        },
        columnHelper.accessor("pais", {
            cell: (pais: any) => (
                <img
                    className="w-8 rounded "
                    src={`https://flagcdn.com/w320/${pais
                        .getValue()
                        ?.toLowerCase()}.png`}
                    width="30"
                    alt="Flag"
                />
            ),
            header: "País",
        }),
        {
            header: "Siglas",
            accessorKey: "siglas",
        },
        {
            header: "Twitter",
            accessorKey: "twitter",
        },
        {
            header: "Equipo",
            accessorKey: "equipo.nombre",
        },
        columnHelper.accessor("id", {
            cell: (id: any) => (
                <div className="flex gap-3 justify-end">
                    <Link
                        href={"/Pilotos/Detalles/" + id.getValue()}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                    >
                        Ver
                    </Link>
                    <a
                        href={"/Pilotos/Gestion/Editar/" + id.getValue()}
                        className="bg-gray-800 hover:bg-gray-950 text-white font-bold py-2 px-4 rounded-lg"
                    >
                        Editar
                    </a>
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
    const [pilotos, setPilotos] = useState<Pilotos | []>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const getPilotos = async () => {
        setLoading(true);
        try {
            const response = await getRequest("pilotos");
            const data = await response.data;
            setPilotos(data.data);
            console.log(data.data);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    const handleDelete = async (id: number) => {
        if (confirm("¿Estás seguro de que quieres eliminar este piloto?")) {
            const response = await deleteRequest(`pilotos/${id}`);

            if (response.data.success) {
                toast.success(response.data.message, { duration: 4000 });
                window.location.href = "/Pilotos/Gestion";
            } else {
                toast.error(response.data.message);
            }
        }
    };

    useEffect(() => {
        getPilotos();
    }, []);

    return (
        <div className=" overflow-x-auto mt-[20px] px-24">
            <Cabecera
                titulo="Gestión de Pilotos"
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
                        data={pilotos}
                        columns={columns}
                        urlAniadir="/Pilotos/Gestion/Crear"
                        txtAniadir="Crear Piloto"
                    />
                </div>
            )}
        </div>
    );
}
