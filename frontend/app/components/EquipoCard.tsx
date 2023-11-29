import React, { useState } from "react";

interface Equipo {
  id: number;
  nombre: string;
  logo: string;
}

interface Props {
  equipo: Equipo;
}

const IMGS_BASE_URL =
  "https://pxfvrkflonlookyusxtb.supabase.co/storage/v1/object/public/Images/";

const EquipoCard: React.FC<Props> = ({ equipo }) => {
  const imagenUrl = IMGS_BASE_URL + equipo.logo + ".png";

  return (
    <div className="w-64 text-center rounded overflow-hidden shadow-lg">
      <div className="flex items-center justify-center h-32">
        <img
          className="w-20 h-auto"
          src={imagenUrl}
          alt={equipo.nombre + " logo"}
        />
      </div>
      <div className="px-6 py-4">
        <p className="text-gray-700 text-base">{equipo.nombre}</p>
      </div>
    </div>
  );
};

export default EquipoCard;
