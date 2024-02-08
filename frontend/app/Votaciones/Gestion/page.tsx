"use client";
import { deleteRequest, getRequest } from "@/app/(utils)/api";
import Cabecera from "@/app/components/Cabecera";
import Loading from "@/app/components/Loading";
import SimpleTable from "@/app/components/SimpleTable";
import { createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { format } from "date-fns";
import VolverButton from "@/app/components/volverBtn";

export default function Equipos() {
    type Votacion = {
        id: number;
        titulo: string;
        limite: string;
        totalVotos: string;
    };
    type Votaciones = Votacion[];

    const columnHelper = createColumnHelper<Votacion>();
    const columns = [
        {
            header: "Título",
            accessorKey: "titulo",
        },
        columnHelper.accessor("limite", {
            cell: (limite: any) => (
                <div className="flex items-center gap-2">
                    {format(new Date(limite.getValue()), "dd/MM/yyyy hh:mm:ss")}
                </div>
            ),
            header: "Límite",
        }),
        {
            header: "Total de Votos",
            accessorKey: "totalVotos",
        },
        columnHelper.accessor("id", {
            cell: (id: any) => (
                <div className="flex gap-3 justify-end">
                    <Link
                        href={"/Votaciones/" + id.getValue()}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                    >
                        Ver
                    </Link>
                    <Link
                        href={"/Votaciones/Editar/" + id.getValue()}
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
    const [votaciones, setVotaciones] = useState<Votaciones | []>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const getVotaciones = async () => {
        setLoading(true);
        try {
            const response = await getRequest("votaciones");
            console.log(response.data.content);
            setVotaciones(response.data.content);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    const handleDelete = async (id: number) => {
        if (confirm("¿Estás seguro de que quieres eliminar esta votación?")) {
            const response = await deleteRequest(`votaciones/${id}`);

            if (response.data.success) {
                toast.success(response.data.message, { duration: 4000 });
                window.location.href = "/Votaciones/Gestion";
            } else {
                toast.error(response.data.message);
            }
        }
    };

    useEffect(() => {
        getVotaciones();
    }, []);

    return (
        <div className="overflow-x-auto mt-[20px] px-24">
            <Cabecera
                titulo="Gestión de Votaciones"
                subtitulo="Aquí puedes gestionar las votaciones"
            />
            <div className="mt-5">
                <VolverButton />
            </div>
            {loading ? (
                <Loading />
            ) : (
                <div className="overflow-hidden">
                    <SimpleTable
                        data={votaciones}
                        columns={columns}
                        urlAniadir="/Votaciones/Crear"
                        txtAniadir="Crear Votación"
                    />
                </div>
            )}
        </div>
    );
}
