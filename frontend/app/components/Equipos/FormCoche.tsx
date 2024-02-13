"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useRouter, usePathname } from "next/navigation";
import Constantes from "@/app/(utils)/constantes";
import { getRequest, postRequest, putRequest } from "@/app/(utils)/api";
import toast from "react-hot-toast";
import InputSelectField from "@/app/components/InputSelectField";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import cocheSchema from "@/app/schemas/coche";
import InputTextField from "../InputTextField";
import Loading from "@/app/components/Loading";
import VolverButton from "../volverBtn";
import { uploadImage } from "@/app/utils/processImages";

type CocheFormValues = z.infer<typeof cocheSchema>;

const FormCoche = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm<CocheFormValues>({
        resolver: zodResolver(cocheSchema),
        defaultValues: {
            nombre: "",
            equipo: "",
            codigo: "",
            consumo: 0,
            erscurvaMedia: 0,
            erscurvaRapida: 0,
            erscurvaLenta: 0,
            imagen: "",
        },
    });

    const [equipos, setEquipos] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingImagen, setEditingImagen] = useState("");

    const router = useRouter();
    const params = useParams();
    const path = usePathname();
    const id = params.id;

    const getCoche = async (id: string) => {
        try {
            const response = await getRequest("coches/" + id);
            const data = await response.data;

            if (data.success == true) {
                const coche = data.data;
                console.log(coche);
                setValue("nombre", coche.nombre);
                setValue("equipo", coche.equipo.id.toString());
                setValue("codigo", coche.codigo.toString());
                setValue("consumo", coche.consumo.toString());
                setValue("erscurvaLenta", coche.erscurvaLenta.toString());
                setValue("erscurvaMedia", coche.erscurvaMedia.toString());
                setValue("erscurvaRapida", coche.erscurvaRapida.toString());
                setEditingImagen(coche.imagen);
            } else {
                toast.error(data.message);
                router.back();
            }
        } catch {
            toast.error("Error al cargar el coche");
            router.back();
        }
    };

    const onSubmit = handleSubmit((data: any) => {
        console.log(data.imagen);
        let img_Name = uploadImage(data.imagen[0], editingImagen);
        const method = isEditing ? putRequest : postRequest;
        const url = isEditing ? "coches/" + params.id : "coches";

        img_Name.then((value) => {
            if (value != -1) {
                try {
                    method(url, {
                        id: id != undefined ? id : 0,
                        nombre: data.nombre,
                        equipo_id: data.equipo,
                        codigo: data.codigo,
                        consumo: data.consumo,
                        ers_curva_media: data.erscurvaMedia,
                        ers_curva_rapida: data.erscurvaRapida,
                        ers_curva_lenta: data.erscurvaLenta,
                        imagen: value.path,
                    }).then((data) => {
                        toast.success(data.data.message);
                        router.back();
                    });
                } catch (error) {
                    toast.error("Error al guardar el coche");
                }
            }
        });
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

    useEffect(() => {
        if (path.includes("MiEquipo")) {
            getMiEquipo();
        } else {
            getEquipos();
        }

        if (params.id) {
            setIsEditing(true);
            getCoche(params.id as string);
        }
    }, [params.id]);

    return (
        <div className="container mx-auto my-8">
            {loading ? (
                <Loading />
            ) : (
                <form
                    className="max-w-xl mx-auto mt-10 bg-gray-50 p-10 rounded-xl"
                    onSubmit={onSubmit}
                >
                    <div className="grid sm:grid-cols-2 gap-10 mb-6">
                        <div className="w-full">
                            <InputTextField
                                label="Nombre"
                                register={register}
                                name="nombre"
                                errors={errors}
                                loading={loading}
                            />

                            <p className="text-gray-600 text-xs italic">
                                Nombre del Coche
                            </p>
                        </div>

                        <div className="w-full">
                            <InputSelectField
                                label="Equipo"
                                register={register}
                                name="equipo"
                                errors={errors}
                                loading={loading}
                                options={equipos}
                            />
                            <p className="text-gray-600 text-xs italic">
                                Equipo al que pertenece el coche
                            </p>
                        </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-10 mb-6">
                        <div className="w-full">
                            <InputTextField
                                label="Código"
                                register={register}
                                name="codigo"
                                errors={errors}
                                loading={loading}
                                isNumber={true}
                            />

                            <p className="text-gray-600 text-xs italic">
                                Código interno que se le dé al vehículo
                            </p>
                        </div>

                        <div className="w-full">
                            <InputTextField
                                label="Consumo"
                                register={register}
                                name="consumo"
                                errors={errors}
                                loading={loading}
                                isNumber={true}
                            />

                            <p className="text-gray-600 text-xs italic">
                                Consumo de combustible, expresado en litros cada
                                100 kilómetros (L/100km)
                            </p>
                        </div>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-10 mb-2">
                        <div className="w-full">
                            <InputTextField
                                label="erscurvaLenta"
                                register={register}
                                name="erscurvaLenta"
                                errors={errors}
                                loading={loading}
                                isNumber={true}
                            />
                        </div>

                        <div className="w-full">
                            <InputTextField
                                label="erscurvaMedia"
                                register={register}
                                name="erscurvaMedia"
                                errors={errors}
                                loading={loading}
                                isNumber={true}
                            />
                        </div>

                        <div className="w-full px-3">
                            <InputTextField
                                label="erscurvaRapida"
                                register={register}
                                name="erscurvaRapida"
                                errors={errors}
                                loading={loading}
                                isNumber={true}
                            />
                        </div>
                    </div>
                    <div className="mb-8 ms-2">
                        <p className="text-gray-600 text-xs italic">
                            Ganancia de potencia (en Kilovatios hora, kW/h o
                            kWh) que consigue recuperar el vehículo en frenada
                            con el sistema MGU-K (Motor Generator Unit -
                            Kinetic), para almacenar en baterías. La energía
                            almacenada está disponible para el piloto
                        </p>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="imagen"
                            >
                                Imagen
                            </label>
                            {errors.imagen && (
                                <span className="text-red-500 text-xs italic">
                                    {errors.imagen.message as string}
                                </span>
                            )}
                            <input
                                className="cursor-pointer file:cursor-pointer text-gray-700 w-full text-sm border border-gray-200 shadow-sm rounded-lg focus:z-10 
                                    focus:border-red-500 focus:ring-red-500 disabled:opacity-50 disabled:pointer-events-none 
                                    file:border-0 bg-gray-50 file:me-4 file:py-2 file:px-4 file:text-gray-600 file:italic 
                                    file:bg-gray-200 file:hover:bg-gray-300 hover:bg-gray-200"
                                id="imagen"
                                type="file"
                                placeholder="Imagen"
                                {...register("imagen", {
                                    required: {
                                        value:
                                            editingImagen.length == 0
                                                ? true
                                                : false,
                                        message: "Este campo es obligatorio",
                                    },
                                })}
                            />

                            <p className="text-gray-600 text-xs italic">
                                Imagen del Coche
                            </p>
                            {editingImagen != "" ? (
                                <Image
                                    src={
                                        Constantes.IMAGE_BASE_URL +
                                        editingImagen
                                    }
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
            )}
        </div>
    );
};

export default FormCoche;
