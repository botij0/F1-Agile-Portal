import Cabecera from "@/app/components/Cabecera";
import FormCoche from "@/app/components/Equipos/FormCoche";
import React from "react";

const page = () => {
    return (
        <div className=" overflow-x-auto px-24">
            <Cabecera
                titulo="Crear Coche"
                subtitulo="Crea el coche que desees"
            />
            <FormCoche />
        </div>
    );
};

export default page;
