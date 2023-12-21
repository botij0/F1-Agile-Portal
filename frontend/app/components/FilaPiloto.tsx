import Constantes from "../(utils)/constantes";

interface Piloto {
  id: number;
  nombre: string;
  apellidos: string;
  dorsal: number;
  pais: string;
  siglas: string;
  twitter: string;
  coche: number;
  equipo: number;
  foto: string;
}

interface Props {
  piloto: Piloto;
  editarPiloto: (e: React.MouseEvent, id: number) => void;
  borrarPiloto: (e: React.MouseEvent, id: number) => void;
}
const FilaPiloto: React.FC<Props> = ({
  piloto,
  editarPiloto,
  borrarPiloto,
}) => {
  return (
    <tr key={piloto.id} className="border-b hover:bg-orange-100">
      <td className="text-left px-6 py-4 whitespace-nowrap ">
        <div className="text-sm text-gray-500">{piloto.id}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap ">
        <div className="text-sm text-gray-500">{piloto.nombre}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap ">
        <div className="text-sm text-gray-500">{piloto.apellidos}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap ">
        <div className="text-sm text-gray-500">{piloto.dorsal}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap ">
        <div className="text-sm text-gray-500">{piloto.pais}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap ">
        <div className="text-sm text-gray-500">{piloto.siglas}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap ">
        <div className="text-sm text-gray-500">{piloto.twitter}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap ">
        <div className="text-sm text-gray-500">{piloto.coche}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap ">
        <div className="text-sm text-gray-500">{piloto.equipo}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap ">
        <div className="text-sm text-gray-500">
          {
            //TODO
            Constantes.IMAGE_BASE_URL + piloto.foto
          }
        </div>
      </td>

      <td className="text-right px-2 py-4 whitespace-nowrap justify-end">
        <button
          type="button"
          className="mr-3 text-sm bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
          onClick={(e) => editarPiloto(e, piloto.id)}
        >
          Editar
        </button>

        <button
          type="button"
          className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
          onClick={(e) => borrarPiloto(e, piloto.id)}
        >
          Borrar
        </button>
      </td>
    </tr>
  );
};
export default FilaPiloto;
