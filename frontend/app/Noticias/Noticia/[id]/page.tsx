"use client";

import { useEffect, useState } from "react";
import Constantes from "@/app/(utils)/constantes";
import { getRequestTokenless } from "@/app/(utils)/api";
import { useParams } from "next/navigation";
import Loading from "@/app/components/Loading";

export default function Noticias() {
    const [titular, setTitular] = useState("");
    const [cuerpo, setCuerpo] = useState("");
    const [imagen, setImagen] = useState("");
    const [loading, setLoading] = useState(true);

    const params = useParams();
    const id = params.id;

    if (id != undefined) {
        useEffect(() => {
            (async () => {
                try {
                    setLoading(true);
                    const response = await getRequestTokenless(
                        "noticias/" + id
                    );
                    setTitular(response.data.titulo);
                    setCuerpo(response.data.texto);
                    setImagen(response.data.imagen);
                    setLoading(false);
                } catch (error) {
                    console.log(error);
                }
            })();
        }, []);
    }

    return (
        <div>
            {loading ? (
                <Loading />
            ) : (
        <div className="flex flex-col items-center justify-center">
            <div className="content-center mx-auto border-b py-6 w-full shadow-sm ">
                <h1 className="font-semibold text-center text-3xl mx-5">
                    {titular}
                </h1>
            </div>
            <div className="flex flex-col items-center w-[85%]">
                <div className="my-5">
                    <img
                        className="w-[650px] rounded-t-lg shadow-lg border-4 border-red-600"
                        src={Constantes.IMAGE_BASE_URL + imagen}
                    ></img>
                </div>
                <div className="mx-auto w-[45%] pb-12 text-justify">
                    <p dangerouslySetInnerHTML={{ __html: cuerpo }}></p>
                </div>
            </div>
        </div>
    )}

        </div>
    );
}
