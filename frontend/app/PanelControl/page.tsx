"use client";
import React from "react";
import TarjetasControl from "@/app/components/TarjetasControl";
import Cabecera from "../components/Cabecera";
import withAdmin from "@/app/components/withAdmin";
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
            nombre: "Gestión Noticias",
            icono: "/news-icon.png",
            url: "/Noticias/Gestion",
        },
        {
            id: 2,
            nombre: "Solicitudes Usuarios",
            icono: "/solicitud-icon.png",
            url: "/Users/Solicitudes",
        },
        {
            id: 3,
            nombre: "Gestión Usuarios",
            icono: "/user-icon.png",
            url: "/Users",
        },
        {
            id: 4,
            nombre: "Gestión Circuitos",
            icono: "/circuit-icon.png",
            url: "/Circuitos/Gestion",
        },
        {
            id: 5,
            nombre: "Gestión Equipos",
            icono: "/team-icon.png",
            url: "/Equipos/Gestion",
        },
        {
            id: 6,
            nombre: "Gestión Pilotos",
            icono: "/piloto-icon.png",
            url: "/Pilotos/Gestion",
        },
        {
            id: 7,
            nombre: "Gestión Votaciones",
            icono: "/poll-icon.jpeg",
            url: "/Votaciones/Gestion",
        },
        {
            id: 8,
            nombre: "Gestión Coches",
            icono: "/coche-icon.png",
            url: "/Coches",
        },
    ];

    const { loading } = useAuth();

    return (
        <div className="overflow-x-auto px-24">
            {!loading && (
                <div className="mx-auto">
                    <Cabecera
                        titulo="Panel de control"
                        subtitulo="Gestione los datos de la aplicación"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 mx-auto mt-5">
                        {tarjetas?.map((tarjeta) => (
                            <TarjetasControl
                                tarjeta={tarjeta}
                                key={tarjeta.id}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default withAdmin(page);
