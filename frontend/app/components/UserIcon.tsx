import React from "react";
import Link from "next/link";
import axios from "axios";

const UserIcon = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");

    //GET a /me para obtener los datos del usuario
    const getName = async () => {
      const response = await axios.get(
        "http://localhost:8080/api/v1/usuarios/me",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      //Guardo nombre del usuario en localStorage
      localStorage.setItem("nombre", response.data.data.nombre);
    };

    getName();

    if (token != null && localStorage.getItem("nombre") != null) {
      //return icono + nombre
      return (
        <div className="flex items-center space-x-4">
          <svg
            className="w-9 h-9 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
          </svg>
          <div className="font-medium dark:text-white">
            <div>{localStorage.getItem("nombre")}</div>
          </div>
        </div>
      );
    }
  } else {
    //return botones inicio sesion/registro
    return (
      <div className="hidden md:flex">
        <div className="flex">
          <Link href="/Login">
            <button className="mr-5 bg-gray-100 text-slate-800 hover:bg-slate-800 hover:text-gray-100 rounded-2xl uppercase font-bold px-8 py-2">
              Iniciar Sesion
            </button>
          </Link>

          <Link href="/Register">
            <button className="border-2 border-gray-100 text-white hover:text-slate-400 hover:border-slate-400 rounded-2xl uppercase font-bold px-8 py-2">
              Registrarse
            </button>
          </Link>
        </div>
      </div>
    );
  }
};

export default UserIcon;
