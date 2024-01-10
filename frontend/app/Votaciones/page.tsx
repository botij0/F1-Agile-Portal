"use client";

import { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getRequestPaginada } from "@/app/(utils)/api";
import { Votacion } from "./components/votacion";
import Cabecera from "../components/Cabecera";

export default function Votaciones() {
  const IMAGEN_BASE_URL =
    "https://pxfvrkflonlookyusxtb.supabase.co/storage/v1/object/public/Images/";
  const LOGO_URL =
    "https://pxfvrkflonlookyusxtb.supabase.co/storage/v1/object/public/Images/0d8b4747-e641-4763-a7b4-f7ed168e37b7";
  const [votaciones, setVotaciones] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalVotaciones, setTotalVotaciones] = useState(0);
  const [votacionesPorPagina, setvotacionesPorPagina] = useState(10);

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
    const getVotaciones = async () => {
      setLoading(true);
      try {
        const response = await getRequestPaginada(
          "votaciones",
          currentPage,
          votacionesPorPagina
        );

        const data = await response.data;
        setVotaciones(data.content);
        setTotalPages(data.totalPages);
        setTotalVotaciones(data.totalElements);
        setvotacionesPorPagina(data.size);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    getVotaciones();
  }, [currentPage]);

  return (
    <div className="mt-[20px]  max-w-[90%] mx-auto">
      <Cabecera
        titulo="Votaciones"
        subtitulo="Bienvenido a la página de votaciones"
      />
      {
        loading && (
          <div className="flex items-center justify-center">
            <div role="status" className="p-5">
              <svg
                aria-hidden="true"
                className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-red-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )
      }
      {!loading && (
        <div>
          <div>
    
            {votaciones.map((votacion: any, index: any) => (
              <div key={index} className="hover:hue-rotate-180 mt-2 justify-center flex">

                  <Votacion
                    id={votacion.id}
                    titulo={votacion.titulo}
                    descripcion={votacion.descripcion}
                    limite={votacion.limite}
                  />

              </div>
            ))}
          </div>
        </div>
      )}
      <div className="flex items-center justify-center mt-2">
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
