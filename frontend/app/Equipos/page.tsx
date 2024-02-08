import { EquiposPrincipal } from "@/app/components/Equipos/EquiposPrincipal";
import Cabecera from "../components/Cabecera";

export default function Equipos() {
    return (
        <div className="w-[80%] mx-auto">
            <Cabecera
                titulo="Equipos"
                subtitulo="Escuderías que compiten en la Fórmula 1"
            />
            <EquiposPrincipal />
        </div>
    );
}
