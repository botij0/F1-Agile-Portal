import Link from "next/link";
import Constantes from "@/app/(utils)/constantes";

const TarjetasControl = ({ tarjeta }: { tarjeta: any }) => {
    return (
        <>
            <Link
                href={`${tarjeta.url}`}
                key={tarjeta.id}
                className="
              bg-white rounded-lg hover:shadow-2xl hover:bg-slate-100 hover:border-red-700 
              p-4 flex flex-col justify-center items-center gap-4 border-2 border-red-500 min-h-[300px]
              "
            >
                <img
                    src={tarjeta.icono}
                    alt=""
                    className="w-40 h-40 rounded-lg"
                />
                <div className="flex flex-col items-center gap-2 w-full">
                    <h1 className="text-xl font-bold ">{tarjeta.nombre}</h1>
                </div>
            </Link>
        </>
    );
};

export default TarjetasControl;
