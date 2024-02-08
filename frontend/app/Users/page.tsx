"use client";
import React, { useEffect } from "react";
import { deleteRequest, getRequest } from "../(utils)/api";
import Cabecera from "../components/Cabecera";
import Loading from "../components/Loading";
import toast from "react-hot-toast";
import SimpleTable from "../components/SimpleTable";
import { createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
import VolverButton from "@/app/components/volverBtn";

export default function UsuariosGestion() {
    type User = {
        id: number;
        nombre: string;
        email: string;
        usuario: string;
        rol: string;
    };
    type Users = User[];

    const urlEditar = "/Users/Editar/";

    const columnHelper = createColumnHelper<User>();
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
        {
            header: "Rol",
            accessorKey: "rol",
        },
        columnHelper.accessor("id", {
            cell: (id: any) => (
                <div className="flex gap-3 justify-end">
                    <Link
                        href={urlEditar + id.getValue()}
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

    const [users, setUsers] = React.useState<Users | []>([]);
    const [loading, setLoading] = React.useState<boolean>(false);

    const getUsers = async () => {
        setLoading(true);
        try {
            const response = await getRequest("usuarios");
            setUsers(response.data.data);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    function handleDelete(id: any) {
        if (confirm("¿Estás seguro de que quieres eliminar este usuario?")) {
            deleteRequest("usuarios/" + id).then((response) => {
                console.log(response);
                if (response.status === 200) {
                    toast.success(response.data.message, { duration: 4000 });
                    getUsers();
                } else {
                    toast.error(response.data.message);
                }
            });
        }
    }

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div className="overflow-x-auto  px-24">
            <Cabecera
                titulo="Gestión de Usuarios"
                subtitulo="Añade, modifica o elimina usuarios."
            />
            <div className="mt-5">
                <VolverButton />
            </div>
            {loading ? (
                <Loading />
            ) : (
                <div className="overflow-hidden">
                    <SimpleTable
                        data={users}
                        columns={columns}
                        urlAniadir="/Users/Register"
                        txtAniadir="Crear Usuario"
                    />
                </div>
            )}
        </div>
    );
}
