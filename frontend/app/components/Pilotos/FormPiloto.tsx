"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuid } from "uuid";
import { useParams } from "next/navigation";
import Constantes from "@/app/(utils)/constantes";
import { getRequest, postRequest } from "@/app/(utils)/api";

const supabase = createClient(
    "https://pxfvrkflonlookyusxtb.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4ZnZya2Zsb25sb29reXVzeHRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgwODYyNTUsImV4cCI6MjAxMzY2MjI1NX0.I3v1fYevo3rzWOT8KvkIVDrZ0LbyvABN6YaynXIYE4I"
);

const TWITTER_REG_EX = /^[a-zA-Z0-9_]{1,15}$/;

async function uploadImage(img: any) {
    // Check if there's a new file
    if (!img || img.length === 0) {
        // No new file, return existing path or default
        return { path: fotoPiloto };
    }

    // Proceed with uploading the new file
    const file = img[0];
    const { data, error } = await supabase.storage.from("Images").upload("" + uuid(), file);

    if (data) {
        return data;
    } else {
        return -1;
    }
}

const initialPiloto = { nombre: "", apellidos: "", siglas:"", dorsal: "", pais: "",  twitter: "", foto: "", equipo_id: "" };
let fotoPiloto = "";

const FormPiloto = () => {
    const [paises, setPaises] = useState<any[]>([]);
    const [equipos, setEquipos] = useState<any[]>([]);
const getPaises = async () => {
        try {
            const response = await getRequest("paises");
            const data = await response.data;
            if (data.success == true) {
                const responseJson = data;
                const paises = responseJson.data;
                setPaises(paises);
            } else {
                console.log(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getEquipos = async () => {
        try {
            const response = await getRequest("equipos");
            const data = await response.data;
            if (data.success == true) {
                const responseJson = data;
                const equipos = responseJson.data;
                setEquipos(equipos);
            } else {
                console.log(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const [piloto, setPiloto] = React.useState(initialPiloto);

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        setValue,
    } = useForm();

    const onSubmit = handleSubmit(async (data: any) => {
        
            let imagePath = piloto.foto;

             if (data.foto && data.foto.length > 0 && data.foto[0].name != undefined) {

        const uploadResult = await uploadImage(data.foto);
        if (uploadResult !== -1) {
            imagePath = uploadResult.path;
        }
        }

                 postRequest("pilotos", {
                    id: id != undefined ? id : 0,
                    nombre: data.nombre,
                    apellidos: data.apellidos,
                    siglas: data.siglas,
                    dorsal: data.dorsal,
                    twitter: data.twitter,
                    foto: imagePath,
                    pais: data.pais,
                    equipo_id: data.equipo_id,
                })
                    .then((data) => {
                        window.location.href = "/Pilotos/Gestion";
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                    
    });

    const params = useParams();
    const id = params.id;

    if (id != undefined) {
        useEffect(() => {
            (async () => {
                try {
                    getEquipos();
                    getPaises();
                    const response = await getRequest("pilotos/" + id);
                    const piloto = response.data.data;
                    setPiloto(piloto);
                    setValue("nombre", piloto.nombre);
                    setValue("twitter", piloto.twitter);
                    setValue("foto", piloto.foto);
                    setValue("apellidos", piloto.apellidos);
                    setValue("dorsal", piloto.dorsal);
                    setValue("siglas", piloto.siglas);
                    setValue("pais", piloto.pais);
                    setValue("equipo_id", piloto.equipo.id.toString());
                } catch (error) {
                    console.log(error);
                }
            })();
        }, []);
    } else {
        useEffect(() => {
            (async () => {
                try {
                    getEquipos();
                    getPaises();
                } catch (error) {
                    console.log(error);
                }
            })();
        }, []);
    }

    return (
   
        <div className="container mx-auto my-8">
        

            <h2 className="text-black text-2xl">
                {id != undefined ? "Editar Piloto" : "Añadir Piloto"}
            </h2>
            <hr className="border-black w-[100%] mb-5 m-auto" />

            <form className="w-full max-w-lg mx-auto" onSubmit={onSubmit}>
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
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded 
                                    py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"
                            id="nombre"
                            type="text"
                            placeholder="Nombre del Piloto"
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
                            Nombre del Piloto
                        </p>
                    </div>
                </div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="nombre"
                        >
                            Apellidos
                        </label>

                        {errors.nombre && (
                            <span className="text-red-500 text-xs italic">
                                {errors.nombre.message as string}
                            </span>
                        )}

                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded 
                                    py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"
                            id="apellidos"
                            type="text"
                            placeholder="Apellidos(s) del Piloto"
                            {...register("apellidos", {
                                required: {
                                    value: true,
                                    message: "Este campo es obligatorio",
                                },
                                maxLength: {
                                    value: 50,
                                    message:
                                        "Los apellidos no puede tener mas de 50 caracteres",
                                },
                            })}
                        />

                        <p className="text-gray-600 text-xs italic">
                            Apellidos del Piloto
                        </p>
                    </div>
                </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="siglas"
                            >
                                Siglas
                            </label>
    
                            {errors.siglas && (
                                <span className="text-red-500 text-xs italic">
                                    {errors.siglas.message as string}
                                </span>
                            )}
    
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded 
                                        py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"
                                id="siglas"
                                type="text"
                                placeholder="Siglas del Piloto"
                                {...register("siglas", {
                                    required: {
                                        value: true,
                                        message: "Este campo es obligatorio",
                                    },
                                    maxLength: {
                                        value: 3,
                                        message:
                                            "Las siglas no puede tener mas de 3 caracteres",
                                    },
                                })}
                            />
    
                            <p className="text-gray-600 text-xs italic">
                                Siglas del Piloto
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="dorsal"
                            >
                                Dorsal
                            </label>
    
                            {errors.dorsal && (
                                <span className="text-red-500 text-xs italic">
                                    {errors.dorsal.message as string}
                                </span>
                            )}
    
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded 
                                        py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"
                                id="dorsal"
                                type="text"
                                placeholder="Dorsal del Piloto"
                                {...register("dorsal", {
                                    required: {
                                        value: true,
                                        message: "Este campo es obligatorio",
                                    },
                                    maxLength: {
                                        value: 2,
                                        message:
                                            "El dorsal no puede tener mas de 2 caracteres",
                                    },
                                })}
                            />
    
                            <p className="text-gray-600 text-xs italic">
                                Dorsal del Piloto
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="pais"
                            >
                                Pais
                            </label>
                            <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4
                                                pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="pais_select"
                                {...register("pais", {
                                    required: {
                                        value: true,
                                        message: "Este campo es obligatorio",
                                    },
                                })} 
                                >
                                <option value="">Selecciona un Pais</option>
                                {paises.map((pais) => (
                                    <option 
                                    key={pais.code}
                                    value={pais.code}>{pais.name}</option>
                                ))}
                            </select>

                            <p className="text-gray-600 text-xs italic">
                                Pais del Piloto
                            </p>
                        </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="equipo_id"
                            >
                                Equipo
                            </label>
                        <select 
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="equipo_select"
            {...register("equipo_id")}
        >
            <option value="">Selecciona un Equipo</option>
            {equipos.map((equipo) => (
                <option key={equipo.id} value={equipo.id}>
                    {equipo.nombre} 
                </option>
            ))}
        </select>

                            <p className="text-gray-600 text-xs italic">
                                Equipo del Piloto
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
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded 
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
                            Nombre de Usuario de Twitter del Piloto
                        </p>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="foto"
                        >
                            foto
                        </label>
                        {errors.foto && (
                            <span className="text-red-500 text-xs italic">
                                {errors.foto.message as string}
                            </span>
                        )}
                        <input
                            className="cursor-pointer file:cursor-pointer text-gray-700 w-full text-sm border border-gray-200 shadow-sm rounded-lg focus:z-10 
                                    focus:border-red-500 focus:ring-red-500 disabled:opacity-50 disabled:pointer-events-none 
                                    file:border-0 bg-gray-50 file:me-4 file:py-2 file:px-4 file:text-gray-600 file:italic 
                                    file:bg-gray-200 file:hover:bg-gray-300 hover:bg-gray-200"
                            id="foto"
                            type="file"
                            placeholder="Imagen"
                            {...register("foto", {
                                required: {
                                    value: piloto?.foto == "" ? true : false,
                                    message: "Este campo es obligatorio",
                                },
                            })}
                        />

                        <p className="text-gray-600 text-xs italic">
                            Foto del Piloto
                        </p>
                        {piloto?.foto != "" ? (
                            <div><img src={Constantes.IMAGE_BASE_URL + piloto?.foto} alt="foto del Piloto" width={80} height={80} />
                            </div>
                        ) : (
                            <p></p>
                        )}
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

                        <Link href="/Pilotos/Gestion">
                            <button className="border-2 border-gray-400 text-red-500 hover:text-red-700 hover:border-slate-600 uppercase text-xs xl:text-base font-bold py-2 px-4 rounded">
                                Volver
                            </button>
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default FormPiloto;
