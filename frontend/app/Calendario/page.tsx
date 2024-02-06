"use client";

import { useState, useEffect } from "react";

import { getRequestTokenless } from "../(utils)/api";
import { ItemCalendario } from "./components/ItemCalendario";

const CalendarioPage = () => {
    type elementoCalendario = {
        fechas: string;
        pais: string;
        ciudad: string;
    };
    type calendario = elementoCalendario[];

    const [calendario, setcalendario] = useState<calendario>([]);
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        const getCalendario = async () => {
            setLoading(true);
            try {
                const response = await getRequestTokenless("calendario");
                const data = await response.data;
                setcalendario(data);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        };
        getCalendario();
    }, []);

    return (
        <>
            <div className="">
                <div className="w-full bg-[url('/thumbnail-1.jpg')] bg-cover bg-center bg-no-repeat">
                    <div className="flex flex-col justify-center items-center h-40 bg-black bg-opacity-50">
                        <h1 className="text-5xl font-bold text-white">
                            CALENDARIO 2024
                        </h1>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 bg-red-100 w-[50%] m-auto">
                    {calendario.map((elemento, index) => (
                        <div className="col-span-1">
                            <ItemCalendario
                                indice={index + 1}
                                fechas={elemento.fechas}
                                pais={elemento.pais}
                                ciudad={elemento.ciudad}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default CalendarioPage;
