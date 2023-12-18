"use client";

import { useState, useEffect } from "react";

import SkeletonCard from "./Gestion/(components)/skeleton";
import CircuitoCard from "./Gestion/(components)/circuito_card";
import { getRequest } from "../(utils)/api";

const CircuitosPage = () => {
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
      const data = await response.data;
      setCircuitos(data.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getCircuitos();
  }, []);

  return (
    <>
      <div className="">
        <div
          className="w-full bg-[url('/thumbnail-1.jpg')] bg-cover bg-center bg-no-repeat
        "
        >
          <div className="flex flex-col justify-center items-center h-60 bg-black bg-opacity-50">
            <h1 className="text-5xl font-bold text-white">
              Listado de circuitos
            </h1>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {loading && (
            <div className=" grid grid-cols-4 gap-2 w-screen animate-pulse">
              {[...Array(8)].map((e, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          )}
          {circuitos?.map((circuito) => (
            <CircuitoCard circuito={circuito} key={circuito.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default CircuitosPage;
