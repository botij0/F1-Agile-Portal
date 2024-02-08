import React from "react";
import { FaUniversity } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-red-600 shadow w-full md:h-[56px] h-auto">
            <div className="w-full mx-auto max-w-screen-xl p-4 grid md:grid-cols-2 grid-cols-1">
                <div className="col-span-1 text-center">
                    <span className="text-sm text-white">
                        © 2024{" "}
                        <a
                            href="https://flowbite.com/"
                            className="hover:underline"
                        >
                            F1-Met-AG-UAH™
                        </a>
                        . All Rights Reserved.
                    </span>
                </div>
                <div className="col-span-1 flex justify-center items-center mt-1 sm:mt-0">
                    <ul className="flex flex-wrap text-white">
                        <li>
                            <a
                                href="https://github.com/Javier-Gonzalez-Soldado/F1-Met-AG-"
                                aria-label="Homepage"
                                title="Repositorio de GitHub"
                                className=""
                            >
                                <svg
                                    className="text-white fill-current hover:text-gray-300"
                                    aria-hidden="true"
                                    height="24"
                                    version="1.1"
                                    viewBox="0 0 16 16"
                                    width="24"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
                                    ></path>
                                </svg>
                            </a>
                        </li>
                        <li className="ms-10">
                            <a
                                href="https://www.uah.es/es/"
                                aria-label="Homepage"
                                title="Universidad de Alcalá"
                                className=""
                            >
                                <FaUniversity className="h-[24px] w-[24px] hover:text-gray-300" />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
