import Link from 'next/link';
import React from 'react'

interface User{
    id: number,
    nombre: string,
    username: string,
    email: string,
    rol: string,
}

interface Props{
    usuario: User;
    deleteUser: (e: React.MouseEvent, id: number) => void;
}


const UserMng :React.FC<Props> = ({usuario, deleteUser}) => {


  return (
        <tr key={usuario.id} className="border-b hover:bg-orange-100">
            
            <td className="text-left px-6 py-4 whitespace-nowrap ">
                <div className="text-sm text-gray-500">
                        {usuario.nombre}
                </div>
            </td>

            <td className="text-left px-6 py-4 whitespace-nowrap ">
                <div className="text-sm text-gray-500">
                        {usuario.username}
                </div>
            </td>

            <td className="text-left px-6 py-4 whitespace-nowrap ">
                <div className="text-sm text-gray-500">
                        {usuario.email}
                </div>
            </td>

            <td className="text-left px-6 py-4 whitespace-nowrap ">
                <div className="text-sm text-gray-500">
                        {usuario.rol}
                </div>
            </td>

            <td className="text-right px-2 py-4 whitespace-nowrap justify-end">
                <Link href={`/Noticias/Editar/${usuario.id}`} title='Editar Usuario' >
                    <button type="button"className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">
                        Editar
                    </button>
                </Link>

                <button type="button" onClick={(e) => deleteUser(e, usuario.id)}
                className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">
                        Eliminar
                </button>

            </td>
        </tr>
  )
}

export default UserMng