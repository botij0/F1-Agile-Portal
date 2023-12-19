"use client";

export const ItemCalendario = ({
    indice,
    fechas,
    pais,
    ciudad,
}: {
    indice: number;
    fechas: string;
    pais: string;
    ciudad: string;
}) => {
    return (
        <div className="grid grid-cols-5">
            <div className="flex col-span-1 bg-red-700 justify-center items-center">
                <h2 className="text-3xl font-bold align-middle text-white">{`R${indice}`}</h2>
            </div>
            <div className="col-span-4 bg-red-300 grid-rows-4 p-2">
                <div className="font-bold">{fechas}</div>
                <div className="font-bold">{pais}</div>
                <div>{ciudad}</div>
            </div>
        </div>
    );
};
