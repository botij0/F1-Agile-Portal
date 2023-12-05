import { postRequest } from "@/app/(utils)/api";
import Cabecera from "@/app/components/Cabecera";
import { useParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const AgregarCarreras = (
    { getCarreras }: { getCarreras: Function }
) => {
    const [loading, setLoading] = useState(false);
    const [carreras, setCarreras] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState("");

    const params = useParams();

    const addCarrera = () => {
        if (!inputValue) {
            return;
        }
        try {
            setLoading(true);
            setCarreras([...carreras, inputValue]); // Push the date string directly
            setInputValue(""); // Clear input after adding
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const deleteCarrera = (index: number) => {
        const updatedCarreras = [...carreras];
        updatedCarreras.splice(index, 1);
        setCarreras(updatedCarreras);
    };

    const editCarrera = (index: number, newFecha: string) => {
        const updatedCarreras = [...carreras];
        updatedCarreras[index] = newFecha;
        setCarreras(updatedCarreras);
    };

    const saveCarreras = () => {
        if (carreras.length === 0) {
            return;
        }

        postRequest(`carreras/circuito/bulk/${params.id}`, carreras)
            .then(response => {
                if (response.data.success) {
                    getCarreras();
                    toast.success(response.data.message, { duration: 4000 });
                } else {
                    toast.error(response.data.message);
                }
            });
    }


    return (
        <div className="p-4 font-sans bg-gray-50 m-5 rounded-lg">
            {/* Add a Toggle */}
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold"> Lista de carreras </h2>
                <div className="flex items-center">
                    <button
                        onClick={() => console.log(carreras)}
                        className="px-4 py-2 w-fit bg-gray-800 text-white rounded-lg cursor-pointer"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
            <div className="">
                <div>
                    <h1 className="text-2xl  mt-5 font-bold" >Añadir carreras</h1>
                    <p className="text-sm text-gray-500">Añade la fecha de las carreras que se disputarán o se han disputado en este circuito</p>
                </div>
                <br className="mt-5" />

            </div>
            <div className="flex gap-2 items-center mb-4 p-5 bg-gray-100 rounded-lg border">
                <div>
                    <label className="block mb-2 text-sm font-bold text-gray-700">
                        Fecha
                    </label>

                    <input
                        type="date"
                        name="fecha"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="mb-2 border rounded px-2 py-1"
                    />
                </div>
                <button
                    onClick={addCarrera}
                    className="mt-4 text-xs px-4 py-2 bg-green-800 rounded-lg text-white  cursor-pointer"
                >
                    Agregar
                </button>

            </div>

            <div className="flex flex-col p-5 bg-gray-50 border rounded-lg">
                <h2 className="text-lg font-bold"> </h2>
                <hr className=" w-[100%] mb-5 m-auto mt-3" />
                {carreras.map((carrera, index) => (
                    <div
                        key={index}
                        className="flex items-center mb-2"
                    >
                        <input
                            type="date"
                            value={carrera}
                            onChange={(e) => editCarrera(index, e.target.value)}
                            className="mr-2 border rounded px-2 py-1"
                        />
                        <button
                            onClick={() => deleteCarrera(index)}
                            className="px-3 py-1 bg-red-500 text-white rounded cursor-pointer"
                        >
                            Eliminar
                        </button>
                    </div>
                ))}
                <p className="text-sm text-gray-500">
                    {carreras.length} nuevas por agregar
                </p>

                <button
                    onClick={() => saveCarreras()}
                    className="mt-4 px-4 py-2 w-fit bg-gray-800 text-white rounded-lg cursor-pointer"
                >
                    Guardar cambios
                </button>
            </div>
        </div>
    );
};

export default AgregarCarreras;
