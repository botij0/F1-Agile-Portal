"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { z } from "zod";
import Constantes from "@/app/(utils)/constantes";
import { getRequest } from "@/app/(utils)/api";
import Loading from "@/app/components/Loading";
import circuitoSchema from "@/app/Circuitos/(common)/schema";

type CircuitoFormValues = z.infer<typeof circuitoSchema>;

const CircuitoVerPage = () => {
    const { id } = useParams<{ id: string }>();
    const [circuito, setCircuito] = useState<CircuitoFormValues | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const getCircuito = async (id: string) => {
        try {
            setLoading(true);
            const response = await getRequest("circuitos/" + id);
            const data = await response.data;

            if (data.success == true) {
                const circuito = data.data;

                setCircuito({
                    nombre: circuito.nombre,
                    pais: circuito.pais,
                    paisNombre: circuito.paisNombre,
                    ciudad: circuito.ciudad,
                    numeroVueltas: circuito.numeroVueltas,
                    longitud: circuito.longitud,
                    curvasLentas: circuito.curvasLentas,
                    curvasMedias: circuito.curvasMedias,
                    curvasRapidas: circuito.curvasRapidas,
                    granPremio: circuito.granPremio,
                    trazado: circuito.trazado
                        ? Constantes.IMAGE_BASE_URL + circuito.trazado
                        : null,
                    carreras: circuito.carreras,
                    temporadas: circuito.temporadas,
                    temporadasInterv: circuito.temporadasInterv,
                });
            } else {
                toast.error(data.message);
                router.push("/Circuitos");
            }
            setLoading(false);
        } catch (error) {
            toast.error("Error al obtener el circuito");
        }
    };
    useEffect(() => {
        getCircuito(id);
    }, []);

    return loading ? (
        <Loading />
    ) : (
        circuito && (
            <div className="w-full h-screen">
                <div
                    className="flex flex-col items-center justify-center w-full h-60 bg-red-500"
                    style={{
                        backgroundImage: `url(${circuito?.trazado})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                    }}
                >
                    <div className="flex flex-col justify-center items-center h-60 bg-black bg-opacity-50 w-full">
                        <h1 className="text-5xl font-bold text-white">
                            {circuito?.nombre}
                        </h1>
                    </div>
                </div>
                <div className="mx-24">
                    <div className="w-full flex items-center justify-center gap-4 mt-4 rounded-lg ">
                        <div className="rounded-lg overflow-hidden border-red-500 border">
                            <table>
                                <thead className="">
                                    <td className="w-fit ">
                                        <p className="p-2 font-bold">
                                            Nombre del circuito
                                        </p>
                                    </td>
                                    <td className="  min-w-60 w-60 border-l pl-2  border-red-500 pr-2">
                                        {circuito?.nombre}
                                    </td>
                                </thead>
                                <thead className="border-red-500 border-t">
                                    <td className="w-fit ">
                                        <p className="p-2 font-bold">País</p>
                                    </td>
                                    <td className="  min-w-60 w-60 border-l pl-2  border-red-500 pr-2">
                                        {circuito?.paisNombre}
                                    </td>
                                </thead>
                                <thead className="border-red-500 border-t">
                                    <td className="w-fit ">
                                        <p className="p-2 font-bold">Ciudad</p>
                                    </td>
                                    <td className="  min-w-60 w-60 border-l pl-2  border-red-500 pr-2">
                                        {circuito?.ciudad}
                                    </td>
                                </thead>
                                <thead className="border-red-500 border-t">
                                    <td className="w-fit ">
                                        <p className="p-2 font-bold">
                                            Inauguración
                                        </p>
                                    </td>
                                    <td className="  min-w-60 w-60 border-l pl-2  border-red-500 pr-2">
                                        {circuito?.carreras[0]?.fecha}
                                    </td>
                                </thead>
                                <thead className="border-red-500 border-t">
                                    <td className="w-fit ">
                                        <p className="p-2 font-bold">
                                            Número de vueltas
                                        </p>
                                    </td>
                                    <td className="  min-w-60 w-60 border-l pl-2  border-red-500 pr-2">
                                        {circuito?.numeroVueltas}
                                    </td>
                                </thead>
                                <thead className="border-red-500 border-t">
                                    <td className="w-fit ">
                                        <p className="p-2 font-bold">
                                            Longitud
                                        </p>
                                    </td>
                                    <td className="  min-w-60 w-60 border-l pl-2  border-red-500 pr-2">
                                        {circuito?.longitud} metros
                                    </td>
                                </thead>
                                <thead className="border-red-500 border-t">
                                    <td className="w-fit ">
                                        <p className="p-2 font-bold">
                                            Curvas Lentas
                                        </p>
                                    </td>
                                    <td className="  min-w-60 w-60 border-l pl-2  border-red-500 pr-2">
                                        {circuito?.curvasLentas}
                                    </td>
                                </thead>
                                <thead className="border-red-500 border-t">
                                    <td className="w-fit ">
                                        <p className="p-2 font-bold">
                                            Curvas Medias
                                        </p>
                                    </td>
                                    <td className="  min-w-60 w-60 border-l pl-2  border-red-500 pr-2">
                                        {circuito?.curvasMedias}
                                    </td>
                                </thead>
                                <thead className="border-red-500 border-t">
                                    <td className="w-fit ">
                                        <p className="p-2 font-bold">
                                            Curvas Rapidas
                                        </p>
                                    </td>
                                    <td className="  min-w-60 w-60 border-l pl-2  border-red-500 pr-2">
                                        {circuito?.curvasRapidas}
                                    </td>
                                </thead>
                                <thead className="border-red-500 border-t">
                                    <td className="w-fit ">
                                        <p className="p-2 font-bold">
                                            Temporadas
                                        </p>
                                    </td>
                                    <td className="  min-w-60 w-60 border-l pl-2  border-red-500 pr-2">
                                        {circuito?.temporadas}
                                    </td>
                                </thead>
                                <thead className="border-red-500 border-t">
                                    <td className="w-fit ">
                                        <p className="p-2 font-bold">Años</p>
                                    </td>
                                    <td className="  min-w-60 w-60 border-l pl-2  border-red-500 pr-2">
                                        {circuito?.temporadasInterv}
                                    </td>
                                </thead>
                                <thead className="border-red-500 border-t">
                                    <td className="w-fit ">
                                        <p className="p-2 font-bold">
                                            Gran Premio
                                        </p>
                                    </td>
                                    <td className="  min-w-60 w-60 border-l pl-2  border-red-500 pr-2">
                                        {circuito?.granPremio}
                                    </td>
                                </thead>
                            </table>
                        </div>
                        <img
                            src={circuito?.trazado}
                            alt="Trazado"
                            className="w-96 rounded-lg h-96 object-cover"
                        />
                    </div>
                </div>
            </div>
        )
    );
};

export default CircuitoVerPage;
