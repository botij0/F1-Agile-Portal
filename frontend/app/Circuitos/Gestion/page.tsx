"use client";
import React from "react";
import { useEffect, useState } from "react";
import PaginatedItems from "./(components)/table";
import Loading from "@/app/components/Loading";
import Cabecera from "@/app/components/Cabecera";
import { getRequest } from "@/app/(utils)/api";
const CircuitosGestionPage = () => {
    type Circuito = {
        id: number;
        nombre: string;
        ciudad: string;
        pais: string;
        trazado: string;
        paisNombre: string;
        temporadasInterv: string;
        granPremio: string;
        temporadas: number;
        carreras: [];
    };
    type Circuitos = Circuito[];

    const [circuitos, setCircuitos] = useState<Circuitos | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const getCircuitos = async () => {
        setLoading(true);
        try {
            const response = await getRequest("circuitos");
            setCircuitos(response.data.data);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        getCircuitos();
    }, []);

    return (
        <div className=" overflow-x-auto mt-[80px] px-24">
            <Cabecera
                titulo="Gestión de Circuitos"
                subtitulo="Aquí puedes gestionar los circuitos"
            />
            {loading ? (
                <Loading />
            ) : (
                <div className="overflow-hidden">
                    <PaginatedItems circuitos={circuitos} />
                </div>
            )}
        </div>
    );
};
export default CircuitosGestionPage;
