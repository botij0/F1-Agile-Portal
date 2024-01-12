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
    <div className="w-64 rounded overflow-hidden shadow-lg hover:shadow-2xl mx-auto border-2">
      <a href={"/Pilotos/Detalles/" + piloto.id}>
        <div className="flex items-center justify-center h-32 ">
          <img
            className="w-20 h-auto"
            src={imagenUrl}
            alt={piloto.nombre + " piloto"}
          />
        </div>
        <div className="px-6 py-4 bg-red-600 h-12">
          <p className="text-white-700 text-xl text-center">
            {piloto.nombre + " " + piloto.apellidos}
          </p>
        </div>
      </a>
    </div>
  );
};

export default PilotoCard;
