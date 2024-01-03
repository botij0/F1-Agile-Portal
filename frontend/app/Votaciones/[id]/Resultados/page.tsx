"use client";
import { useState, useEffect } from "react";
import { postRequest, getRequest } from "@/app/(utils)/api";
import { useParams } from "next/navigation";
import { Orbitron } from 'next/font/google'
import  Constantes from "@/app/(utils)/constantes";
import Loading from "@/app/components/Loading";
import { Modal } from 'flowbite-react';
import { useForm } from "react-hook-form";

    const orbitron = Orbitron({ subsets: ['latin'] })

const VotacionesDetallePage = () => {

    const { id } = useParams<{ id: string }>();
    const [votacion, setVotacion] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [selected, setSelected] = useState<string>("");
    const [openModal, setOpenModal] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data: any) => {
      
        try {
            const response = await postRequest("votaciones/votar", {
                votacionId: id,
                opcionId: selected,
                nombre: data.nombre,
                email: data.email,
            });
            if (response.data) {
                alert(response.data.message);
                setOpenModal(false);
            }
        } catch (error) {
            console.error("Error fetching votacion:", error);
        }
    }



    const getVotacion = async (votacionId: string) => {
        setLoading(true);
        try {
            const response = await getRequest(`votaciones/${votacionId}`);
            setVotacion(response.data);
        } catch (error) {
            console.error("Error fetching votacion:", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (id) {
            getVotacion(id);
        }
    }, [id]);

    return (
        <div>
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <Loading />
                </div>
            ) : (
                <div>
                    <div className="w-full bg-red-500 h-32 items-center flex justify-center">
                        <div className={orbitron.className}>
                            <h2 className="text-2xl font-bold text-center {inter} text-white">
                                {votacion.titulo}
                                <p className="text-sm text-center text-white font-sans font-medium">
                                    {votacion.descripcion}
                                    </p>
                            </h2>
                        </div>
                    </div>
                    {votacion.opciones && votacion.opciones.length > 0 && (
                        <div className="mt-4   flex flex-col justify-center items-center">
                            <h3 className="text-xl font-bold my-8">Elige tu opción</h3>
                            {votacion.opciones.map((opcion: any) => (
                                <div key={opcion.id} className="flex items-center w-96">
                                    <div className="bg-gray-100 mb-2 rounded-lg flex px-4">
                                        <input
                                            type="radio"
                                            id={opcion.id}
                                            name="opcion"
                                            value={opcion.id}
                                            onChange={(e) => {
                                                setSelected(e.target.value);
                                            }
                                            }
                                        />
                                        <label htmlFor={opcion.id} className="ml-2 flex items-center relative gap-2 w-96 mb-2 p-2.5 rounded-lg">
                                            <img src={Constantes.IMAGE_BASE_URL + opcion.piloto.foto} onError={(e) => { e.currentTarget.src = 'https://hwchamber.co.uk/wp-content/uploads/2022/04/avatar-placeholder.gif' }}  
                                             className="w-20 h-20 rounded-xl object-cover  bg-white" />
                                                                                         <img className="w-8 absolute right-0 bottom-0" src={Constantes.IMAGE_BASE_URL + opcion.piloto.equipo.logo} onError={(e) => { e.currentTarget.src = 'https://hwchamber.co.uk/wp-content/uploads/2022/04/avatar-placeholder.gif' }} />
                                            <p className="text-lg font-bold">{opcion.piloto.nombre + " " + opcion.piloto.apellidos}</p>
                                        </label>
                                    </div>
                                </div>
                            ))}
                            <button onClick={() => setOpenModal(true)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4">
                                Votar
                            </button>
                                 <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Body className="bg-white rounded-t-3xl">
            <div className="flex flex-col items-center text-black">
            <h1 className="text-2xl font-bold">¡Ya casi has votado!</h1>
          <form className="w-full max-w-lg mt-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                  Nombre
                </label>
                <input {...register("nombre", { required: true })} className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="nombre" type="text" placeholder="Nombre" />
                {errors.nombre && <span className="text-red-500">El nombre es obligatorio</span>}
              </div>


                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                    Email
                    </label>
                    <input {...register("email", { required: true })} className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="email" type="email" placeholder="Email" />
                    {errors.email && <span className="text-red-500">El email es obligatorio</span>}
                     
                     </div>
            </div>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4" type="submit">
              Votar
            </button>
            </form>
            </div>
          
        </Modal.Body>
        <Modal.Footer className="bg-white rounded-b-3xl">
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={() => setOpenModal(false)}>Cerrar</button>
        </Modal.Footer>
      </Modal>
                            </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default VotacionesDetallePage;
