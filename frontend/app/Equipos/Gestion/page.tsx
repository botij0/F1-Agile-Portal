"use client";
import Cabecera from "@/app/components/Cabecera";
import Link from "next/link";
import Loading from "@/app/components/Loading";
import { useEffect, useState } from "react";
import SimpleTable from "@/app/components/SimpleTable";
import { createColumnHelper } from "@tanstack/react-table";
import Constantes from "@/app/(utils)/constantes";
import { deleteRequest, getRequest } from "@/app/(utils)/api";
import toast from "react-hot-toast";
import VolverButton from "@/app/components/volverBtn";

export default function Equipos() {
    type Equipo = {
        id: number;
        nombre: string;
        logo: string;
        twitter: string;
    };
    type Equipos = Equipo[];

    const columnHelper = createColumnHelper<Equipo>();
    const columns = [
        columnHelper.accessor("logo", {
            cell: (logo: any) => (
                <img
                    src={Constantes.IMAGE_BASE_URL + logo.getValue()}
                    alt="logo"
                    className="w-20 h-16 rounded-full"
                />
            ),
            header: "Logo",
        }),
        {
            header: "Nombre del Equipo",
            accessorKey: "nombre",
        },
        {
            header: "Twitter",
            accessorKey: "twitter",
        },
        columnHelper.accessor("id", {
            cell: (id: any) => (
                <div className="flex gap-3 justify-end">
                    <Link
                        href={"/Equipos/Detalles/" + id.getValue()}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                    >
                        Ver
                    </Link>
                    <Link
                        href={"/Equipos/Editar/" + id.getValue()}
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
                <div className="flex justify-end me-24">Acciones</div>
            ),
        }),
    ];

    const [loading, setLoading] = useState<boolean>(false);
    const [equipos, setEquipos] = useState<Equipos | []>([]);

    const getEquipos = async () => {
        setLoading(true);
        try {
            const response = await getRequest("equipos");
            const data = await response.data.data;
            setEquipos(data);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    const handleDelete = async (id: number) => {
        if (confirm("¿Estás seguro de que quieres eliminar este equipo?")) {
            const response = await deleteRequest(`equipos/${id}`);

            if (response.data.success) {
                toast.success(response.data.message, { duration: 4000 });
                window.location.href = "/Equipos/Gestion";
            } else {
                toast.error(response.data.message);
            }
        }
    };

    useEffect(() => {
        getEquipos();
    }, []);

    return (
        <div className="overflow-x-auto px-24">
            {/* <TeamsMng /> */}
            <Cabecera
                titulo="Gestión de equipos"
                subtitulo="Añade, modifique o elimine equipos"
            />
            <div className="mt-5">
                <VolverButton />
            </div>
            {loading ? (
                <Loading />
            ) : (
                <div className="overflow-hidden">
                    <SimpleTable
                        data={equipos}
                        columns={columns}
                        txtAniadir="Crear Equipo"
                        urlAniadir="/Equipos/Crear"
                    />
                </div>
            )}
        </div>
    );
}
