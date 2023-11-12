"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { SeccionUltimasNoticias } from "../components/SeccionUltimasNoticias";
import { Noticia } from "./components/Noticia";

export default function Noticias() {
  const NOTICIA_API_BASE_URL = "http://localhost:8080/api/v1/noticias/principales";
  const IMAGEN_BASE_URL =
    "https://pxfvrkflonlookyusxtb.supabase.co/storage/v1/object/public/Images/";
  const LOGO_URL =
    "https://pxfvrkflonlookyusxtb.supabase.co/storage/v1/object/public/Images/0d8b4747-e641-4763-a7b4-f7ed168e37b7";
  const [noticias, setNoticias] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getNoticias = async () => {
      setLoading(true);
      console.log(noticias);
      try {
        const response = await axios.get(NOTICIA_API_BASE_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY5OTc5MDMyNiwiZXhwIjoxNjk5ODc2NzI2fQ.KDkCZSxFbytHHXYojSsIrVQeEmlVpPPH4HAOhvbIhpU", //localStorage.getItem('token'),
          },
        });
        const data = await response.data;
        setNoticias(data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    getNoticias();
  }, []);

  return (
    <div className="mt-[100px]  max-w-[90%] mx-auto">
      <h1 className="font-bold text-center uppercase text-3xl text-black">
        noticias
      </h1>
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-1 flex items-center">
          <SeccionUltimasNoticias />
        </div>
        <div className="col-span-1">
          <div className="grid grid-cols-2 grid-rows-2 gap-2 mt-5 max-h-[524px] overflow-hidden">
            <div>
              <Noticia
                url={
                  noticias.length > 0
                    ? `${IMAGEN_BASE_URL}${noticias[0].imagen}`
                    : LOGO_URL
                }
                titulo={noticias.length > 0 ? noticias[0].titulo : "Título de prueba"}
              />
            </div>
            <div>
              <Noticia
                url={
                  noticias.length > 0
                    ? `${IMAGEN_BASE_URL}${noticias[1].imagen}`
                    : LOGO_URL
                }
                titulo={noticias.length > 0 ? noticias[1].titulo : "Título de prueba"}
              />
            </div>
            <div>
              <Noticia
                url={
                  noticias.length > 0
                    ? `${IMAGEN_BASE_URL}${noticias[2].imagen}`
                    : LOGO_URL
                }
                titulo={noticias.length > 0 ? noticias[2].titulo : "Título de prueba"}
              />
            </div>
            <div>
              <Noticia
                url={
                  noticias.length > 0
                    ? `${IMAGEN_BASE_URL}${noticias[3].imagen}`
                    : LOGO_URL
                }
                titulo={noticias.length > 0 ? noticias[3].titulo : "Título de prueba"}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-3 mt-5">
        <div>
          <Noticia
            url={
              noticias.length > 0
                ? `${IMAGEN_BASE_URL}${noticias[4].imagen}`
                : LOGO_URL
            }
            titulo={noticias.length > 0 ? noticias[4].titulo : "Título de prueba"}
          />
        </div>
        <div>
          <Noticia
            url={
              noticias.length > 0
                ? `${IMAGEN_BASE_URL}${noticias[5].imagen}`
                : LOGO_URL
            }
            titulo={noticias.length > 0 ? noticias[5].titulo : "Título de prueba"}
          />
        </div>
        <div>
          <Noticia
            url={
              noticias.length > 0
                ? `${IMAGEN_BASE_URL}${noticias[6].imagen}`
                : LOGO_URL
            }
            titulo={noticias.length > 0 ? noticias[6].titulo : "Título de prueba"}
          />
        </div>
        <div>
          <Noticia
            url={
              noticias.length > 0
                ? `${IMAGEN_BASE_URL}${noticias[7].imagen}`
                : LOGO_URL
            }
            titulo={noticias.length > 0 ? noticias[7].titulo : "Título de prueba"}
          />
        </div>
        <div>
          <Noticia
            url={
              noticias.length > 0
                ? `${IMAGEN_BASE_URL}${noticias[8].imagen}`
                : LOGO_URL
            }
            titulo={noticias.length > 0 ? noticias[8].titulo : "Título de prueba"}
          />
        </div>
      </div>
    </div>
  );
}
