import React from "react";
import Constantes from "@/app/(utils)/constantes";

interface Piloto {
    id: number;
    nombre: string;
    foto: string;
    apellidos: string;
}

interface Props {
    piloto: Piloto;
}

const PilotoCard: React.FC<Props> = ({ piloto }) => {
    const imagenUrl = Constantes.IMAGE_BASE_URL + piloto.foto;

    return (
        <div className="w-64 rounded h-auto shadow-lg hover:shadow-2xl mx-auto border-2">
            <a href={"/Pilotos/Detalles/" + piloto.id}>
                <div className="flex items-center justify-center h-40 ">
                    <img
                        className="w-48 max-h-36"
                        src={imagenUrl}
                        alt={piloto.nombre + " piloto"}
                    />
                </div>
                <div className="px-6 py-4 bg-red-600 h-12">
                    <p className="text-white text-xl text-center font-bold">
                        {piloto.nombre + " " + piloto.apellidos}
                    </p>
                </div>
            </a>
        </div>
    );
};

export default PilotoCard;
