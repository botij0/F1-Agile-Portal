"use client";

import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { useAuth } from "../context/Auth.Context";

const UserIcon = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [nombre, setNombre] = useState<String | undefined>("");

    const { logout, isAuthenticated, user, loading } = useAuth();

    useEffect(() => {
        setIsOpen(false);
        if (isAuthenticated) {
            setNombre(user?.nombre);
        }
    }, [user]);

    return (
        <>
            {isAuthenticated ? (
                <div className="hidden md:flex relative">
                    <button
                        className="flex bg-red-700 items-center space-x-4
                           hover:text-slate-400 border-2 rounded-2xl px-3 py-2"
                        onClick={() => setIsOpen((prev) => !prev)}
                    >
                        <div className="font-medium pl-3 ">
                            <div>{nombre}</div>
                        </div>
                        <svg
                            className="w-10 h-10 pr-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                        </svg>

                        {!isOpen ? (
                            <AiOutlineCaretDown className="w-5 h-5" />
                        ) : (
                            <AiOutlineCaretUp className="w-5 h-5" />
                        )}
                    </button>
                    {isOpen && (
                        <div className=" absolute py-0.5 w-[100%] bg-red-700 shadow-xl border-2 rounded-2xl top-16">
                            <ul>
                                <Link href="/Users/Perfil">
                                    <li
                                        className="px-4 py-2 hover:bg-red-800 hover:text-slate-400 rounded-2xl"
                                        onClick={() =>
                                            setIsOpen((prev) => !prev)
                                        }
                                    >
                                        Perfil
                                    </li>
                                </Link>

                                <Link onClick={logout} href="/Users/Login">
                                    <li
                                        className="px-4 py-2 hover:bg-red-800 hover:text-slate-400 rounded-2xl"
                                        onClick={() =>
                                            setIsOpen((prev) => !prev)
                                        }
                                    >
                                        Cerrar Sesion
                                    </li>
                                </Link>
                            </ul>
                        </div>
                    )}
                </div>
            ) : (
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
            )}
        </>
    );
};

export default UserIcon;
