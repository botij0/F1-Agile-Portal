"use client";
import { deleteRequest, getRequest } from "@/app/(utils)/api";
import Cabecera from "@/app/components/Cabecera";
import Loading from "@/app/components/Loading";
import SimpleTable from "@/app/components/SimpleTable";
import VolverButton from "@/app/components/volverBtn";
import { createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
import React from "react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function NoticiasGestionPage() {
    type Noticia = {
        id: number;
        titulo: string;
        texto: string;
    };
    type Noticias = Noticia[];

    const columnHelper = createColumnHelper<Noticia>();
    const columns = [
        {
            header: "Título",
            accessorKey: "titulo",
        },
        columnHelper.accessor("texto", {
            cell: (texto: any) => (
                <span title={texto.getValue()}>
                    {texto.getValue().slice(0, 50) + "..."}
                </span>
            ),
            header: "Texto",
        }),
        columnHelper.accessor("id", {
            cell: (id: any) => (
                <div className="flex gap-3">
                    <Link
                        href={"/Noticias/Noticia/" + id.getValue()}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                    >
                        Ver
                    </Link>
                    <Link
                        href={"/Noticias/Editar/" + id.getValue()}
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

    const [noticias, setNoticias] = useState<Noticias | []>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const getNoticias = async () => {
        setLoading(true);
        try {
            const response = await getRequest("noticias");
            setNoticias(response.data);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

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

    useEffect(() => {
        getNoticias();
    }, []);

    return (
        <div className="overflow-x-auto px-24">
            <Cabecera
                titulo="Gestión de Noticias"
                subtitulo="Añade, modifica o elimina noticias."
            />
            <div className="mt-5">
                <VolverButton />
            </div>
            {loading ? (
                <Loading />
            ) : (
                <div className="overflow-hidden">
                    <SimpleTable
                        data={noticias}
                        columns={columns}
                        txtAniadir="Crear Noticia"
                        urlAniadir="/Noticias/Crear"
                    />
                </div>
            )}
        </div>
    );
}
