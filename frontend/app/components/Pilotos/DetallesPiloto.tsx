"use client";

import { useEffect, useState } from "react";
import Constantes from "@/app/(utils)/constantes";
import { getRequestTokenless } from "@/app/(utils)/api";
import Loading from "@/app/components/Loading";
import Link from "next/link";

interface Equipo {
    id: number;
    nombre: string;
}
interface Piloto {
    id: number;
    nombre: string;
    apellidos: string;
    dorsal: number;
    siglas: string;
    pais: string;
    twitter: string;
    foto: string;
    equipo: Equipo;
}

function DetallesPiloto(params: { id: string }): React.JSX.Element {
    //const id = window.location.href.split("/Detalles/", 2)[1]; //Chapuza para pillar el id, cambiar
    const id = params.id;
    const [piloto, setPiloto] = useState<Piloto | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        const getPiloto = async () => {
            setLoading(true);
            try {
                const response = await getRequestTokenless("pilotos/" + id);
                const data = await response.data.data;
                setPiloto(data);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        };
        getPiloto();
    }, []);

    return (
        <div>
            {loading && <Loading />}

            {!loading && piloto && (
                <div className="m-4">
                    <div className="content-center mx-auto border-b py-6 w-full shadow-sm ">
                        <h1 className="font-semibold text-center text-3xl mx-5">
                            {piloto.nombre + " " + piloto.apellidos}
                        </h1>
                    </div>
                    <div className="flex flex-col gap-4  mt-5">
                        <div className="w-[60%] flex items-center justify-center gap-16 mt-4 rounded-xl bg-gray-50 mx-auto py-10 shadow-xl flex-col xl:flex-row">
                            <img
                                src={Constantes.IMAGE_BASE_URL + piloto.foto}
                                alt={"Cover"}
                                className="w-auto rounded-lg max-h-64"
                            />
                            <div className="rounded-lg overflow-hidden border-red-500 border">
                                <table>
                                    <thead>
                                        <tr>
                                            <td className="w-fit p-2 font-bold">
                                                Nombre
                                            </td>
                                            <td className="min-w-60 w-60 border-l pl-2  border-red-500 pr-2">
                                                {piloto.nombre}
                                            </td>
                                        </tr>
                                    </thead>
                                    <thead className="border-red-500 border-t">
                                        <tr>
                                            <td className="w-fit p-2 font-bold">
                                                Apellidos
                                            </td>
                                            <td className="min-w-60 w-60 border-l pl-2  border-red-500 pr-2">
                                                {piloto.apellidos}
                                            </td>
                                        </tr>
                                    </thead>
                                    <thead className="border-red-500 border-t">
                                        <tr>
                                            <td className="w-fit p-2 font-bold">
                                                Equipo
                                            </td>
                                            <td className="min-w-60 w-60 border-l pl-2  border-red-500 pr-2">
                                                <Link
                                                    href={
                                                        `/Equipos/Detalles/` +
                                                        piloto.equipo.id
                                                    }
                                                    className="text-blue-500 hover:text-blue-700 underline"
                                                >
                                                    {piloto.equipo.nombre}
                                                </Link>
                                            </td>
                                        </tr>
                                    </thead>
                                    <thead className="border-red-500 border-t">
                                        <tr>
                                            <td className="w-fit p-2 font-bold">
                                                Dorsal
                                            </td>
                                            <td className="min-w-60 w-60 border-l pl-2  border-red-500 pr-2">
                                                {piloto.dorsal}
                                            </td>
                                        </tr>
                                    </thead>
                                    <thead className="border-red-500 border-t">
                                        <tr>
                                            <td className="w-fit p-2 font-bold">
                                                Siglas
                                            </td>
                                            <td className="min-w-60 w-60 border-l pl-2  border-red-500 pr-2">
                                                {piloto.siglas}
                                            </td>
                                        </tr>
                                    </thead>
                                    <thead className="border-red-500 border-t">
                                        <tr>
                                            <td className="w-fit p-2 font-bold">
                                                País
                                            </td>
                                            <td className="min-w-60 w-60 border-l pl-2  border-red-500 pr-2">
                                                <img
                                                    src={`https://flagcdn.com/w20/${piloto.pais}.png`}
                                                    width="35"
                                                    alt={piloto.pais}
                                                    className="border-2 border-black"
                                                />
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
                                                        piloto.twitter
                                                    }
                                                    className="text-blue-500 underline hover:text-blue-700"
                                                >
                                                    {"@" + piloto.twitter}
                                                </Link>
                                            </td>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {!loading && piloto == undefined && (
                <div className="uppercase font-bold text-3xl m-4">
                    No existe un piloto con ese id
                </div>
            )}
        </div>
    );
}

export default DetallesPiloto;
