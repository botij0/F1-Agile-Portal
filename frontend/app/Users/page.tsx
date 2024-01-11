"use client";
import React, { useEffect } from "react";
import UsersManagment from "@/app/components/Users/UsersManagment";
import { deleteRequest, getRequest } from "../(utils)/api";
import Cabecera from "../components/Cabecera";
import Loading from "../components/Loading";
import PaginatedItems from "../components/Equipos/tablaCoches";
import Link from "next/link";
import toast from "react-hot-toast";
import SimpleTable from "../components/SimpleTable";

export default function UsuariosGestion() {
    type User = {
        id: number;
        nombre: string;
        email: string;
        usuario: string;
        rol: string;
    };
    type Users = User[];

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
        <div className="relative overflow-x-auto mt-[20px] container mx-auto">
            <Cabecera
                titulo="Gestión de Usuarios"
                subtitulo="Añade, modifica o elimina usuarios."
            />
            {loading ? (
                <Loading />
            ) : (
                <SimpleTable
                    data={users}
                    columns={columns}
                    urlEditar="/Users/Editar/"
                    fnDelete={handleDelete}
                    urlAniadir="/Users/Register"
                    txtAniadir="Crear Usuario"
                />
            )}
        </div>
    );
}
