import React from "react";
import Constantes from "@/app/(utils)/constantes";

interface Equipo {
    id: number;
    nombre: string;
    logo: string;
}

interface Props {
    equipo: Equipo;
}

const EquipoCard: React.FC<Props> = ({ equipo }) => {
    const imagenUrl = Constantes.IMAGE_BASE_URL + equipo.logo;

    return (
        <div className="w-64 rounded overflow-hidden shadow-lg hover:shadow-2xl mx-auto border-2">
            {/** FALTA REDIRIGIR AL EQUIPO, PERO NO ESTABAN ACABADOS CUANDO LO IMPLEMENTÉ */}
            <a href={"/Equipos/Detalles/" + equipo.id}>
                <div className="flex items-center justify-center h-32 ">
                    <img
                        className="w-20 h-auto"
                        src={imagenUrl}
                        alt={equipo.nombre + " logo"}
                    />
                </div>
                <div className="px-6 py-4 bg-red-600">
                    <p className="text-white-700 text-xl text-center">
                        {equipo.nombre}
                    </p>
                </div>
            </a>
        </div>
    );
};

export default EquipoCard;
