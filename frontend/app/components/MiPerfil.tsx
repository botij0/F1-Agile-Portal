"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { MdModeEdit, MdBlock  } from "react-icons/md";


const initialUser = { nombre: '', username: '', email: '', rol: ''};
const appearanceInputs =
"appearance-none block w-full disabled:bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-1 leading-tight focus:outline-none bg-white";

interface camposHabilitados{
  nombre: boolean,
  username: boolean,
  email: boolean,
}

const MiPerfil = () => {
  const USUARIOS_API_BASE_URL = "http://localhost:8080/api/v1/usuarios/me";
  const [usuario, setUsuario] = useState(initialUser);
  const [loading, setLoading] = useState<boolean>(false);
  const [camposHabilitados, setCamposHabilitados] = useState<camposHabilitados>({
    nombre: false,
    username: false,
    email: false,
  })

  // Función para cambiar el estado de un campo específico
  const toggleCampo = (campo: keyof camposHabilitados) => {
    setCamposHabilitados((prevCamposHabilitados) => ({
      ...prevCamposHabilitados,
      [campo]: !prevCamposHabilitados[campo],
    }));
  };



  useEffect(() => {
    const getUsuario = async () => {
      setLoading(true);
      try {
        const response = await axios.get(USUARIOS_API_BASE_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        const data = await response.data;
        setUsuario(data.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    getUsuario();
  }, []);

  return (
    <>
      <div className="container mx-auto my-8">
        <h2 className="text-black text-2xl">Mi Perfil</h2>
        <hr className="border-black w-[100%] mb-5 m-auto" />
      </div>

      {!loading && usuario && (
        <form className="max-w-md mx-auto mt-10">
          <div className="mb-8 flex">
            <label className="block py-3 text-sm font-medium text-gray-900 me-5">
              Nombre: 
            </label>
            <input
              type="text"
              id="base-input"
              className={appearanceInputs}
              value={usuario.nombre}
              disabled = {!camposHabilitados.nombre}
            />
            <button type="button" className="text-gray-500 flex ms-5 p-3" title="Editar" onClick={() => toggleCampo('nombre')}>
              <MdModeEdit className="w-5 h-5 hover:text-gray-900 hover:border-slate-200" />
            </button>
          </div>
          <div className="mb-8 flex">
            <label className="block py-3 text-sm font-medium text-gray-900 me-5">
              Usuario: 
            </label>
            <input
              type="text"
              id="base-input"
              className={appearanceInputs}
              value={usuario.username}
              disabled = {!camposHabilitados.username}
            />
            <button type="button" className="text-gray-500 flex ms-5 p-3" title="Editar" onClick={() => toggleCampo('username')}>
              <MdModeEdit className="w-5 h-5 hover:text-gray-900 hover:border-slate-200" />
            </button>
          </div>
          <div className="mb-8 flex">
            <label className="block py-3 text-sm font-medium text-gray-900 me-8">
              Email: 
            </label>
            <input
              type="text"
              id="base-input"
              className={appearanceInputs}
              value={usuario.email}
              disabled = {!camposHabilitados.email}
            />
            <button type="button" className="text-gray-500 flex ms-5 p-3" title="Editar" onClick={() => toggleCampo('email')}>
              <MdModeEdit className="w-5 h-5 hover:text-gray-900 hover:border-slate-200" />
            </button>
          </div>
          <div className="mb-5 flex">
            <label className="block py-3 text-sm font-medium text-gray-900 me-11 ">
              Rol:
            </label>
            <select
              id="countries"
              className={appearanceInputs}
              value={usuario.rol}
              disabled
              >
              <option value="ADMIN">ADMIN</option>
              <option value="USUARIO">USUARIO</option>
              <option value="MIEMBRO">MIEMBRO</option>
            </select>
            <button type="button" className="text-gray-500 flex ms-5 p-3" title="El rol no se puede modificar, contacte con el administrador">
              <MdBlock  className="w-5 h-5 text-gray-900" />
            </button>
          </div>
        </form>
      )}
    </>
  );
};
export default MiPerfil;
