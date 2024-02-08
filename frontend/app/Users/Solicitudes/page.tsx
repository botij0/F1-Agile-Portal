"use client";
import { deleteRequest, getRequest, putRequest } from "@/app/(utils)/api";
import Cabecera from "@/app/components/Cabecera";
import Loading from "@/app/components/Loading";
import SimpleTable from "@/app/components/SimpleTable";
import VolverButton from "@/app/components/volverBtn";
import { createColumnHelper } from "@tanstack/react-table";
import { useEffect, useState } from "react";

export default function Solicitudes() {
    type Solicitud = {
        id: number;
        username: string;
        email: string;
        nombre: string;
    };
    type Solicitudes = Solicitud[];

    const columnHelper = createColumnHelper<Solicitud>();
    const columns = [
        {
            header: "Nombre de usuario",
            accessorKey: "username",
        },
        {
            header: "Email",
            accessorKey: "email",
        },
        {
            header: "Nombre",
            accessorKey: "nombre",
        },
        columnHelper.accessor("id", {
            cell: (id: any) => (
                <div className="flex justify-end gap-2">
                    <button
                        type="button"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                        onClick={(e) => updateAdmin(e, id.getValue())}
                    >
                        Administrador
                    </button>
                    <button
                        type="button"
                        className="bg-gray-800 hover:bg-gray-950 text-white font-bold py-2 px-4 rounded-lg"
                        onClick={(e) => updateResponsable(e, id.getValue())}
                    >
                        Responsable de equipo
                    </button>
                    <button
                        type="button"
                        onClick={(e) => rechazarSolicitud(e, id.getValue())}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
                    >
                        Rechazar solicitud
                    </button>
                </div>
            ),
            header: () => (
                <div className="flex justify-end me-16">Acciones</div>
            ),
        }),
    ];

    const [solicitudes, setSolicitudes] = useState<Solicitudes | []>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const getSolicitudes = async () => {
        setLoading(true);
        try {
            const response = await getRequest("usuarios/solicitudes");
            setSolicitudes(response.data.data);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    const rechazarSolicitud = (e: React.MouseEvent, id: number) => {
        e.preventDefault();
        deleteRequest("usuarios/" + id).then((res) => {
            window.location.href = "/Users/Solicitudes";
        });
    };

    const updateResponsable = (e: React.MouseEvent, id: number) => {
        e.preventDefault();
        putRequest("usuarios/solicitudes/responsable/" + id, id).then((res) => {
            window.location.href = "/Users/Solicitudes";
        });
    };

    const updateAdmin = (e: React.MouseEvent, id: number) => {
        e.preventDefault();
        putRequest("usuarios/solicitudes/admin/" + id, id).then((res) => {
            window.location.href = "/Users/Solicitudes";
        });
    };

    useEffect(() => {
        getSolicitudes();
    }, []);

    return (
        <div className="overflow-x-auto px-24">
            <Cabecera
                titulo="Gestión de Solicitudes"
                subtitulo="Aquí puedes gestionar las solicitudes de los usuarios"
            />
            <div className="mt-5">
                <VolverButton />
            </div>
            {loading ? (
                <Loading />
            ) : (
                <div className="overflow-hidden">
                    <SimpleTable
                        data={solicitudes}
                        columns={columns}
                        urlAniadir=""
                        txtAniadir=""
                    />
                </div>
            )}
        </div>
    );
}
