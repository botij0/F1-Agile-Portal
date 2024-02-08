"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "next/navigation";
import { getRequest, postRequest } from "@/app/(utils)/api";
import VolverButton from "../volverBtn";
import Cabecera from "../Cabecera";

const initialVotacion = {
    titulo: "",
    descripcion: "",
    limite: "",
    opciones: [],
};

const FormVotacion = () => {
    const [votacion, setVotacion] = React.useState(initialVotacion);
    const [pilotos, setPilotos] = React.useState<any[]>([]);
    const [opciones, setOpciones] = React.useState<any[]>([]);
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const onSubmit = handleSubmit(async (data: any) => {
        postRequest("votaciones", {
            id: id != undefined ? id : 0,
            titulo: data.titulo,
            descripcion: data.descripcion,
            limite: data.limite,
            idPilotos: opciones,
        })
            .then((data) => {
                console.log(data);
                window.location.href = "/Votaciones/Gestion";
            })
            .catch((error) => {
                console.log(error);
            });
    });

    const addOpcion = (pilotoId: number) => {
        setOpciones((prevElement) => {
            if (prevElement.includes(pilotoId)) {
                return prevElement.filter((id) => id !== pilotoId);
            } else {
                return [...prevElement, pilotoId];
            }
        });
    };

    const getPilotos = async () => {
        try {
            const response = await getRequest("pilotos/data");

            setPilotos(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const params = useParams();
    const id = params.id;

    if (id != undefined) {
        useEffect(() => {
            getPilotos();
            (async () => {
                try {
                    const response = await getRequest("votaciones/" + id);
                    const votacion = response.data;
                    const opciones = votacion.opciones.map(
                        (opcion: any) => opcion.piloto.id
                    );
                    const limite = votacion.limite.split("T")[0];
                    setOpciones(opciones);
                    setVotacion(votacion);
                    setValue("descripcion", votacion.descripcion);
                    setValue("limite", limite);
                    setValue("titulo", votacion.titulo);
                } catch (error) {
                    console.log(error);
                }
            })();
        }, []);
    } else {
        useEffect(() => {
            getPilotos();
        }, []);
    }

    return (
        <div className="container mx-auto my-8">
            <Cabecera
                titulo={id != undefined ? "Editar Votacion" : "Añadir Votacion"}
                subtitulo={
                    id != undefined
                        ? "Edita la votación que desees"
                        : "Añade una nueva votación"
                }
            />

            <form
                className="max-w-lg mx-auto mt-10 bg-gray-50 p-10 rounded-xl"
                onSubmit={onSubmit}
            >
                <div className="flex flex-wrap mb-6">
                    <div className="w-full">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="titulo"
                        >
                            Titulo
                        </label>

                        {errors.titulo && (
                            <span className="text-red-500 text-xs italic">
                                {errors.titulo.message as string}
                            </span>
                        )}

                        <input
                            className="appearance-none block w-full text-gray-700 border border-gray-200 rounded 
                                    py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"
                            id="titulo"
                            type="text"
                            placeholder="Titulo de la Votación"
                            {...register("titulo", {
                                required: {
                                    value: true,
                                    message: "Este campo es obligatorio",
                                },
                                maxLength: {
                                    value: 50,
                                    message:
                                        "El Titulo no puede tener mas de 50 caracteres",
                                },
                            })}
                        />

                        <p className="text-gray-600 text-xs italic">
                            Titulo de la Votación
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap mb-6">
                    <div className="w-full">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="descripcion"
                        >
                            Descripcion
                        </label>

                        {errors.descripcion && (
                            <span className="text-red-500 text-xs italic">
                                {errors.descripcion.message as string}
                            </span>
                        )}

                        <textarea
                            className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded 
                                    py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"
                            id="descripcion"
                            placeholder="Descripcion de la Votación"
                            {...register("descripcion", {
                                required: {
                                    value: true,
                                    message: "Este campo es obligatorio",
                                },
                                maxLength: {
                                    value: 200,
                                    message:
                                        "La Descripcion no puede tener mas de 200 caracteres",
                                },
                            })}
                        />

                        <p className="text-gray-600 text-xs italic">
                            Descripcion de la Votación
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap mb-6">
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="limite"
                        >
                            Limite
                        </label>

                        {errors.limite && (
                            <span className="text-red-500 text-xs italic">
                                {errors.limite.message as string}
                            </span>
                        )}

                        <input
                            className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded 
                                    py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="limite"
                            type="date"
                            min={new Date().toISOString().split("T")[0]}
                            placeholder="Limite de la Votación"
                            {...register("limite", {
                                required: {
                                    value: true,
                                    message: "Este campo es obligatorio",
                                },
                                min: {
                                    value: new Date()
                                        .toISOString()
                                        .split("T")[0],
                                    message:
                                        "La fecha limite no puede ser anterior a hoy",
                                },
                            })}
                        />

                        <p className="text-gray-600 text-xs italic">
                            Limite de la Votación
                        </p>
                    </div>
                </div>
                <div className="flex flex-wrap mb-6">
                    <div className="w-full">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="opciones"
                        >
                            Opciones
                        </label>
                        <p className="text-gray-600 text-xs italic">
                            Selecciona los pilotos que quieres que aparezcan en
                            la votación
                        </p>
                        <div className="flex flex-col">
                            {pilotos.map((piloto) => (
                                <div className="w-full flex ">
                                    <input
                                        className="mr-2 leading-tight"
                                        type="checkbox"
                                        checked={opciones.includes(piloto.id)}
                                        value={piloto.id}
                                        onChange={() => addOpcion(piloto.id)}
                                    />
                                    <label
                                        className="  uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="opciones"
                                    >
                                        {piloto.nombre + " " + piloto.apellidos}{" "}
                                        - ({piloto.equipo.nombre})
                                    </label>
                                </div>
                            ))}
                        </div>
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

export default FormVotacion;
