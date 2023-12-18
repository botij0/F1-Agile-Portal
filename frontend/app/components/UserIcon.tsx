"use client";
import React from "react";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";

const API_URL = "http://localhost:8080/api/v1/usuarios/me";
const UserIcon = () => {
  
  const [nombre, setNombre] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token == null) return;
    
    const getName = async () => {
      const response = await axios.get(
        API_URL,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " +  token,
          },
        }
      );
      localStorage.setItem("nombre", response.data.data.nombre);
      setNombre(response.data.data.nombre);
    };
    getName();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("nombre");
    setNombre("");
  }
  
  return (
    <>
      {(nombre != "") ? 
      <div className="hidden md:flex relative">
        <button className="flex bg-red-700 items-center space-x-4
                           hover:text-slate-400 border-2 rounded-2xl px-3 py-2"
        onClick={() => setIsOpen((prev) => !prev)}>
          <div className="font-medium pl-3 ">
            <div>{nombre}</div>
          </div>
          <svg
            className="w-9 h-9 pr-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
          </svg>

          {!isOpen ?(
            <AiOutlineCaretDown className="w-5 h-5" />
          ) :(
            <AiOutlineCaretUp className="w-5 h-5" />
          )}

        </button>
        {isOpen && (
          <div className="absolute py-2 w-[100%] bg-red-700 shadow-xl border-2 border-t-0 rounded-b-2xl mt-[25%]">
            <ul>
              
              <Link href="/Users/Perfil">
                <li className="px-4 py-2 hover:bg-red-800 hover:text-slate-400">
                  Perfil
                </li>
              </Link>              
              
              <Link onClick={handleLogout} href="/Users/Login">
                <li className="px-4 py-2 hover:bg-red-800 hover:text-slate-400">
                  Cerrar Sesion
                </li>
              </Link>
            </ul>
          </div>
          )}
      </div>
       : 
        <div className="hidden md:flex">
          <div className="flex">
            <Link href="/Users/Login">
              <button className="mr-5 bg-gray-100 text-slate-800 hover:bg-slate-800 hover:text-gray-100 rounded-2xl uppercase font-bold px-8 py-2">
                Iniciar Sesion
              </button>
            </Link>

            <Link href="/Users/Register">
              <button className="border-2 border-gray-100 text-white hover:text-slate-400 hover:border-slate-400 rounded-2xl uppercase font-bold px-8 py-2">
                Registrarse
              </button>
            </Link>
          </div>
        </div>
      }
    </>
  );
};

export default UserIcon;
