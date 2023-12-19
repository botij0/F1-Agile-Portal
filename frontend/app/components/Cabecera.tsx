const Cabecera = ({
    titulo,
    subtitulo,
}: {
    titulo: string;
    subtitulo: string;
}) => {
    return (
        <div className="">
            <div>
                <h1 className="text-2xl  mt-5 font-bold">{titulo}</h1>
                <p className="text-sm text-gray-500">{subtitulo}</p>
            </div>
            <hr className="mt-5" />
        </div>
    );
};

export default Cabecera;
