"use client";
import { getRequest, putRequest } from "@/app/(utils)/api";
import Cabecera from "@/app/components/Cabecera";
import Loading from "@/app/components/Loading";
import SimpleTable from "@/app/components/SimpleTable";
import VolverButton from "@/app/components/volverBtn";
import { Miembro } from "@/app/logic/types";
import { createColumnHelper } from "@tanstack/react-table";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

const page = () => {
    type Miembros = Miembro[];

    const columnHelper = createColumnHelper<Miembro>();
    const columnsMiembrosSinEquipo = [
        {
            header: "Nombre",
            accessorKey: "nombre",
        },
        {
            header: "Usuario",
            accessorKey: "username",
        },
        {
            header: "Email",
            accessorKey: "email",
        },
        columnHelper.accessor("id", {
            cell: (id: any) => (
                <div className="flex gap-3 justify-end">
                    <button
                        onClick={() => {
                            handleConfirm(id.getValue());
                        }}
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
                    >
                        Añadir a Equipo
                    </button>
                </div>
            ),
            header: () => <div className="flex justify-end me-8">Acciones</div>,
        }),
    ];

    const columnsMiembrosEquipo = [
        {
            header: "Nombre",
            accessorKey: "nombre",
        },
        {
            header: "Usuario",
            accessorKey: "username",
        },
        {
            header: "Email",
            accessorKey: "email",
        },
        columnHelper.accessor("id", {
            cell: (id: any) => (
                <div className="flex gap-3 justify-end">
                    <button
                        onClick={() => {
                            handleDelete(id.getValue());
                        }}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
                    >
                        Eliminar del Equipo
                    </button>
                </div>
            ),
            header: () => <div className="flex justify-end me-4">Acciones</div>,
        }),
    ];

    const [miembrosSinEquipo, setMiembrosSinEquipo] = React.useState<
        Miembros | []
    >([]);
    const [miembrosEquipo, setMiembrosEquipo] = React.useState<Miembros | []>(
        []
    );
    const [loading, setLoading] = React.useState<boolean>(false);

    const handleConfirm = async (id: number) => {
        try {
            const response = await putRequest(
                `usuarios/aniadirmiembro/${id}`,
                {}
            );
            if (response.data.success) {
                toast.success("Miembro añadido al equipo.");
                getMiembrosSinEquipo();
                getMiembrosEquipo();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            const response = await putRequest(
                `usuarios/eliminarmiembro/${id}`,
                {}
            );
            if (response.data.success) {
                toast.success("Miembro eliminado del equipo.");
                getMiembrosSinEquipo();
                getMiembrosEquipo();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getMiembrosSinEquipo = async () => {
        setLoading(true);

        try {
            const response = await getRequest("usuarios/miembrossinequipo");
            if (response.data.success) {
                setMiembrosSinEquipo(response.data.data);
            }
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    const getMiembrosEquipo = async () => {
        setLoading(true);

        try {
            const response = await getRequest("equipos/miembros");
            if (response.data.success) {
                setMiembrosEquipo(response.data.data);
            }
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        getMiembrosSinEquipo();
        getMiembrosEquipo();
    }, []);

    return (
        <div className="mt-[20px]  px-24">
            {loading ? (
                <Loading />
            ) : (
                <div className="overflow-hidden">
                    <div>
                        <Cabecera
                            titulo="Miembros sin Equipo"
                            subtitulo="Añade miembros al equipo."
                        />
                        <div className="mt-5">
                            <VolverButton />
                        </div>
                        <SimpleTable
                            data={miembrosSinEquipo}
                            columns={columnsMiembrosSinEquipo}
                            urlAniadir=""
                            txtAniadir=""
                        />
                    </div>
                    <div className="my-10">
                        <Cabecera
                            titulo="Miembros del Equipo"
                            subtitulo="Elimina miembros al equipo."
                        />
                        <SimpleTable
                            data={miembrosEquipo}
                            columns={columnsMiembrosEquipo}
                            urlAniadir=""
                            txtAniadir=""
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default page;
