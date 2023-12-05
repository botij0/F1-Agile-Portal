import Link from 'next/link';
import React from 'react'

interface Equipo{
    id: number,
    logo: string,
    nombre: string,
    twitter: string,
}

interface Props{
    equipo: Equipo;
    deleteEquipo: (e: React.MouseEvent, id: number) => void;
}

const urlBaseImg = "https://pxfvrkflonlookyusxtb.supabase.co/storage/v1/object/public/Images/";

const UserMng :React.FC<Props> = ({equipo, deleteEquipo}) => {


  return (
        <tr key={equipo.id} className="border-b hover:bg-orange-100">
            
            <td className="text-left px-6 py-4 whitespace-nowrap ">
                <img src={urlBaseImg + equipo.logo} width={40} height={40} alt="cover" />                         
            </td>

            <td className="text-left px-6 py-4 whitespace-nowrap ">
                <div className="text-sm text-gray-500">
                        {equipo.nombre}
                </div>
            </td>

            <td className="text-left px-6 py-4 whitespace-nowrap ">
                <div className="text-sm text-gray-500">
                        {equipo.twitter}
                </div>
            </td>

            <td className="text-right px-2 py-4 whitespace-nowrap justify-end">
                <Link href={`/Equipos/Editar/${equipo.id}`} title='Editar Equipo' >
                    <button type="button"className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">
                        Editar
                    </button>
                </Link>

                <button type="button" onClick={(e) => deleteEquipo(e, equipo.id)}
                className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">
                        Eliminar
                </button>
            </td>
        </tr>
  )
}

export default UserMng