"use client";
import React from "react";
import { useEffect, useState } from "react";
import PaginatedItems from "@/app/components/Equipos/tablaCoches";
import Loading from "@/app/components/Loading";
import Cabecera from "@/app/components/Cabecera";
import { getRequest } from "@/app/(utils)/api";
const CochesGestionPage = () => {
    type Coche = {
        id: number;
        nombre: string;
        codigo: number;
        imagen: string;
        erscurvaLenta: number;
        erscurvaMedia: number;
        erscurvaRapida: number;
        consumo: number;
        equipo: {
            id: number;
            nombre: string;
        };
    };
    type Coches = Coche[];

    const [coches, setCoches] = useState<Coches | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const getCoches = async () => {
        setLoading(true);
        try {
            const response = await getRequest("coches");
            setCoches(response.data.data);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        getCoches();
    }, []);

    return (
        <div className=" overflow-x-auto mt-[20px] px-24">
            <Cabecera
                titulo="Gestión de Coches"
                subtitulo="Aquí puedes gestionar los coches"
            />
            {loading ? (
                <Loading />
            ) : (
                <div className="overflow-hidden">
                    <PaginatedItems coches={coches} />
                </div>
            )}
        </div>
    );
};
export default CochesGestionPage;
