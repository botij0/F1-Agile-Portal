import { deleteRequest } from "@/app/(utils)/api";
import { carrerasSchema } from "./carreras_schema";
import toast from "react-hot-toast";

type Carreras = typeof carrerasSchema;

const ListaCarreras = ({
    carreras,
    getCarreras,
}: {
    carreras: Carreras[];
    getCarreras: Function;
}) => {
    function handleDelete(id: any) {
        if (confirm("¿Estás seguro de que quieres eliminar esta carrera?")) {
            deleteRequest("carreras/" + id).then((response) => {
                if (response.data.success) {
                    toast.success(response.data.message, { duration: 4000 });
                    getCarreras();
                } else {
                    toast.error(response.data.message);
                }
            });
        }
    }

    return (
        (carreras.length > 0 && (
            <div className="mt-5 bg-gray-50 p-5 rounded-lg mx-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-bold"> Lista de carreras </h2>
                </div>
                <hr className=" w-[100%] mb-5 m-auto mt-3" />
                <div className="rounded-lg overflow-hidden">
                    <table className="table-auto w-full ">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                            <tr className="text-gray-950">
                                <th className="px-4 py-2">Nº</th>
                                <th className="px-4 py-2">Fecha</th>
                                <th className="px-4 py-2">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {carreras.map((carrera, index) => (
                                <tr
                                    key={index}
                                    className="text-gray-900 bg-gray-100 border-b border-gray-100 hover:bg-white"
                                >
                                    <td className=" px-4 py-2 text-center">
                                        {index + 1}
                                    </td>
                                    <td className=" px-4 py-2 text-center">
                                        {carrera.fecha}
                                    </td>
                                    <td className=" px-4 py-2 flex items-center justify-center">
                                        <button
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg mr-2"
                                            onClick={() => {
                                                handleDelete(carrera.id);
                                            }}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )) || (
            <div className="mt-5 bg-gray-50 p-5 rounded-lg">
                <h2 className="text-lg font-bold"> Lista de carreras </h2>
                <hr className=" w-[100%] mb-5 m-auto mt-3" />
                <div className="flex flex-wrap -mx-3 mb-6 bg-gray-50 rounded-lg p-5">
                    <h2 className="text-lg font-bold">
                        {" "}
                        No hay carreras para mostrar{" "}
                    </h2>
                </div>
            </div>
        )
    );
};

export default ListaCarreras;
