"use client";

import { getRequest } from "@/app/(utils)/api";
import Constantes from "@/app/(utils)/constantes";
import DetallesEquipo from "@/app/components/Equipos/DetallesEquipo";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Equipo } from "@/app/logic/types";
import Cabecera from "@/app/components/Cabecera";
import Loading from "@/app/components/Loading";
import Link from "next/link";
import PilotoCard from "@/app/components/Pilotos/PilotoCard";

export default function page() {
    const { id } = useParams();
    const validId = typeof id === "string" ? id : undefined;

    const [equipo, setEquipo] = useState<Equipo | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const getEquipo = async () => {
        setLoading(true);
        if (validId) {
            try {
                const response = await getRequest("equipos/" + validId);
                if (response.data.success) {
                    setEquipo(response.data.data);
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        }
    };

    useEffect(() => {
        getEquipo();
    }, []);

    return (
        <div className="overflow-x-auto mt-[20px] px-24">
            {loading ? (
                <Loading />
            ) : (
                <div className="overflow-hidden">
                    <Cabecera
                        titulo={equipo?.nombre}
                        subtitulo="Escudería de Fórmula 1"
                    />
                    <div className="flex flex-col gap-4  mt-5">
                        <div className="w-[60%] flex items-center justify-center gap-16 mt-4 rounded-xl bg-gray-50 mx-auto py-10 shadow-xl">
                            <img
                                src={Constantes.IMAGE_BASE_URL + equipo?.logo}
                                alt={"Cover"}
                                className="w-auto rounded-lg max-h-48"
                            />
                            <div className="rounded-lg overflow-hidden border-red-500 border">
                                <table>
                                    <thead>
                                        <td className="w-fit p-2 font-bold">
                                            Nombre del Equipo
                                        </td>
                                        <td className="min-w-60 w-60 border-l pl-2  border-red-500 pr-2">
                                            {equipo?.nombre}
                                        </td>
                                    </thead>
                                    <thead className="border-red-500 border-t">
                                        <td className="w-fit p-2 font-bold">
                                            Twitter
                                        </td>
                                        <td className="  min-w-60 w-60 border-l pl-2  border-red-500 pr-2">
                                            <Link
                                                href={
                                                    "https://twitter.com/" +
                                                    equipo?.twitter
                                                }
                                                className="text-blue-500 underline"
                                            >
                                                {"@" + equipo?.twitter}
                                            </Link>
                                        </td>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 w-[60%] mx-auto">
                        <Cabecera
                            titulo="Pilotos"
                            subtitulo="Pilotos activos de la escudería"
                        />
                        <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-5 mt-8 rounded-xl text-white bg-gray-50 py-8 shadow-xl mb-10">
                            {equipo?.pilotos?.map((piloto) => (
                                <PilotoCard piloto={piloto} />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
