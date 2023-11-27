import Link from "next/link";
import React, { useState } from "react";

interface Usuario {
  id: number;
  username: string;
  email: string;
  nombre: string;
}

interface Props {
  usuario: Usuario;
  rechazarSolicitud: (e: React.MouseEvent, id: number) => void;
  updateResponsable: (e: React.MouseEvent, id: number) => void;
  updateAdmin: (e: React.MouseEvent, id: number) => void;
}

const FilaSolicitud: React.FC<Props> = ({
  usuario,
  rechazarSolicitud,
  updateResponsable,
  updateAdmin,
}) => {
  return (
    <tr key={usuario.id} className="border-b hover:bg-orange-100">
      <td className="text-left px-6 py-4 whitespace-nowrap ">
        <div className="text-sm text-gray-500">{usuario.id}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap ">
        <div className="text-sm text-gray-500">{usuario.username}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap ">
        <div className="text-sm text-gray-500">{usuario.email}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap ">
        <div className="text-sm text-gray-500">{usuario.nombre}</div>
      </td>
      <td className="text-right px-2 py-4 whitespace-nowrap justify-end">
        <button
          type="button"
          className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded focus:outline-none focus:shadow-outline"
          onClick={(e) => updateAdmin(e, usuario.id)}
        >
          Administrador
        </button>
        <button
          type="button"
          className="mr-3 text-sm bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
          onClick={(e) => updateResponsable(e, usuario.id)}
        >
          Responsable de equipo
        </button>

        <button
          type="button"
          className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
          onClick={(e) => rechazarSolicitud(e, usuario.id)}
        >
          Rechazar solicitud
        </button>
      </td>
    </tr>
  );
};

export default FilaSolicitud;
