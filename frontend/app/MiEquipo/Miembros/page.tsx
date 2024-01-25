"use client";
import { getRequest } from "@/app/(utils)/api";
import Cabecera from "@/app/components/Cabecera";
import Loading from "@/app/components/Loading";
import SimpleTable from "@/app/components/SimpleTable";
import { Miembro } from "@/app/logic/types";
import { createColumnHelper } from "@tanstack/react-table";
import React, { useEffect } from "react";

const page = () => {
    type Miembros = Miembro[];

    const columnHelper = createColumnHelper<Miembro>();
    const columns = [
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
            header: () => (
                <div className="flex justify-end me-16">Acciones</div>
            ),
        }),
    ];

    const [miembros, setMiembros] = React.useState<Miembros | []>([]);
    const [loading, setLoading] = React.useState<boolean>(false);

    function handleConfirm(id: number) {
        console.log("Confirmar " + id);
    }

    const getMiembros = async () => {
        setLoading(true);

        try {
            const response = await getRequest("usuarios/miembrossinequipo");
            if (response.data.success) {
                setMiembros(response.data.data);
            }
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        getMiembros();
    }, []);

    return (
        <div className="overflow-x-auto mt-[20px]  px-24">
            <Cabecera
                titulo="Gestión de Miembros"
                subtitulo="Añade, modifica o elimina miembros del equipo."
            />
            {loading ? (
                <Loading />
            ) : (
                <div className="overflow-hidden">
                    <SimpleTable
                        data={miembros}
                        columns={columns}
                        urlAniadir=""
                        txtAniadir=""
                    />
                </div>
            )}
        </div>
    );
};

export default page;
