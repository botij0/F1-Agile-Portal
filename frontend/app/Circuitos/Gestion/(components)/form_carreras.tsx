"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { getRequest, postRequest } from "@/app/(utils)/api";
import ListaCarreras from "./lista_carreras";
import { carrerasSchema } from "./carreras_schema";
import Loading from "@/app/components/Loading";
import AgregarCarreras from "./agregar_carreras";

type Carreras = typeof carrerasSchema;

const FormCarreras = () => {

    const [loading, setLoading] = useState(false);
    const [carreras, setCarreras] = useState<Carreras[]>([]);
    const params = useParams();

    const getCarreras = async () => {
        setLoading(true);
        try {
            const response = await getRequest('carreras/circuito/' + params.id);

            if (response.data.success) {
                setCarreras(response.data.data);
                setLoading(false);
            } else {
                setLoading(false);
                toast.error(response.data.message);
            }
        } catch (error) {
            setLoading(false);
        }
    }

    useEffect(() => {
        getCarreras();
    }, []);


    return (
        loading ? <Loading /> :
            <div>
                <AgregarCarreras getCarreras={getCarreras} />
                <ListaCarreras carreras={carreras} getCarreras={getCarreras} />

            </div>
    );
}

export default FormCarreras;