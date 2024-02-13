"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { getRequest, putRequest } from "@/app/(utils)/api";
import Cabecera from "../Cabecera";
import Link from "next/link";
import VolverButton from "../volverBtn";
import Loading from "../Loading";
import InputSelectField from "../InputSelectField";

const initialUser = { nombre: "", usuario: "", email: "", rol: "" };

const FormUser = () => {
    const [usuarios, setUsuarios] = React.useState(initialUser);
    const [loading, setLoading] = useState(false);
    const [equipos, setEquipos] = useState<any[]>([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm();

    const params = useParams();
    const router = useRouter();
    const id = params.id;

    const onSubmit = handleSubmit((data: any) => {
        try {
            const request = {
                id: id,
                nombre: data.nombre,
                username: data.usuario,
                email: data.email,
                rol: data.rol,
                idEquipo: data.equipo,
            };
            putRequest("usuarios", request).then((response) => {
                if (!response.data.success) {
                    toast.error(response.data.message);
                } else {
                    toast.success(response.data.message, { duration: 4000 });
                    router.push("/Users");
                }
            });
        } catch (err) {
            console.log(err);
        }
    });

    const getEquipos = async () => {
        try {
            setLoading(true);
            const response = await getRequest("equipos");
            const data = await response.data;
            if (data.success == true) {
                const responseJson = data;
                const equipos = responseJson.data;

                setEquipos(equipos);
                setLoading(false);
            } else {
                toast.error("Error al cargar los equipos");
            }
        } catch (error) {
            toast.error("Error al cargar los equipos");
        }
    };

    useEffect(() => {
        if (id != undefined) {
            (async () => {
                try {
                    const response = await getRequest("usuarios/" + id);

                    setUsuarios(response.data.data);
                    setValue("nombre", response.data.data.nombre);
                    setValue("usuario", response.data.data.username);
                    setValue("email", response.data.data.email);
                    setValue("rol", response.data.data.rol);
                    setValue("equipo", response.data.data.equipo.id);
                } catch (error) {
                    console.log(error);
                }
            })();
        }
        getEquipos();
    }, []);

    return (
        <div className="container mx-auto my-8">
            <Cabecera
                titulo="Editar Usuario"
                subtitulo="Modifica los datos del usuario seleccionado"
            />
            <div className="mt-3">
                <VolverButton />
            </div>

            {loading ? (
                <Loading />
            ) : (
                <form
                    className="max-w-lg mx-auto mt-5 bg-gray-50 p-10 rounded-xl"
                    onSubmit={onSubmit}
                >
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="nombre"
                            >
                                Nombre
                            </label>

                            {errors.nombre && (
                                <span className="text-red-500 text-xs italic">
                                    {errors.nombre.message as string}
                                </span>
                            )}

                            <input
                                className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded 
                                     p-2.5 mb-1 leading-tight focus:outline-none focus:bg-white"
                                id="nombre"
                                type="text"
                                placeholder="Nombre"
                                {...register("nombre", {
                                    required: {
                                        value: true,
                                        message: "Este campo es obligatorio",
                                    },
                                    maxLength: {
                                        value: 50,
                                        message:
                                            "El nombre no puede tener mas de 50 caracteres",
                                    },
                                })}
                            />

                            <p className="text-gray-600 text-xs italic">
                                Nombre personal
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="usuario"
                            >
                                Usuario
                            </label>
                            {errors.usuario && (
                                <span className="text-red-500 text-xs italic">
                                    {errors.usuario.message as string}
                                </span>
                            )}
                            <input
                                className="appearance-none block w-full text-gray-700 border border-gray-200 rounded 
                                     p-2.5 mb-1 leading-tight focus:outline-none focus:bg-white"
                                id="usuario"
                                type="text"
                                placeholder="Usuario"
                                {...register("usuario", {
                                    required: {
                                        value: true,
                                        message: "Este campo es obligatorio",
                                    },
                                    maxLength: {
                                        value: 50,
                                        message:
                                            "El usuario no puede tener mas de 50 caracteres",
                                    },
                                })}
                            />

                            <p className="text-gray-600 text-xs italic">
                                Nombre de Usuario
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="email"
                            >
                                Email
                            </label>
                            {errors.email && (
                                <span className="text-red-500 text-xs italic">
                                    {errors.email.message as string}
                                </span>
                            )}
                            <input
                                className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded 
                                     p-2.5 mb-1 leading-tight focus:outline-none focus:bg-white"
                                id="email"
                                type="email"
                                placeholder="email@email.com"
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: "Este campo es obligatorio",
                                    },
                                    maxLength: {
                                        value: 256,
                                        message:
                                            "El email no puede tener mas de 256 caracteres",
                                    },
                                })}
                            />

                            <p className="text-gray-600 text-xs italic">
                                Email
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="rol"
                            >
                                Rol
                            </label>
                            <select
                                className=" block w-full  text-gray-700 border border-gray-200 rounded 
                                    p-2.5 mb-1 leading-tight focus:outline-none focus:bg-white"
                                id="rol"
                                {...register("rol", {
                                    required: {
                                        value: true,
                                        message: "Este campo es obligatorio",
                                    },
                                })}
                            >
                                <option value="RESPONSABLE">RESPONSABLE</option>
                                <option value="ADMIN">ADMIN</option>
                            </select>

                            <p className="text-gray-600 text-xs italic">Rol</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            {errors.equipo && (
                                <span className="text-red-500 text-xs italic">
                                    {errors.equipo.message as string}
                                </span>
                            )}
                            <select
                                className=" block w-full  text-gray-700 border border-gray-200 rounded 
                                    p-2.5 mb-1 leading-tight focus:outline-none focus:bg-white"
                                id="equipo"
                                {...register("equipo", {
                                    required: {
                                        value: true,
                                        message: "Este campo es obligatorio",
                                    },
                                })}
                            >
                                <option value="null">Ninguno</option>
                                {equipos.map((equipo) => (
                                    <option key={equipo.id} value={equipo.id}>
                                        {equipo.nombre}
                                    </option>
                                ))}
                            </select>

                            <p className="text-gray-600 text-xs italic">
                                Equipo al que pertenece el piloto
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap mb-6 items-center ">
                        <div className="w-full px-3 flex justify-center">
                            <button
                                className="bg-red-500 hover:bg-red-700 mr-5 text-white font-bold py-2 px-4 rounded"
                                type="submit"
                            >
                                Guardar
                            </button>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
};

export default FormUser;
