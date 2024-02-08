import Cabecera from "@/app/components/Cabecera";
import FormCoche from "@/app/components/Equipos/FormCoche";
import React from "react";

const page = () => {
    return (
        <div className=" overflow-x-auto px-24">
            <Cabecera
                titulo="Editar Coche"
                subtitulo="Crea los campos del coche que desees"
            />
            <FormCoche />
        </div>
    );
};

export default page;
