import { useEffect, useState } from "react";
import Link from "next/link";

interface Votacion {
    title: string;
    description: string;
  }



export default function VotacionesAbiertas() {

    //Código provisional para mostrar las votaciones abiertas (estáticas):
    const votaciones = [
        { title: 'Votación 1', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus odio quam, consequat nec blandit at, dapibus et quam. Nulla ut cursus enim. Aliquam erat volutpat. In hac habitasse platea dictumst.' },
        { title: 'Votación 2', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus odio quam, consequat nec blandit at, dapibus et quam. Nulla ut cursus enim. Aliquam erat volutpat. In hac habitasse platea dictumst.' },
        { title: 'Votación 3', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus odio quam, consequat nec blandit at, dapibus et quam. Nulla ut cursus enim. Aliquam erat volutpat. In hac habitasse platea dictumst.' },
        { title: 'Votación 4', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus odio quam, consequat nec blandit at, dapibus et quam. Nulla ut cursus enim. Aliquam erat volutpat. In hac habitasse platea dictumst.' },
      ];

    /*
    ! Código a utilizar cuando se desarrolle el back para las votaciones
    const [votaciones, setVotaciones] = useState<Votacion[]>([]);

    useEffect(() => {
        // Realiza una llamada a la API aquí y actualiza el estado de votaciones con los datos obtenidos
        // Ejemplo ficticio de llamada a una API:
        fetch('tu_api/votaciones')
            .then(response => response.json())
            .then((data: Votacion[]) => setVotaciones(data));
    }, []);
    */
    return (
            <div className='bg-red-700 rounded-2xl mt-5 items-center h-[524px]'>
                {votaciones.map((votacion, index) => (
                    <div className="" key={index}>
                        <Link href="/Votaciones">
                            <div className='hover:text-slate-300 transition duration-300 ease-in-out hover:scale-105'>
                                <h3 className='font-bold text-center text-2xl m-3'>{votacion.title}</h3>
                                <p className='text-center px-5'>{votacion.description}</p>
                            </div>
                        </Link>
                    </div>
                ))}
                <br/>
            </div>
    );
}