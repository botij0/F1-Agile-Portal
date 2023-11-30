"use client";
import Image from "next/image";
import VotacionesAbiertas from "./components/VotacionesAbiertas";
import { SeccionUltimasNoticias } from "./components/SeccionUltimasNoticias";

export default function Home() {
  return (
    <div className="mt-[10px]">
      <Image src="/F1_Banner.jpg" width={1920} height={100} alt="cover" layout="responsive" />

      <div className="2xl:flex mt-[30px] max-w-[90%] mx-auto">
        <div className="mx-auto 2xl:me-5">
          <h2 className="font-bold text-center text-3xl text-black mb-5 underline">
            Ultimas noticias
          </h2>
          {/* <UltimasNoticias /> */}
          <SeccionUltimasNoticias />
        </div>
        <div className="max-w-[900px] mx-auto 2xl:ms-5 mt-5 2xl:mt-0">
          <h2 className="font-bold text-center text-3xl text-black mb-5 underline">
            Votaciones
          </h2>
          <VotacionesAbiertas />
        </div>
      </div>
    </div>
  );
}
