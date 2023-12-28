"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { IoIosAddCircleOutline } from "react-icons/io";
import { paginate } from "../utils/paginate";
import Pagination from "./Pagination";
import { getRequest, deleteRequest } from "../(utils)/api";
import FilaPiloto from "./FilaPiloto";

export const GestionPilotos = () => {
  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pilotos, setPilotos] = useState<any[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const paginatePilotos = paginate(pilotos, currentPage, pageSize);

  useEffect(() => {
    const getPilotos = async () => {
      setLoading(true);
      try {
        const response = await getRequest("pilotos");
        const data = await response.data;
        setPilotos(data.data);
        console.log(data.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    getPilotos();
  }, []);

  const borrarPiloto = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    deleteRequest("pilotos/" + id).then((res) => {
      if (pilotos) {
        setPilotos((prevElement) => {
          if (prevElement == null) return null;
          else return prevElement.filter((user) => user.id !== id);
        });
      }
    });
  };

  return (
    <div className="container mx-auto my-8">
      <h2 className="text-black text-2xl">Pilotos</h2>
      <hr className="border-black w-[100%] mb-5 m-auto" />

      <Link
        href="Pilotos/Crear"
        title="Añadir Piloto"
        className="flex w-7 ml-auto"
      >
        <IoIosAddCircleOutline className="text-gray-500 hover:text-gray-800 w-7 h-7 mb-0.5" />
      </Link>

      <div className="flex shadow border-b">
        <table className="min-w-full">
          <thead className="bg-red-500 border-b">
            <tr>
              <th className="text-left font-medium text-white uppercase tracking-wide py-3 px-6">
                Id
              </th>
              <th className="text-left font-medium text-white uppercase tracking-wide py-3 px-6">
                Nombre
              </th>
              <th className="text-left font-medium text-white uppercase tracking-wide py-3 px-6">
                Apellidos
              </th>
              <th className="text-left font-medium text-white uppercase tracking-wide py-3 px-6">
                Dorsal
              </th>
              <th className="text-left font-medium text-white uppercase tracking-wide py-3 px-6">
                Pais
              </th>
              <th className="text-left font-medium text-white uppercase tracking-wide py-3 px-6">
                Siglas
              </th>
              <th className="text-left font-medium text-white uppercase tracking-wide py-3 px-6">
                Twitter
              </th>
              {
                //<th className="text-left font-medium text-white uppercase tracking-wide py-3 px-6">
                //  Coche
                //</th>
              }
              {
                //<th className="text-left font-medium text-white uppercase tracking-wide py-3 px-6">
                //  Equipo
                //</th>
              }

              <th className="text-left font-medium text-white uppercase tracking-wide py-3 px-6">
                Foto
              </th>
              <th className="text-right font-medium text-white uppercase tracking-wide py-3 px-6">
                Acciones
              </th>
            </tr>
          </thead>
          {!loading && (
            <tbody className="bg-gray-50">
              {paginatePilotos?.map(
                (piloto: {
                  id: number;
                  nombre: string;
                  apellidos: string;
                  dorsal: number;
                  pais: string;
                  siglas: string;
                  twitter: string;
                  coche: number;
                  equipo: number;
                  foto: string;
                }) => (
                  <FilaPiloto
                    key={piloto.id}
                    piloto={piloto}
                    borrarPiloto={borrarPiloto}
                  />
                )
              )}
            </tbody>
          )}
        </table>
      </div>
      <Pagination
        items={pilotos == null ? 0 : pilotos.length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
