"use client";

import Link from "next/link";
import { IoIosAddCircleOutline } from "react-icons/io";
import React, { useEffect, useState } from "react";
import { paginate } from "@/app/utils/paginate";
import Pagination from "@/app/components/Pagination";
import TeamRow from "@/app/components/Equipos/TeamRow";
import { getRequest, deleteRequest } from "@/app/(utils)/api";

const TeamsMng = () => {
  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [equipos, setEquipos] = useState<any[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const pagianteEquipos = paginate(equipos, currentPage, pageSize);

  useEffect(() => {
    const getEquipos = async () => {
      setLoading(true);
      try {
        const response = await getRequest("equipos");
        const data = await response.data.data;
        setEquipos(data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    getEquipos();
  }, []);

  const deleteEquipos = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    deleteRequest("equipos/" + id).then((res) => {
      if (equipos) {
        setEquipos((prevElement) => {
          if (prevElement == null) return null;
          else return prevElement.filter((user) => user.id !== id);
        });
      }
    });
  };

  return (
    <div className="container mx-auto my-8">
      <h2 className="text-black text-2xl">Gestión de Equipos</h2>
      <hr className="border-black w-[100%] mb-5 m-auto" />

      <Link
        href="/Equipos/Crear"
        title="Crear Equipo"
        className="flex w-7 ml-auto"
      >
        <IoIosAddCircleOutline className="text-gray-500 hover:text-gray-800 w-7 h-7 mb-0.5" />
      </Link>

      <div className="flex shadow border-b">
        <table className="min-w-full">
          <thead className="bg-red-500 border-b">
            <tr>
              <th className="text-left font-medium text-white uppercase tracking-wide py-3 px-6">
                Logo
              </th>
              <th className="text-left font-medium text-white uppercase tracking-wide py-3 px-6">
                Nombre
              </th>
              <th className="text-left font-medium text-white uppercase tracking-wide py-3 px-6">
                Twitter
              </th>
              <th className="text-right font-medium text-white uppercase tracking-wide py-3 px-6">
                Acciones
              </th>
            </tr>
          </thead>

          {
            //tarda un rato en cargar le he metido esto
            loading && (
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <div role="status" className="p-5 w-max">
                    <svg
                      aria-hidden="true"
                      className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-red-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                </tr>
              </tbody>
            )
          }

          {!loading && (
            <tbody className="bg-gray-50">
              {pagianteEquipos?.map(
                (equipo: {
                  id: number;
                  logo: string;
                  nombre: string;
                  twitter: string;
                }) => (
                  <TeamRow
                    key={equipo.id}
                    equipo={equipo}
                    deleteEquipo={deleteEquipos}
                  />
                )
              )}
            </tbody>
          )}
        </table>
      </div>
      <Pagination
        items={equipos == null ? 0 : equipos.length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default TeamsMng;
