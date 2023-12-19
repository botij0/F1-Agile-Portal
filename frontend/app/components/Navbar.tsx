"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import UserIcon from "./UserIcon";

const NavbarF: React.FC = () => {
    const [menuIcon, setMenuIcon] = useState(false);
    const [nombre, setNombre] = useState("");

    useEffect(() => {
        if (localStorage.getItem("nombre") == null) return;
        setNombre(localStorage.getItem("nombre") as string);
    }, []);

    const handleSmallerScreenNavigation = () => setMenuIcon(!menuIcon);

    const navLinks = [
        { text: "Inicio", href: "/" },
        { text: "Noticias", href: "/Noticias" },
        { text: "Votaciones", href: "/Votaciones" },
        { text: "Equipos", href: "/Equipos" },
        { text: "Circuitos", href: "/Circuitos" },
        { text: "Panel de Control", href: "/PanelControl" },
    ];

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("nombre");
        setNombre("");
    };

    return (
        <header className="bg-red-600 text-[#FFFFFF] w-full ease-in duration-300 fixed top-0 left-0 z-10">
            <nav className="max-w-[1800px] mx-auto h-[80px] flex justify-between items-center p-4">
                <div>
                    <Link href="/" onClick={handleSmallerScreenNavigation}>
                        <Image
                            src="/logo.png"
                            width={130}
                            height={15}
                            alt="F1 Logo"
                        />
                        <span className="font-extrabold text-2xl  md:text-sm xl:text-3xl uppercase self-center">
                            f1-agile-portal
                        </span>
                    </Link>
                </div>

                <ul className="hidden md:flex uppercase font-semibold text-xs xl:text-xl text-[#FFFFFF]">
                    {navLinks.map((link, index) => (
                        <li
                            key={index}
                            className={`mr-4 ${
                                index === navLinks.length - 1 ? "lg:mr-8" : ""
                            }`}
                        >
                            <Link
                                href={link.href}
                                className="hover:text-slate-400"
                            >
                                {link.text}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div>
                    <UserIcon />
                </div>

                <div
                    onClick={handleSmallerScreenNavigation}
                    className="flex md:hidden"
                >
                    {menuIcon ? (
                        <AiOutlineClose className="text-3xl text-white" />
                    ) : (
                        <AiOutlineMenu className="text-3xl text-white" />
                    )}
                </div>

                <div
                    className={`md:hidden absolute top-[80px] right-0 ${
                        menuIcon ? "bottom-0 left-0" : "left-[-100%]"
                    } flex justify-center items-center w-full h-screen bg-red-600 text${
                        menuIcon ? "-[#FFFFFF]" : "-white"
                    } text-center ease-in duration-300`}
                >
                    <div className="w-full mt-[-30%]">
                        <ul className="uppercase font-bold text-2xl text-center">
                            {navLinks.map((link, index) => (
                                <li
                                    key={index}
                                    onClick={handleSmallerScreenNavigation}
                                    className="py-5 hover:text-slate-400 cursor-pointer"
                                >
                                    <Link href={link.href}>{link.text}</Link>
                                </li>
                            ))}
                            {nombre != "" ? (
                                <>
                                    <li
                                        onClick={handleSmallerScreenNavigation}
                                        className="py-5 hover:text-slate-400 cursor-pointer"
                                    >
                                        <Link
                                            onClick={handleLogout}
                                            href="/Users/Perfil"
                                        >
                                            Perfil
                                        </Link>
                                    </li>

                                    <li
                                        onClick={handleSmallerScreenNavigation}
                                        className="py-5 hover:text-slate-400 cursor-pointer border-2 bg-red-700 hover:bg-red-800 mx-[10%] rounded-2xl mt-5"
                                    >
                                        <Link
                                            onClick={handleLogout}
                                            href="/Users/Login"
                                        >
                                            Cerrar Sesión
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li
                                        onClick={handleSmallerScreenNavigation}
                                        className="py-5 bg-gray-100 text-slate-800 hover:bg-slate-800 hover:text-gray-100 rounded-2xl uppercase font-bold px-8 mx-[10%] mt-5 mb-5"
                                    >
                                        <Link href="/Users/Login">
                                            Iniciar Sesion
                                        </Link>
                                    </li>
                                    <li
                                        onClick={handleSmallerScreenNavigation}
                                        className="py-5 border-2 border-gray-100 text-white hover:text-slate-400 hover:border-slate-400 rounded-2xl uppercase font-bold px-8 mx-[10%]"
                                    >
                                        <Link href="/Users/Register">
                                            Registrarse
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default NavbarF;
