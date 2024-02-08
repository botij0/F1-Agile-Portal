"use client";
import { useParams, useRouter, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { getRequest, postRequest, putRequest } from "@/app/(utils)/api";
import Constantes from "@/app/(utils)/constantes";
import InputSelectField from "@/app/components/InputSelectField";
import Cabecera from "../Cabecera";
import Loading from "../Loading";
import VolverButton from "../volverBtn";
import { uploadImage } from "@/app/utils/processImages";
import { get } from "lodash";

const initialPiloto = {
    nombre: "",
    apellidos: "",
    dorsal: 0,
    pais: "0",
    siglas: "",
    twitter: "",
    equipo: "",
    foto: "",
};
let imgPiloto = "";
let paisPiloto = "0";
const FormPiloto = () => {
    const [piloto, setPiloto] = React.useState(initialPiloto);
    const [loading, setLoading] = useState(false);
    const [paises, setPaises] = useState<any[]>([]);
    const [equipos, setEquipos] = useState<any[]>([]);
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm();
    const params = useParams();
    const path = usePathname();
    const id = params.id;

    const getPaises = async () => {
        try {
            const response = await getRequest("paises");
            const data = await response.data;
            if (data.success == true) {
                const responseJson = data;
                const paises = responseJson.data;

                setPaises(paises);
            } else {
                toast.error("Error al cargar los paises");
            }
        } catch (error) {
            toast.error("Error al cargar los paises");
        }
    };

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

    const getMiEquipo = async () => {
        try {
            setLoading(true);
            const response = await getRequest("equipos/me");
            const data = await response.data;
            if (data.success == true) {
                const responseJson = data;
                const equipo = responseJson.data;
                const equipos = [equipo];

                setEquipos(equipos);
                setLoading(false);
            } else {
                toast.error("Error al cargar los equipos");
            }
        } catch (error) {
            toast.error("Error al cargar los equipos");
        }
    };

    const getPiloto = async () => {
        try {
            const response = await getRequest("pilotos/" + id);
            console.log(response.data.data);
            setPiloto(response.data.data);
            setValue("nombre", response.data.data.nombre);
            setValue("apellidos", response.data.data.apellidos);
            setValue("dorsal", response.data.data.dorsal);
            setValue("pais", response.data.data.pais);
            paisPiloto = response.data.data.pais;
            setValue("siglas", response.data.data.siglas);
            setValue("twitter", response.data.data.twitter);
            imgPiloto = response.data.data.foto;
            setValue("equipo", response.data.data.equipo.id.toString());
        } catch (error) {
            console.log(error);
        }
    };

    const onSubmit = handleSubmit((data: any) => {
        imgPiloto = piloto.foto;
        let img_Name = uploadImage(data.foto[0], imgPiloto);
        img_Name.then((value) => {
            if (value != -1) {
                console.log(value);
                if (id != undefined) {
                    //Modificar piloto
                    putRequest("pilotos/" + id, {
                        nombre: data.nombre,
                        apellidos: data.apellidos,
                        dorsal: data.dorsal,
                        pais: data.pais,
                        siglas: data.siglas.toUpperCase(),
                        twitter: data.twitter,
                        foto: value.path,
                        equipo_id: data.equipo,
                    })
                        .then((data) => {
                            toast.success(data.data.message, {
                                duration: 4000,
                            });
                            router.back();
                        })
                        .catch((error) => {
                            console.log(error);
                            toast.error(error);
                        });
                } else {
                    //Nuevo piloto

                    postRequest("pilotos", {
                        nombre: data.nombre,
                        apellidos: data.apellidos,
                        dorsal: data.dorsal,
                        pais: data.pais,
                        siglas: data.siglas.toUpperCase(),
                        twitter: data.twitter,
                        foto: value.path,
                        equipo_id: data.equipo,
                    })
                        .then((data) => {
                            toast.success(data.data.message, {
                                duration: 4000,
                            });
                            router.back();
                        })
                        .catch((error) => {
                            console.log(error);
                            toast.error(error);
                        });
                }
            }
        });
    });

    useEffect(() => {
        getPaises();
        if (path.includes("MiEquipo")) {
            getMiEquipo();
        } else {
            getEquipos();
        }
        if (id != undefined) {
            getPiloto();
        }
    }, []);

    return (
        <div className="container mx-auto my-8">
            <Cabecera
                titulo={id != undefined ? "Editar Piloto" : "Añadir Piloto"}
                subtitulo="Rellene los campos como desee"
            />
            {loading ? (
                <Loading />
            ) : (
                <form
                    className="w-full max-w-lg mx-auto mt-5"
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
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded 
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
                                            "El nombre no puede tener más de 50 caracteres",
                                    },
                                })}
                            />

                            <p className="text-gray-600 text-xs italic">
                                Nombre del piloto
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="apellidos"
                            >
                                Apellidos
                            </label>
                            {errors.apellidos && (
                                <span className="text-red-500 text-xs italic">
                                    {errors.apellidos.message as string}
                                </span>
                            )}
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded 
                                     p-2.5 mb-1 leading-tight focus:outline-none focus:bg-white"
                                id="apellidos"
                                type="text"
                                placeholder="Apellidos"
                                {...register("apellidos", {
                                    required: {
                                        value: true,
                                        message: "Este campo es obligatorio",
                                    },
                                    maxLength: {
                                        value: 50,
                                        message:
                                            "Los apellidos no pueden tener más de 50 caracteres",
                                    },
                                })}
                            />

                            <p className="text-gray-600 text-xs italic">
                                Apellidos del piloto
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
                                     p-2.5 mb-1 leading-tight focus:outline-none focus:bg-white"
                                id="dorsal"
                                type="number"
                                min="0"
                                max="999"
                                placeholder="Dorsal"
                                {...register("dorsal", {
                                    required: {
                                        value: true,
                                        message: "Este campo es obligatorio",
                                    },
                                    maxLength: {
                                        value: 3,
                                        message:
                                            "El dorsal debe de estar entre 0 y 999",
                                    },
                                })}
                            />
                            <p className="text-gray-600 text-xs italic">
                                Dorsal del piloto
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="pais"
                            >
                                País
                            </label>
                            <InputSelectField
                                label="País"
                                register={register}
                                name="pais"
                                errors={errors}
                                loading={loading}
                                options={paises}
                            />

                            <p className="text-gray-600 text-xs italic">
                                País de nacimiento del piloto
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
                                     p-2.5 mb-1 leading-tight focus:outline-none focus:bg-white uppercase"
                                id="siglas"
                                type="text"
                                placeholder="AAA"
                                size={3}
                                {...register("siglas", {
                                    required: {
                                        value: true,
                                        message: "Este campo es obligatorio",
                                    },
                                    maxLength: {
                                        value: 3,
                                        message:
                                            "Las siglas no pueden tener más de 3 caracteres",
                                    },
                                })}
                            />
                            <p className="text-gray-600 text-xs italic">
                                Siglas del piloto
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
                                     p-2.5 mb-1 leading-tight focus:outline-none focus:bg-white"
                                id="twitter"
                                type="text"
                                placeholder="Twitter"
                                {...register("twitter", {
                                    required: {
                                        value: true,
                                        message: "Este campo es obligatorio",
                                    },
                                    maxLength: {
                                        value: 15,
                                        message:
                                            "La cuenta de twitter del piloto no puede tener más de 15 caracteres",
                                    },
                                })}
                            />
                            <p className="text-gray-600 text-xs italic">
                                Cuenta de twitter del piloto
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="equipo"
                            >
                                Equipo del piloto
                            </label>
                            {errors.usuario && (
                                <span className="text-red-500 text-xs italic">
                                    {errors.usuario.message as string}
                                </span>
                            )}
                            <InputSelectField
                                label="Equipo"
                                register={register}
                                name="equipo"
                                errors={errors}
                                loading={loading}
                                options={equipos}
                            />

                            <p className="text-gray-600 text-xs italic">
                                Equipo al que pertenece el piloto
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="foto"
                            >
                                Foto
                            </label>
                            {errors.foto && (
                                <span className="text-red-500 text-xs italic">
                                    {errors.foto.message as string}
                                </span>
                            )}
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded 
                                     p-2.5 mb-1 leading-tight focus:outline-none focus:bg-white"
                                id="foto"
                                type="file"
                                placeholder=""
                                accept="image/png, image/jpeg"
                                {...register("foto", {
                                    required: {
                                        value: id == undefined,
                                        message: "Este campo es obligatorio",
                                    },
                                })}
                            />

                            <p className="text-gray-600 text-xs italic">
                                Foto del piloto
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6 w-16">
                        {id != undefined ? (
                            <img
                                src={Constantes.IMAGE_BASE_URL + piloto.foto}
                            />
                        ) : (
                            <p></p>
                        )}
                    </div>

                    <div className="flex flex-wrap mb-6 items-center ">
                        <div className="w-full px-3 flex justify-center">
                            <button
                                className="bg-red-500 hover:bg-red-700 mr-5 text-white font-bold py-2 px-4 rounded"
                                type="submit"
                            >
                                Guardar
                            </button>

                            <VolverButton />
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
};

export default FormPiloto;
