"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "next/navigation";
import Constantes from "@/app/(utils)/constantes";
import { getRequest, postRequest } from "@/app/(utils)/api";
import Cabecera from "../Cabecera";
import VolverButton from "../volverBtn";
import { uploadImage } from "@/app/utils/processImages";

const TWITTER_REG_EX = /^[a-zA-Z0-9\s]*$/i;

const initialEquipo = { nombre: "", twitter: "", logo: "" };
let logoEquipo = "";

const FormEquipo = () => {
    const [equipo, setEquipo] = React.useState(initialEquipo);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm();

    const onSubmit = handleSubmit((data: any) => {
        logoEquipo = equipo.logo;
        let img_Name = uploadImage(data.logo[0], logoEquipo);

        img_Name.then((value) => {
            if (value != -1) {
                console.log(value);
                postRequest("equipos", {
                    id: id != undefined ? id : 0,
                    nombre: data.nombre,
                    twitter: data.twitter,
                    logo: value.path,
                })
                    .then((data) => {
                        window.history.back();
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        });
    });

    const params = useParams();
    const id = params.id;

    if (id != undefined) {
        useEffect(() => {
            (async () => {
                try {
                    const response = await getRequest("equipos/" + id);
                    const equipo = response.data.data;
                    setEquipo(equipo);
                    setValue("nombre", equipo.nombre);
                    setValue("twitter", equipo.twitter);
                } catch (error) {
                    console.log(error);
                }
            })();
        }, []);
    }

    return (
        <div className="container mx-auto my-8">
            <Cabecera
                titulo={id != undefined ? "Editar Equipo" : "Añadir Equipo"}
                subtitulo="Rellene los campos como desee"
            />

            <form
                className="max-w-lg mx-auto mt-10 bg-gray-50 p-10 rounded-xl"
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
                                    py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"
                            id="nombre"
                            type="text"
                            placeholder="Nombre del Equipo"
                            {...register("nombre", {
                                required: {
                                    value: true,
                                    message: "Este campo es obligatorio",
                                },
                                maxLength: {
                                    value: 50,
                                    message:
                                        "El Nombre no puede tener mas de 50 caracteres",
                                },
                            })}
                        />

                        <p className="text-gray-600 text-xs italic">
                            Nombre del Equipo
                        </p>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="twitter"
                        >
                            Twitter
                        </label>
                        {errors.twitter && (
                            <span className="text-red-500 text-xs italic">
                                {errors.twitter.message as string}
                            </span>
                        )}
                        <input
                            className="appearance-none block w-full text-gray-700 border border-gray-200 rounded 
                                            py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"
                            id="twitter"
                            type="text"
                            placeholder="Usuario sin el @"
                            {...register("twitter", {
                                required: {
                                    value: true,
                                    message: "Este campo es obligatorio",
                                },
                                maxLength: {
                                    value: 50,
                                    message:
                                        "El Twitter no puede tener mas de 50 caracteres",
                                },
                                pattern: {
                                    value: TWITTER_REG_EX,
                                    message:
                                        "El Nombre de usuario no es válido, solo se permiten letras y números",
                                },
                            })}
                        />

                        <p className="text-gray-600 text-xs italic">
                            Nombre de Usuario de Twitter del Equipo
                        </p>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="logo"
                        >
                            Logo
                        </label>
                        {errors.logo && (
                            <span className="text-red-500 text-xs italic">
                                {errors.logo.message as string}
                            </span>
                        )}
                        <input
                            className="cursor-pointer file:cursor-pointer text-gray-700 w-full text-sm border border-gray-200 shadow-sm rounded-lg focus:z-10 
                                    focus:border-red-500 focus:ring-red-500 disabled:opacity-50 disabled:pointer-events-none 
                                    file:border-0 bg-gray-50 file:me-4 file:py-2 file:px-4 file:text-gray-600 file:italic 
                                    file:bg-gray-200 file:hover:bg-gray-300 hover:bg-gray-200"
                            id="logo"
                            type="file"
                            placeholder="Imagen"
                            {...register("logo", {
                                required: {
                                    value: equipo?.logo == "" ? true : false,
                                    message: "Este campo es obligatorio",
                                },
                            })}
                        />

                        <p className="text-gray-600 text-xs italic">
                            Logo del Equipo
                        </p>
                        {equipo?.logo != "" ? (
                            <Image
                                src={Constantes.IMAGE_BASE_URL + equipo?.logo}
                                alt="Logo del Equipo"
                                width={80}
                                height={80}
                            />
                        ) : (
                            <p></p>
                        )}
                    </div>
                </div>
                <div className="flex flex-wrap mb-6 items-center ">
                    <div className="w-full px-3 flex justify-center">
                        <button
                            className="bg-red-600 hover:bg-red-700 text-white font-bold  py-2 px-6 rounded-lg mr-5"
                            type="submit"
                        >
                            Guardar
                        </button>
                        <VolverButton />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default FormEquipo;
