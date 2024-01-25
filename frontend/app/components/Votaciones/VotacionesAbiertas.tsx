import { useEffect, useState } from "react";
import Link from "next/link";
import { getRequest } from "@/app/(utils)/api";
import toast from "react-hot-toast";
import { Votacion } from "@/app/Votaciones/components/votacion";
import Loading from "../Loading";

interface Votacion {
    id: number;
    titulo: string;
    descripcion: string;
    limite: Date;
}

export default function VotacionesAbiertas() {
    const [loading, setLoading] = useState(true);
    const [votaciones, setVotaciones] = useState<Votacion[]>([]);

    const getVotaciones = async () => {
        setLoading(true);
        try {
            const response = await getRequest("votaciones/ultimas");
            const data = await response.data;
            console.log(data);
            if (data.success) {
                setVotaciones(data.data);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Error al obtener el circuito");
        }
        setLoading(false);
    };
    useEffect(() => {
        getVotaciones();
    }, []);

    return (
        <div className="mt-5">
            {loading && <Loading />}
            {votaciones.map((votacion: any, index: any) => (
                <div
                    key={index}
                    className="mt-2 justify-center flex hover:shadow-xl my-8 rounded-2xl"
                >
                    <Votacion
                        id={votacion.id}
                        titulo={votacion.titulo}
                        descripcion={votacion.descripcion}
                        limite={votacion.limite}
                    />
                </div>
            ))}
            <br />
        </div>
    );
}
