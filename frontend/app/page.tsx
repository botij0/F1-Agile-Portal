"use client";
import Image from "next/image";
import VotacionesAbiertas from "@/app/components/Votaciones/VotacionesAbiertas";
import Cabecera from "./components/Cabecera";
import dynamic from 'next/dynamic';

const SeccionUltimasNoticias = dynamic(() => 
  import("@/app/components/Noticias/SeccionUltimasNoticias").then((mod) => mod.SeccionUltimasNoticias),
  { ssr: false }
);

export default function Home() {
    return (
        <div>
            <Image
                src="/F1_Banner.jpg"
                width={1920}
                height={100}
                alt="cover"
                layout="responsive"
            />

            <div className="2xl:flex max-w-[95%] mx-auto mb-10 gap-5">
                <div className="mx-auto 2xl:me-5 mt-5 2xl:mt-0 w-[50%]">
                    <Cabecera
                        titulo="Noticias"
                        subtitulo="Últimas noticias de la semana"
                    />
                    {/* <UltimasNoticias /> */}
                    <SeccionUltimasNoticias />
                </div>
                <div className="mx-auto 2xl:ms-5 mt-5 2xl:mt-0 w-[50%]">
                    <Cabecera
                        titulo="Votaciones"
                        subtitulo="Principales votaciones de la semana"
                    />
                    <VotacionesAbiertas />
                </div>
            </div>
        </div>
    );
}
