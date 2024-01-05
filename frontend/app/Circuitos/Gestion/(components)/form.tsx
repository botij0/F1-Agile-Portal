"use client";
import Cabecera from "@/app/components/Cabecera";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import Loading from "@/app/components/Loading";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuid } from "uuid";
import Constantes from "@/app/(utils)/constantes";
import circuitoSchema from "../../(common)/schema";
import { getRequest, postRequest, putRequest } from "@/app/(utils)/api";
import InputTextField from "@/app/components/InputTextField";
import InputSelectField from "@/app/components/InputSelectField";
import InputButton from "@/app/components/InputButton";

type CircuitoFormValues = z.infer<typeof circuitoSchema>;

const FormCircuitos = () => {
    const [loading, setLoading] = useState(false);
    const [paises, setPaises] = useState<any[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingTrazado, setEditingTrazado] = useState("");
    const router = useRouter();
    const params = useParams();
    let trazado = "";
    let trazadoPath = "";
    const supabase = createClient(
        "https://pxfvrkflonlookyusxtb.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4ZnZya2Zsb25sb29reXVzeHRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgwODYyNTUsImV4cCI6MjAxMzY2MjI1NX0.I3v1fYevo3rzWOT8KvkIVDrZ0LbyvABN6YaynXIYE4I"
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm<CircuitoFormValues>({
        resolver: zodResolver(circuitoSchema),
        defaultValues: {
            nombre: "",
            pais: "",
            ciudad: "",
            numeroVueltas: "0",
            longitud: "0",
            curvasLentas: "0",
            curvasMedias: "0",
            curvasRapidas: "0",
            granPremio: "",
            trazado: "",
        },
    });

    const getCircuito = async (id: string) => {
        try {
            setLoading(true);
            const response = await getRequest("circuitos/" + id);
            const data = await response.data;

            if (data.success == true) {
                const circuito = data.data;
                console.log(circuito);
                setValue("nombre", circuito.nombre);
                setValue("pais", circuito.pais);
                setValue("ciudad", circuito.ciudad);
                setValue("numeroVueltas", circuito.numeroVueltas.toString());
                setValue("longitud", circuito.longitud.toString());
                setValue("curvasLentas", circuito.curvasLentas.toString());
                setValue("curvasMedias", circuito.curvasMedias.toString());
                setValue("curvasRapidas", circuito.curvasRapidas.toString());
                setValue("granPremio", circuito.granPremio.toString());
                setValue("trazado", circuito.trazado);
                setEditingTrazado(circuito.trazado);
                setLoading(false);
            } else {
                toast.error(data.message);
                router.push("/Circuitos/Gestion");
            }
        } catch {
            setLoading(false);
            toast.error("Error al cargar el circuito");
            router.push("/Circuitos/Gestion");
        }
    };

    const getPaises = async () => {
        try {
            const response = await getRequest("paises");
            const data = await response.data;
            if (data.success == true) {
                const responseJson = data;
                const paises = responseJson.data;

                setPaises(paises);
            } else {
                setLoading(false);
                toast.error("Error al cargar los paises");
            }
        } catch (error) {
            setLoading(false);
            toast.error("Error al cargar los paises");
        }
    };

    async function uploadImage(img: any) {
        try {
            const file = img || "";
            if (!file) {
                return { path: editingTrazado || trazado };
            } else {
                const { data, error } = await supabase.storage
                    .from("Images")
                    .upload("" + uuid(), file);
                return data || -1;
            }
        } catch (error) {
            return -1;
        }
    }

    const onSubmit = async (data: CircuitoFormValues) => {
        let uploadedImagePath = trazadoPath || "";

        try {
            if (data.trazado && data.trazado[0]) {
                const response = await uploadImage(data.trazado[0]);
                if (response !== -1) {
                    uploadedImagePath = response.path;
                } else {
                    toast.error("Error uploading the image");
                    return;
                }
            } else if (isEditing && !data.trazado) {
                uploadedImagePath = editingTrazado || trazadoPath || "";
            }
        } catch (error) {
            toast.error("Error uploading the image");
            return;
        }

        const method = isEditing ? putRequest : postRequest;
        const url = isEditing ? "circuitos/" + params.id : "circuitos";
        setLoading(true);

        try {
            const response = await method(url, {
                nombre: data.nombre,
                pais: data.pais,
                ciudad: data.ciudad,
                numero_vueltas: Number(data.numeroVueltas),
                longitud: Number(data.longitud),
                curvasLentas: Number(data.curvasLentas),
                curvasMedias: Number(data.curvasMedias),
                curvasRapidas: Number(data.curvasRapidas),
                granPremio: data.granPremio,
                trazado: uploadedImagePath,
            });

            if (response.data.success) {
                toast.success(response.data.message, { duration: 4000 });
                router.push("/Circuitos/Gestion");
            } else {
                toast.error(response.data.message);
            }

            reset();
        } catch (error) {
            toast.error("Error al crear el circuito");
        }
        setLoading(false);
    };

    useEffect(() => {
        if (params.id) {
            setIsEditing(true);
            getCircuito(params.id as string);
        }
    }, [params.id]);

    useEffect(() => {
        getPaises();
    }, []);

    return (
        <div className="px-24">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Cabecera
                    titulo={isEditing ? "Editar circuito" : "Crear circuito"}
                    subtitulo={
                        isEditing
                            ? "Edita los datos del circuito"
                            : "Rellena los datos del circuito"
                    }
                />
                {loading ? (
                    <Loading />
                ) : (
                    <div className="mt-5 bg-gray-50 p-5 rounded-lg">
                        <div className="w-96 flex flex-col gap-4">
                            <div>
                                <div className="w-full px-3">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="titulo"
                                    >
                                        Imagen
                                    </label>
                                    {errors.trazado && (
                                        <span className="text-red-500 text-xs italic">
                                            {errors.trazado.message as string}
                                        </span>
                                    )}
                                    <input
                                        className="cursor-pointer file:cursor-pointer text-gray-700 w-full text-sm border border-gray-200 shadow-sm rounded-lg focus:z-10 
                                    focus:border-red-500 focus:ring-red-500 disabled:opacity-50 disabled:pointer-events-none 
                                    file:border-0 bg-gray-50 file:me-4 file:py-2 file:px-4 file:text-gray-600 file:italic 
                                    file:bg-gray-200 file:hover:bg-gray-300 hover:bg-gray-200"
                                        id="titulo"
                                        type="file"
                                        placeholder="Imagen"
                                        {...register("trazado", {
                                            // required: {
                                            //     value: isEditing ? false : true,
                                            //     message: 'Este campo es obligatorio'
                                            // },
                                        })}
                                    />
                                    {isEditing && (
                                        <div>
                                            <p className="text-gray-600 text-xs italic">
                                                Imagen del circuito
                                            </p>

                                            <img
                                                className="w-48 rounded-lg border-2 mb-4"
                                                src={
                                                    Constantes.IMAGE_BASE_URL +
                                                    editingTrazado
                                                }
                                                alt=""
                                            />
                                        </div>
                                    )}
                                </div>
                                <InputTextField
                                    label="Nombre"
                                    register={register}
                                    name="nombre"
                                    errors={errors}
                                    loading={loading}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <InputSelectField
                                    label="País"
                                    register={register}
                                    name="pais"
                                    errors={errors}
                                    loading={loading}
                                    options={paises}
                                />

                                <InputTextField
                                    label="Ciudad"
                                    register={register}
                                    name="ciudad"
                                    errors={errors}
                                    loading={loading}
                                />
                            </div>
                            <InputTextField
                                label="Número de vueltas"
                                register={register}
                                name="numeroVueltas"
                                errors={errors}
                                loading={loading}
                                isNumber={true}
                            />
                            <InputTextField
                                label="Longitud (metros)"
                                register={register}
                                name="longitud"
                                errors={errors}
                                loading={loading}
                                isNumber={true}
                            />
                            <div className="grid grid-cols-3 gap-3">
                                <InputTextField
                                    label="Curvas Lentas"
                                    register={register}
                                    name="curvasLentas"
                                    errors={errors}
                                    loading={loading}
                                    isNumber={true}
                                />
                                <InputTextField
                                    label="Curvas Medias"
                                    register={register}
                                    name="curvasMedias"
                                    errors={errors}
                                    loading={loading}
                                    isNumber={true}
                                />
                                <InputTextField
                                    label="Curvas Rápidas"
                                    register={register}
                                    name="curvasRapidas"
                                    errors={errors}
                                    loading={loading}
                                    isNumber={true}
                                />
                            </div>
                            <InputTextField
                                label="Nombre del Gran Premio"
                                register={register}
                                name="granPremio"
                                errors={errors}
                                loading={loading}
                            />
                        </div>
                        <div className="flex justify-start mt-5">
                            <InputButton
                                label={
                                    loading
                                        ? isEditing
                                            ? "Guardando..."
                                            : "Creando..."
                                        : isEditing
                                        ? "Guardar cambios"
                                        : "Crear circuito"
                                }
                                loading={loading}
                            />
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
};
export default FormCircuitos;
