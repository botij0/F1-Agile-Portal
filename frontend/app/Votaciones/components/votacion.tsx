export const Votacion = (props: any) => {
    return (
        <a 
            href={`/Votaciones/${props.id}`}
        className="grid rounded-2xl overflow-hidden border-solid border-[5px] border-red-700 w-[50%] p-2 bg-[#fef2f2]">
              <h6 className="font-bold text-xl text-red-700">
                {props.titulo}
              </h6>
              <p className="text-gray-600 font-bold">
                {props.descripcion}
              </p>
              <p className="text-gray-600 text-sm">
                {"La votación finalizará el " + formatearFecha(props.limite)}
              </p>
            </a>
    );
};

function formatearFecha(fecha: string) {
    if (!fecha) {
      return ""; // Devuelve un string vacío si no hay fecha
    }
    const meses = [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ];

    const c = { time: fecha };
    const fechaLimite = new Date(fecha);
    const dia = fechaLimite.getUTCDate();
    const mes = meses[fechaLimite.getUTCMonth()];
    const anno = fechaLimite.getUTCFullYear();
    const hora = fechaLimite.getUTCHours();
    const minutos = fechaLimite.getUTCMinutes();
    return `${dia} de ${mes} de ${anno} a las ${hora}:${minutos}`;
  }
