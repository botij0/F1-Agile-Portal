"use client";

import axios from "axios";
import { useState } from "react";

const IMAGEN_BASE_URL =
  "https://pxfvrkflonlookyusxtb.supabase.co/storage/v1/object/public/Images/";
const NOTICIA_API_URL_BASE = "http://localhost:8080/api/v1/noticias/";

//funcion para obtener el número de la noticia de la url
function urlId() {
  if (typeof window !== "undefined") {
    let tmp = window.location.href.slice(
      window.location.href.lastIndexOf("/"),
      window.location.href.length
    );
    return tmp.substring(1);
  }
  return "";
}

export default function Noticias() {
  const [titular, setTitular] = useState("");
  const [cuerpo, setCuerpo] = useState("");
  const [imagen, setImagen] = useState("");

  const getNoticiaParams = async () => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("token") != null) {
        const token = localStorage.getItem("token") || "";
        const response = await axios.get(NOTICIA_API_URL_BASE + urlId(), {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });
        setTitular(response.data.titulo);
        setCuerpo(response.data.texto);
        setImagen(response.data.imagen);
      }
    }
  };

  getNoticiaParams();

  return (
    <div className="mt-[100px]">
      <div className="content-center mx-96 my-5">
        <h1 className="font-bold text-center text-4xl text-black">{titular}</h1>
      </div>
      <div className="mx-96 my-5">
        <img src={IMAGEN_BASE_URL + imagen}></img>
      </div>
      <div className="mx-96">
        <p className="text-left text-black">{cuerpo}</p>
      </div>
    </div>
  );
}
