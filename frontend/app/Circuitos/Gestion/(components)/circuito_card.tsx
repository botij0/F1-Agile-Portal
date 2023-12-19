import Link from "next/link";
import Constantes from "@/app/(utils)/constantes";

const CircuitoCard = ({ circuito }: { circuito: any }) => {
    return (
        <>
            <Link
                href={`/Circuitos/Ver/${circuito.id}`}
                key={circuito.id}
                className="
              bg-white rounded-lg hover:shadow-lg p-4 flex flex-col justify-center items-center gap-4 border-2 border-red-500 min-h-[300px]
              "
            >
                <img
                    src={
                        circuito.trazado
                            ? Constantes.IMAGE_BASE_URL + circuito.trazado
                            : "https://via.placeholder.com/150"
                    }
                    alt=""
                    className="w-32 h-24 object-cover rounded-lg"
                />
                <div className="flex flex-col items-center gap-2 w-full">
                    <h1 className="text-xl font-bold ">{circuito.nombre}</h1>
                    <p className="text-sm bg-red-500 rounded-lg px-2 text-white font-bold ">
                        {circuito.granPremio}
                    </p>
                    <div className="flex flex-row gap-2 items-center justify-center">
                        <p className="text-sm">{circuito.temporadasInterv}</p>
                        <p className="text-sm">
                            {circuito.carreras?.length}{" "}
                            {circuito.carreras?.length > 1 ||
                            circuito.carreras?.length == 0
                                ? "carreras"
                                : "carrera"}
                        </p>
                    </div>
                    <div className="flex flex-row gap-2 items-center justify-center">
                        <p className="text-lg ">
                            {circuito.ciudad}, {circuito.paisNombre}
                        </p>
                        <img
                            src={`https://flagcdn.com/w20/${circuito.pais}.png`}
                            width="20"
                            alt="Ukraine"
                        />
                    </div>
                </div>
            </Link>
        </>
    );
};

export default CircuitoCard;
