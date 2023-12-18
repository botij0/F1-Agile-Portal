"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { getRequest } from "@/app/(utils)/api";

export const SeccionUltimasNoticias = () => {
  const IMAGEN_BASE_URL =
    "https://pxfvrkflonlookyusxtb.supabase.co/storage/v1/object/public/Images/";
  const LOGO_URL =
    "https://pxfvrkflonlookyusxtb.supabase.co/storage/v1/object/public/Images/0d8b4747-e641-4763-a7b4-f7ed168e37b7";
  const [noticias, setNoticias] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getNoticias = async () => {
      setLoading(true);
      console.log(noticias);
      try {
        const response = await getRequest("noticias/ultimas");
        const data = await response.data;
        setNoticias(data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    getNoticias();
  }, []);
  return (
    <div
      id="carouselExampleCaptions"
      className="relative max-w-[900px] h-[524px] mt-5 group bg-black rounded-3xl overflow-hidden border-solid border-8 border-red-700 mx-auto"
      data-te-carousel-init
      data-te-ride="carousel"
    >
      {/*Carousel indicators*/}
      <div
        className="absolute bottom-0 left-0 right-0 z-[2] mx-[15%] mb-4 flex list-none justify-center p-0"
        data-te-carousel-indicators
      >
        <button
          type="button"
          data-te-target="#carouselExampleCaptions"
          data-te-slide-to="0"
          data-te-carousel-active=""
          className="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 
                      -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-te-target="#carouselExampleCaptions"
          data-te-slide-to="1"
          className="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0
                     -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-te-target="#carouselExampleCaptions"
          data-te-slide-to="2"
          className="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 
                    -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
          aria-label="Slide 3"
        ></button>
      </div>

      {/*Carousel items*/}
      <div className="relative w-[900px] overflow-hidden after:clear-both after:block after:content-['']">
        {/*First item*/}
        {/* <ImagenCarousel url={slides[0].url}/> */}
        <div
          className="relative float-left -mr-[100%] w-full transition-transform duration-[400ms] ease-in-out motion-reduce:transition-none overflow-hidden hidden 
                    data-[te-carousel-fade]:opacity-100 data-[te-carousel-fade]:z-[1]"
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
              className="block w-full h-[524px] rounded-3xl overflow-hidden hover:opacity-80"
              alt="..."
            />
            <div className="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-white md:block">
              <h5
                className="text-xl"
                style={{ fontWeight: "bold", background: "rgba(255,0,0,.5)" }}
              >
                {noticias.length > 0 ? noticias[0].titulo : "First slide label"}
              </h5>
            </div>
          </a>
        </div>
        {/*Second item*/}
        <div
          className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[400ms] ease-in-out motion-reduce:transition-none"
          data-te-carousel-item
          style={{ backfaceVisibility: "hidden" }}
        >
          <a
            href={`/Noticias/Noticia/${
              noticias.length > 0 ? noticias[1].id : 0
            }`}
          >
            <img
              src={
                noticias.length > 0
                  ? `${IMAGEN_BASE_URL}${noticias[1].imagen}`
                  : LOGO_URL
              }
              className="block w-full h-[524px] rounded-3xl overflow-hidden hover:opacity-80"
              alt="..."
            />
            <div className="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-white md:block">
              <h5
                className="text-xl"
                style={{ fontWeight: "bold", background: "rgba(255,0,0,.5)" }}
              >
                {noticias.length > 0
                  ? noticias[1].titulo
                  : "Second slide label"}
              </h5>
            </div>
          </a>
        </div>
        {/*Third item*/}
        <div
          className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[400ms] ease-in-out motion-reduce:transition-none"
          data-te-carousel-item
          style={{ backfaceVisibility: "hidden" }}
        >
          <a
            href={`/Noticias/Noticia/${
              noticias.length > 0 ? noticias[2].id : 0
            }`}
          >
            <img
              src={
                noticias.length > 0
                  ? `${IMAGEN_BASE_URL}${noticias[2].imagen}`
                  : LOGO_URL
              }
              className="block w-full h-[524px] rounded-3xl overflow-hidden hover:opacity-80"
              alt="..."
            />
            <div className="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-white md:block">
              <h5
                className="text-xl"
                style={{ fontWeight: "bold", background: "rgba(255,0,0,.5)" }}
              >
                {noticias.length > 0 ? noticias[2].titulo : "Third slide label"}
              </h5>
            </div>
          </a>
        </div>
      </div>

      {/*Carousel controls - prev item*/}
      <button
        className="absolute bottom-0 left-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 
                  transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none
                focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
        type="button"
        data-te-target="#carouselExampleCaptions"
        data-te-slide="prev"
      >
        <span className="inline-block h-8 w-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </span>
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Previous
        </span>
      </button>
      {/*Carousel controls - next item*/}
      <button
        className="absolute bottom-0 right-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity
                   duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline 
                   focus:opacity-90 focus:outline-none motion-reduce:transition-none"
        type="button"
        data-te-target="#carouselExampleCaptions"
        data-te-slide="next"
      >
        <span className="inline-block h-8 w-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </span>
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Next
        </span>
      </button>
    </div>
  );
};
