"use client";

import { useEffect, useState } from "react";
import Constantes from "@/app/(utils)/constantes";
import { getRequestTokenless } from "@/app/(utils)/api";
import Loading from "@/app/components/Loading";

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
                    <div className="mb-4">
                        <p className="uppercase font-bold text-5xl">
                            {piloto.nombre + " " + piloto.apellidos}
                        </p>
                    </div>

                    <div className="flex flex-wrap">
                        <div className="w-full md:w-1/2 lg:w-1/3 mt-4 md:mt-0">
                            <div className="text-sm text-gray-500  mx-4 ">
                                <img
                                    src={
                                        Constantes.IMAGE_BASE_URL + piloto.foto
                                    }
                                />
                            </div>
                        </div>

                        <div className="w-full md:w-1/2 lg:w-2/3 pr-4">
                            <table className="text-left text-3xl">
                                <tbody>
                                    <tr>
                                        <th>Nombre: </th>
                                        <td>{piloto.nombre}</td>
                                    </tr>
                                    <tr>
                                        <th>Apellidos: </th>
                                        <td>{piloto.apellidos}</td>
                                    </tr>
                                    <tr>
                                        <th>Equipo: </th>
                                        <td>
                                            <a
                                                href={
                                                    `/Equipos/Detalles/` +
                                                    piloto.equipo.id
                                                }
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500"
                                            >
                                                {piloto.equipo.nombre}
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Dorsal: </th>
                                        <td>{piloto.dorsal}</td>
                                    </tr>
                                    <tr>
                                        <th>Siglas: </th>
                                        <td>{piloto.siglas}</td>
                                    </tr>
                                    <tr>
                                        <th>País: </th>
                                        <td>
                                            <img
                                                src={`https://flagcdn.com/w20/${piloto.pais}.png`}
                                                width="35"
                                                alt={piloto.pais}
                                                className="border-2 border-black"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Twitter: </th>
                                        <td>
                                            <a
                                                href={`https://twitter.com/${piloto.twitter}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500"
                                            >
                                                @{piloto.twitter}
                                            </a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
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
