"use client";

import { useState, useEffect } from "react";

import { getRequestTokenless } from "../(utils)/api";
import { ItemCalendario } from "./components/ItemCalendario";
import { SkeletonItemCalendario } from "./components/SkeletonItemCalendario";

const CalendarioPage = () => {
  type elementoCalendario = {
    fechas: string;
    pais: string;
    ciudad: string;
    idCircuito: number;
  };
  type calendario = elementoCalendario[];

  const [calendario, setcalendario] = useState<calendario>([]);
  const [loading, setLoading] = useState<boolean>(false);
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
  useEffect(() => {
    getCalendario();
  }, []);

  return (
    <>
      <div className="">
        <div className="w-full bg-[url('/thumbnail-1.jpg')] bg-cover bg-center bg-no-repeat">
          <div className="flex flex-col justify-center items-center h-40 bg-black bg-opacity-50">
            <h1 className="text-5xl font-bold text-white">CALENDARIO 2024</h1>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 w-[50%] m-auto">
          {loading &&
            [...Array(24)].map((e, i) => (
              <div className="col-span-1 animate-pulse rounded-xl overflow-hidden border-gray-400 border-solid border-4">
                <SkeletonItemCalendario key={i} />
              </div>
            ))}
          {!loading &&
            calendario.map((elemento, index) => (
              <div key={index} className="col-span-1 rounded-xl overflow-hidden">
                <ItemCalendario
                  indice={index + 1}
                  fechas={elemento.fechas}
                  pais={elemento.pais}
                  ciudad={elemento.ciudad}
                  idCircuito={elemento.idCircuito}
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default CalendarioPage;
