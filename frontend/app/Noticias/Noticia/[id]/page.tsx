"use client";

import { useEffect, useState } from "react";
import Constantes from "@/app/(utils)/constantes";
import { getRequest } from "@/app/(utils)/api";
import { useParams } from "next/navigation";

export default function Noticias() {
  const [titular, setTitular] = useState("");
  const [cuerpo, setCuerpo] = useState("");
  const [imagen, setImagen] = useState("");

  const params = useParams();
  const id = params.id;

  if (id != undefined) {
    useEffect(() => {
      (async () => {
        try {
          const response = await getRequest("noticias/" + id);

          setTitular(response.data.titulo);
          setCuerpo(response.data.texto);
          setImagen(response.data.imagen);
        } catch (error) {
          console.log(error);
        }
      })();
    }, []);
  }

  return (
    <div className="mt-[100px] bg-red-600 rounded-2xl text-white w-[75%] mx-auto">
      <div className="content-center mx-auto my-5 pt-2">
        <h1 className="font-bold text-center text-4xl mx-5">{titular}</h1>
      </div>
      <div className="my-5">
        <img
          className="mx-auto max-w-2xl"
          src={Constantes.IMAGE_BASE_URL + imagen}
        ></img>
      </div>
      <div className="mx-auto w-[45%] pb-5">
        <p className="text-left  ">{cuerpo}</p>
      </div>
    </div>
  );
}
