"use client";
import Image from "next/image";
import VotacionesAbiertas from "@/app/components/Votaciones/VotacionesAbiertas";
import { SeccionUltimasNoticias } from "@/app/components/Noticias/SeccionUltimasNoticias";
import Cabecera from "./components/Cabecera";

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

            <div className="2xl:flex max-w-[90%] mx-auto mb-10">
                <div className="mx-auto 2xl:me-5">
                    <Cabecera
                        titulo="Noticias"
                        subtitulo="Últimas noticias de la semana"
                    />
                    {/* <UltimasNoticias /> */}
                    <SeccionUltimasNoticias />
                </div>
                <div className="max-w-[900px] mx-auto 2xl:ms-5 mt-5 2xl:mt-0">
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
