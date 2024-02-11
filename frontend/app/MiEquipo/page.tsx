"use client";
import React, { useEffect, useState } from "react";
import TarjetasControl from "@/app/components/TarjetasControl";
import Cabecera from "@/app/components/Cabecera";
import Constantes from "@/app/(utils)/constantes";
import Link from "next/link";
import { Equipo } from "@/app/logic/types";
import Loading from "@/app/components/Loading";
import withAuth from "@/app/components/withAuth";
import { useAuth } from "@/app/context/Auth.Context";

const page = () => {
    type tarjeta = {
        id: number;
        nombre: string;
        icono: string;
        url: string;
    };

    const tarjetas: tarjeta[] = [
        {
            id: 1,
            nombre: "Gestión Miembros",
            icono: "/user-icon.png",
            url: "/MiEquipo/Miembros",
        },
        {
            id: 2,
            nombre: "Gestión Pilotos",
            icono: "/piloto-icon.png",
            url: "/MiEquipo/Pilotos",
        },
        {
            id: 3,
            nombre: "Gestión Coches",
            icono: "/coche-icon.png",
            url: "/MiEquipo/Coches",
        },
        {
            id: 4,
            nombre: "Simuladores",
            icono: "/simulator-icon.png",
            url: "/Coches",
        },
    ];

    const [equipo, setEquipo] = useState<Equipo | undefined>(undefined);
    const { user, loading } = useAuth();

    useEffect(() => {
        setEquipo(user?.equipo);
    }, [user]);

    return (
        <div className="overflow-x-auto px-24">
            <div className="mx-auto">
                <Cabecera
                    titulo="Mi Equipo"
                    subtitulo="Tu equipo de Fórmula 1"
                />
                {loading ? (
                    <Loading />
                ) : equipo == null ? (
                    <div className="mt-10 bg-gray-100 w-[40%] p-10 rounded-xl mx-auto">
                        <h2 className="text-xl font-bold">
                            No tiene ningún equipo asignado
                        </h2>
                        <h3 className="text-lg text-gray-400 mb-5 font-bold">
                            Puede esperar a que un responsable de equipo le
                            acepte en su equipo <br /> o crear un nuevo equipo.
                        </h3>
                        <a href="/Equipos/Crear">
                            <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                                Crear Equipo
                            </button>
                        </a>
                    </div>
                ) : (
                    <>
                        <div className="flex flex-col gap-4  mt-5">
                            <div className="w-[60%] flex items-center justify-center gap-16 mt-4 rounded-xl bg-gray-50 mx-auto py-10 shadow-xl">
                                <img
                                    src={
                                        Constantes.IMAGE_BASE_URL + equipo?.logo
                                    }
                                    alt={"Cover"}
                                    className="w-auto rounded-lg max-h-48"
                                />
                                <div className="rounded-lg overflow-hidden border-red-500 border">
                                    <table>
                                        <thead>
                                            <tr>
                                                <td className="w-fit p-2 font-bold">
                                                    Nombre del Equipo
                                                </td>
                                                <td className="min-w-60 w-60 border-l pl-2  border-red-500 pr-2">
                                                    {equipo?.nombre}
                                                </td>
                                            </tr>
                                        </thead>
                                        <thead className="border-red-500 border-t">
                                            <tr>
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
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                                <a href={"/Equipos/Editar/" + equipo?.id}>
                                    <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                                        Editar Datos
                                    </button>
                                </a>
                            </div>
                        </div>
                        <Cabecera
                            titulo="Panel de Control"
                            subtitulo="Gestiona tu equipo de Fórmula 1"
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mx-auto mt-5">
                            {tarjetas?.map((tarjeta) => (
                                <TarjetasControl
                                    tarjeta={tarjeta}
                                    key={tarjeta.id}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default withAuth(page);
