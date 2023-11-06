import Link from 'next/link'
import {IoIosAddCircleOutline} from 'react-icons/io'

const NewsManagment = () => {
  return (
    <div className="container mx-auto my-8">

        <h2 className="text-black text-2xl">Gestión de Noticias</h2>
        <hr className="border-black w-[100%] mb-5 m-auto"/>

        <Link href="/Noticias/Crear" title='Crear Noticia' >
            <IoIosAddCircleOutline className="text-gray-500 hover:text-gray-800 w-7 h-7 mb-1 block ml-auto"/>
        </Link>

        <div className="flex shadow border-b">
            <table className="min-w-full">
                
                <thead className="bg-red-500 border-b">
                    <tr>
                        <th className="text-left font-medium text-white uppercase tracking-wide py-3 px-6">
                            Titulo
                        </th>
                        <th className="text-left font-medium text-white uppercase tracking-wide py-3 px-6">
                            Texto
                        </th>
                        <th className="text-right font-medium text-white uppercase tracking-wide py-3 px-6">
                            Acciones
                        </th>
                    </tr>
                </thead>

                <tbody className="bg-gray-50">
                    <tr className="border-b hover:bg-orange-100">
                        <td className="text-left px-6 py-4 whitespace-nowrap ">
                            <div className="text-sm text-gray-500">
                                Javier Gonzalez Soldado
                            </div>

                        </td>

                        <td className="text-left px-6 py-4 whitespace-nowrap ">
                            <div className="text-sm text-gray-500">
                                Javier Gonzalez Soldado
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

                    <tr className="border-b hover:bg-orange-100">
                        <td className="text-left px-6 py-4 whitespace-nowrap ">
                            <div className="text-sm text-gray-500">
                                Javier Gonzalez Soldado
                            </div>

                        </td>

                        <td className="text-left px-6 py-4 whitespace-nowrap ">
                            <div className="text-sm text-gray-500">
                                Javier Gonzalez Soldado
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
                </tbody>

            </table>

        </div>

    </div>
  )
}

export default NewsManagment