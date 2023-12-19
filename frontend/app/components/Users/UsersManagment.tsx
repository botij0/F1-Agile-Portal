"use client";

import Link from "next/link";
import { IoIosAddCircleOutline } from "react-icons/io";
import React, { useEffect, useState } from "react";
import { paginate } from "../../utils/paginate";
import Pagination from "../Pagination";
import UserMng from "./UserMng";
import { getRequest, deleteRequest } from "@/app/(utils)/api";

const UsuariosMng = () => {
    const pageSize = 10;
    const [currentPage, setCurrentPage] = useState<number>(1);

    const [usuarios, setUsuarios] = useState<any[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const paginateUsers = paginate(usuarios, currentPage, pageSize);

    useEffect(() => {
        const getUsers = async () => {
            setLoading(true);
            try {
                const response = await getRequest("usuarios");
                const data = await response.data.data;
                setUsuarios(data);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        };
        getUsers();
    }, []);

    const deleteUser = (e: React.MouseEvent, id: number) => {
        e.preventDefault();
        deleteRequest("usuarios/" + id).then((res) => {
            if (usuarios) {
                setUsuarios((prevElement) => {
                    if (prevElement == null) return null;
                    else return prevElement.filter((user) => user.id !== id);
                });
            }
        });
    };

    return (
        <div className="container mx-auto my-8">
            <h2 className="text-black text-2xl">Gestión de Usuarios</h2>
            <hr className="border-black w-[100%] mb-5 m-auto" />

            <Link
                href="/Register"
                title="Crear Noticia"
                className="flex w-7 ml-auto"
            >
                <IoIosAddCircleOutline className="text-gray-500 hover:text-gray-800 w-7 h-7 mb-0.5" />
            </Link>

            <div className="flex shadow border-b">
                <table className="min-w-full">
                    <thead className="bg-red-500 border-b">
                        <tr>
                            <th className="text-left font-medium text-white uppercase tracking-wide py-3 px-6">
                                Nombre
                            </th>
                            <th className="text-left font-medium text-white uppercase tracking-wide py-3 px-6">
                                Usuario
                            </th>
                            <th className="text-left font-medium text-white uppercase tracking-wide py-3 px-6">
                                Email
                            </th>
                            <th className="text-left font-medium text-white uppercase tracking-wide py-3 px-6">
                                Rol
                            </th>
                            <th className="text-right font-medium text-white uppercase tracking-wide py-3 px-6">
                                Acciones
                            </th>
                        </tr>
                    </thead>

                    {!loading && (
                        <tbody className="bg-gray-50">
                            {paginateUsers?.map(
                                (usuario: {
                                    id: number;
                                    nombre: string;
                                    username: string;
                                    email: string;
                                    rol: string;
                                }) => (
                                    <UserMng
                                        key={usuario.id}
                                        usuario={usuario}
                                        deleteUser={deleteUser}
                                    />
                                )
                            )}
                        </tbody>
                    )}
                </table>
            </div>
            <Pagination
                items={usuarios == null ? 0 : usuarios.length}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default UsuariosMng;
