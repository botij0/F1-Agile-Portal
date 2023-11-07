
import React, { useState } from 'react'

interface Noticia{
    id: number,
    titulo: string,
    texto: string,
}

interface Props{
    noticia: Noticia
}


const NoticiaMng: React.FC<Props> = ( {noticia }) => {

    const [isHovered, setIsHovered] = useState(false);

  return (
        <tr key={noticia.id} className="border-b hover:bg-orange-100">
            
            <td className="text-left px-6 py-4 whitespace-nowrap ">
                <div className="text-sm text-gray-500">
                        {noticia.titulo}
                </div>
            </td>

            <td className="text-left px-6 py-4 whitespace-nowrap ">
            <div className="text-sm text-gray-500"
            >
                <span title={noticia.texto}>
                        {noticia.texto.slice(0, 50) + '...'}
                </span>
            </div>

            </td>

            <td className="text-right px-2 py-4 whitespace-nowrap justify-end">
                <button type="button"className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">
                    Editar
                </button>
                <button type="button"className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">
                    Eliminar
                </button>
            </td>
        </tr>
  )
}

export default NoticiaMng