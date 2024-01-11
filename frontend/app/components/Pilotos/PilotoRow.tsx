import Link from "next/link";
import React from "react";
import Constantes from "@/app/(utils)/constantes";

interface Piloto {
    id: number;
    foto: string;
    nombre: string;
    twitter: string;
}

interface Props {
    piloto: Piloto;
    deletePiloto: (e: React.MouseEvent, id: number) => void;
}

const UserMng: React.FC<Props> = ({ piloto, deletePiloto }) => {
    return (
        <tr key={piloto.id} className="border-b hover:bg-orange-100">
            <td className="text-left px-6 py-4 whitespace-nowrap ">
                <img
                    src={Constantes.IMAGE_BASE_URL + piloto.foto}
                    width={40}
                    height={40}
                    alt="cover"
                />
            </td>

            <td className="text-left px-6 py-4 whitespace-nowrap ">
                <div className="text-sm text-gray-500">{piloto.nombre}</div>
            </td>

            <td className="text-left px-6 py-4 whitespace-nowrap ">
                <div className="text-sm text-gray-500">{piloto.twitter}</div>
            </td>

            <td className="text-right px-2 py-4 whitespace-nowrap justify-end">

                <Link
                    href={`/Pilotos/Editar/${piloto.id}`}
                    title="Editar Piloto"
                >
                    <button
                        type="button"
                        className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    >
                        Editar
                    </button>
                </Link>

                <button
                    type="button"
                    onClick={(e) => deletePiloto(e, piloto.id)}
                    className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                >
                    Eliminar
                </button>
            </td>
        </tr>
    );
};

export default UserMng;
