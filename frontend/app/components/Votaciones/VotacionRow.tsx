import Link from "next/link";
import React from "react";

interface Votacion {
                                    id: number;
                                    titulo: string;
                                    limite: string;
                                    totalVotos: string;
}



interface Props {
    votacion: Votacion;
    deleteVotacion: (e: React.MouseEvent, id: number) => void;
}

const UserMng: React.FC<Props> = ({ votacion, deleteVotacion }) => {


    function isOver(limite: any) {
        const fechaActual = new Date();
        const fechaLimite = new Date(limite);
        return fechaActual > fechaLimite;
    }


    return (
        <tr key={votacion.id} className="border-b hover:bg-orange-100">
        
            <td className="text-left px-6 py-4 whitespace-nowrap ">
                <div className="text-sm text-gray-500">{votacion.titulo}</div>
            </td>

            <td className="text-left px-6 py-4 whitespace-nowrap ">
                <div className="text-sm text-gray-500">{votacion.limite}</div>
            </td>
                <td className="text-left px-6 py-4 whitespace-nowrap ">
                <div className="text-sm text-gray-500">{votacion.totalVotos}</div>
            </td>
            <td className="text-left px-6 py-4 whitespace-nowrap ">
                <div className="text-sm text-gray-500">{isOver(votacion.limite) ? "Finalizada" : "En curso"}</div>
            </td>
            
            

            <td className="text-right px-2 py-4 whitespace-nowrap justify-end">

                <Link
                    href={`/Votaciones/${votacion.id}`}
                    title="Ver Votacion"
                >
                    <button
                        type="button"
                        className="mr-3 text-sm bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    >
                        Ver
                    </button>
                </Link>
                <Link
                    href={`/Votaciones/Editar/${votacion.id}`}
                    title="Editar Votacion"
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
                    onClick={(e) => deleteVotacion(e, votacion.id)}
                    className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                >
                    Eliminar
                </button>
            </td>
        </tr>
    );
};

export default UserMng;
