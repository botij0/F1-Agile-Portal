"use client";
import { deleteRequest, getRequest } from "@/app/(utils)/api";
import Cabecera from "@/app/components/Cabecera";
import Loading from "@/app/components/Loading";
import SimpleTable from "@/app/components/SimpleTable";
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

    const columns = [
        {
            header: "Título",
            accessorKey: "titulo",
        },
        {
            header: "Texto",
            accessorKey: "texto",
            accessorFn: (texto: any) => texto.texto.slice(0, 50) + "...",
        },
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
        <div className="relative overflow-x-auto mt-[20px] container mx-auto">
            <Cabecera
                titulo="Gestión de Noticias"
                subtitulo="Añade, modifica o elimina noticias."
            />
            {loading ? (
                <Loading />
            ) : (
                <SimpleTable
                    data={noticias}
                    columns={columns}
                    fnDelete={handleDelete}
                    txtAniadir="Crear Noticia"
                    urlAniadir="/Noticias/Crear"
                    urlEditar="/Noticias/Editar/"
                />
            )}
        </div>
    );
}
