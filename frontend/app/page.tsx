import Image from "next/image";
import Link from "next/link";
import VotacionesAbiertas from "./components/VotacionesAbiertas";
import { UltimasNoticias } from "./components/UltimasNoticias";
import { SeccionUltimasNoticias } from "./components/SeccionUltimasNoticias";

export default function Home() {
  return (
    <div className="mt-[10px]">
      <Image src="/F1_Banner.jpg" width={1920} height={100} alt="cover" layout="responsive" />

      {/* <div className="flex mt-[30px] mx-auto justify-between max-w-[90%]">
        <div className="m-3 max-w-[100%]">
          <h2 className="font-bold text-center text-3xl mx-5 text-black mb-5 underline">
            Últimas Noticias
          </h2>
          <UltimasNoticias />
        </div>

        <div className="md:max-w-[40%] max-w-[100%] md:mr-5 m-3">
          <h2 className="font-bold text-center text-3xl mx-5 text-black underline">
            Votaciones Abiertas
          </h2>

          <VotacionesAbiertas />
        </div>
      </div> */}

      <div className="grid grid-cols-3 mt-[30px] mx-auto max-w-[90%]">
        <div className="col-span-2 mx-auto">
          <h2 className="font-bold text-center text-3xl mx-5 text-black mb-5 underline">
            Ultimas noticias
          </h2>
          {/* <UltimasNoticias /> */}
          <SeccionUltimasNoticias />
        </div>
        <div className="col-span-1">
          <h2 className="font-bold text-center text-3xl mx-5 text-black mb-5 underline">
            Votaciones
          </h2>
          <VotacionesAbiertas />
        </div>
      </div>
    </div>
  );
}
