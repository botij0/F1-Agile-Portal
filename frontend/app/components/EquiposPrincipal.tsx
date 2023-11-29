"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import EquipoCard from "./EquipoCard";

export const EquiposPrincipal = () => {
  const EQUIPOS_API_BASE_URL = "http://localhost:8080/api/v1/equipos";
  const [equipos, setEquipos] = useState<any[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getEquipos = async () => {
      setLoading(true);
      try {
        const response = await axios.get(EQUIPOS_API_BASE_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        const data = await response.data;
        setEquipos(data.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    getEquipos();
  }, []);
  console.log(equipos);

  return (
    <>
      {!loading && equipos && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2">
          {equipos.map((equipo) => (
            <EquipoCard equipo={equipo} />
          ))}
        </div>
      )}
    </>
  );
};
