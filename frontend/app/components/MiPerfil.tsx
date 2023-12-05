"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { MdModeEdit } from "react-icons/md";

const MiPerfil = () => {
  const USUARIOS_API_BASE_URL = "http://localhost:8080/api/v1/usuarios/me";
  const [usuario, setUsuario] = useState<any[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const appearanceInputs =
    "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white";

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

      <div className="w-30 h-auto">
        <button className="text-black">
          <MdModeEdit />
        </button>
      </div>

      {!loading && usuario && (
        <form className="max-w-sm mx-auto">
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Nombre
            </label>
            <input
              type="text"
              id="base-input"
              className={appearanceInputs}
              value={usuario.nombre}
              disabled
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 ">
              Nombre de usuario
            </label>
            <input
              type="text"
              id="base-input"
              className={appearanceInputs}
              value={usuario.username}
              disabled
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 ">
              Email
            </label>
            <input
              type="text"
              id="base-input"
              className={appearanceInputs}
              value={usuario.email}
              disabled
            />
          </div>

          <label className="block mb-2 text-sm font-medium text-gray-900 ">
            Rol
          </label>
          <select
            id="countries"
            className={appearanceInputs}
            disabled
            value={usuario.rol}
          />
          <option value="ADMIN">ADMIN</option>
          <option value="USUARIO">USUARIO</option>
          <option value="MIEMBRO">MIEMBRO</option>
        </form>
      )}
    </>
  );
};
export default MiPerfil;
