"use client";

import { useEffect, useState } from "react";
import { Noticia } from "./components/Noticia";
import { Pagination } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getRequestPaginada } from "@/app/(utils)/api";
import Cabecera from "../components/Cabecera";

export default function Noticias() {
    const IMAGEN_BASE_URL =
        "https://pxfvrkflonlookyusxtb.supabase.co/storage/v1/object/public/Images/";
    const LOGO_URL =
        "https://pxfvrkflonlookyusxtb.supabase.co/storage/v1/object/public/Images/0d8b4747-e641-4763-a7b4-f7ed168e37b7";
    const [noticias, setNoticias] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalNoticias, setTotalNoticias] = useState(0);
    const [noticiasPorPagina, setNoticiasPorPagina] = useState(10);

    const theme = createTheme({
        palette: {
            primary: {
                main: "#B91C1C",
            },
        },
    });

    const cambiarPagina = (event: React.ChangeEvent<any>, page: number) => {
        debugger;
        setCurrentPage(page - 1);
    };

    useEffect(() => {
        const getNoticias = async () => {
            setLoading(true);
            console.log(noticias);
            try {
                const response = await getRequestPaginada(
                    "noticias/portal",
                    currentPage,
                    noticiasPorPagina
                );
                const data = await response.data;
                setNoticias(data.content);
                setTotalPages(data.totalPages);
                setTotalNoticias(data.totalElements);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        };
        getNoticias();
    }, [currentPage]);

    return (
        
        <div className="mt-[20px]  max-w-[90%] mx-auto">
            <Cabecera
                titulo="Noticias"
                subtitulo="Noticias ordenadas por fecha de publicación"
            />
            <div className="grid grid-cols-2 gap-3">
                {/*Imagen grande*/}
                <div className="col-span-1 flex items-center">
                    <div
                        className="relative float-left -mr-[100%] w-full transition-transform duration-[400ms] ease-in-out motion-reduce:transition-none overflow-hidden mt-5 hover:opacity-80"
                        data-te-carousel-active
                        data-te-carousel-item
                        style={{ backfaceVisibility: "hidden" }}
                    >
                        <a
                            href={`/Noticias/Noticia/${
                                noticias.length > 0 ? noticias[0].id : 0
                            }`}
                        >
                            <img
                                src={
                                    noticias.length > 0
                                        ? `${IMAGEN_BASE_URL}${noticias[0].imagen}`
                                        : LOGO_URL
                                }
                                className="block w-full h-[524px] rounded-3xl overflow-hidden border-solid border-8 border-red-700"
                                alt="..."
                            />
                            <div className="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-white md:block">
                                <h5
                                    className="text-xl"
                                    style={{
                                        fontWeight: "bold",
                                        background: "rgba(255,0,0,.5)",
                                    }}
                                >
                                    {noticias.length > 0
                                        ? noticias[0].titulo
                                        : ""}
                                </h5>
                            </div>
                        </a>
                    </div>
                </div>
                <div className="col-span-1">
                    <div className="grid grid-cols-2 grid-rows-2 gap-2 mt-5 max-h-[524px] overflow-hidden">
                        {noticias
                            .slice(1, 5)
                            .map((noticia: any, index: any) => (
                                <a href={`/Noticias/Noticia/${noticia.id}`}>
                                    <div
                                        key={index}
                                        className="hover:opacity-80"
                                    >
                                        <Noticia
                                            url={
                                                noticias.length > 0
                                                    ? `${IMAGEN_BASE_URL}${noticia.imagen}`
                                                    : LOGO_URL
                                            }
                                            titulo={
                                                noticias.length > 0
                                                    ? noticia.titulo
                                                    : "Título de prueba"
                                            }
                                        />
                                    </div>
                                </a>
                            ))}
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-5 gap-3 mt-5">
                {noticias.slice(5, 10).map((noticia: any, index: any) => (
                    <a href={`/Noticias/Noticia/${noticia.id}`}>
                        <div key={index} className="hover:opacity-80">
                            <Noticia
                                url={
                                    noticias.length > 0
                                        ? `${IMAGEN_BASE_URL}${noticia.imagen}`
                                        : LOGO_URL
                                }
                                titulo={
                                    noticias.length > 0
                                        ? noticia.titulo
                                        : "Título de prueba"
                                }
                            />
                        </div>
                    </a>
                ))}
            </div>
            <div className="flex items-center justify-center my-4">
                {totalPages > 1 && (
                    <ThemeProvider theme={theme}>
                        <Pagination
                            count={totalPages}
                            shape="rounded"
                            color="primary"
                            onChange={cambiarPagina}
                        />
                    </ThemeProvider>
                )}
            </div>
        </div>
    );
}
