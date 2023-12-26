"use client";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { CountryDropdown } from "../components/CountryDropdown";

const FormPiloto = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = handleSubmit((data: any) => {
    //TODO
  });

  const [country, setCountry] = useState<number>(1);

  return (
    //TODO
    <div className="container mx-auto my-8">
      <Toaster />
      <h2 className="text-black text-2xl">Crear Piloto</h2>
      <hr className="border-black w-[100%] mb-5 m-auto" />

      <form className="w-full max-w-lg mx-auto" onSubmit={onSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="nombre"
            >
              Nombre
            </label>

            {errors.nombre && (
              <span className="text-red-500 text-xs italic">
                {errors.nombre.message as string}
              </span>
            )}

            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded 
                                     p-2.5 mb-1 leading-tight focus:outline-none focus:bg-white"
              id="nombre"
              type="text"
              placeholder="Nombre"
              {...register("nombre", {
                required: {
                  value: true,
                  message: "Este campo es obligatorio",
                },
                maxLength: {
                  value: 50,
                  message: "El nombre no puede tener mas de 50 caracteres",
                },
              })}
            />

            <p className="text-gray-600 text-xs italic">Nombre del piloto</p>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="apellidos"
            >
              Apellidos
            </label>
            {errors.usuario && (
              <span className="text-red-500 text-xs italic">
                {errors.usuario.message as string}
              </span>
            )}
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded 
                                     p-2.5 mb-1 leading-tight focus:outline-none focus:bg-white"
              id="apellidos"
              type="text"
              placeholder="Apellidos"
              {...register("apellidos", {
                required: {
                  value: true,
                  message: "Este campo es obligatorio",
                },
                maxLength: {
                  value: 50,
                  message: "Los apellidos no pueden tener mas de 50 caracteres",
                },
              })}
            />

            <p className="text-gray-600 text-xs italic">Apellidos del piloto</p>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="dorsal"
            >
              Dorsal
            </label>
            {errors.usuario && (
              <span className="text-red-500 text-xs italic">
                {errors.usuario.message as string}
              </span>
            )}
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded 
                                     p-2.5 mb-1 leading-tight focus:outline-none focus:bg-white"
              id="dorsal"
              type="number"
              min="0"
              max="999"
              placeholder="Dorsal"
              {...register("dorsal", {
                required: {
                  value: true,
                  message: "Este campo es obligatorio",
                },
                maxLength: {
                  value: 50,
                  message: "El dorsal no puede tener mas de 50 caracteres",
                },
              })}
            />

            <p className="text-gray-600 text-xs italic">Dorsal del piloto</p>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="rol"
            >
              País
            </label>
            <CountryDropdown />
            <p className="text-gray-600 text-xs italic">
              País de nacimiento del piloto
            </p>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="siglas"
            >
              Siglas
            </label>
            {errors.usuario && (
              <span className="text-red-500 text-xs italic">
                {errors.usuario.message as string}
              </span>
            )}
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded 
                                     p-2.5 mb-1 leading-tight focus:outline-none focus:bg-white uppercase"
              id="siglas"
              type="text"
              placeholder="AAA"
              size={3}
              {...register("siglas", {
                required: {
                  value: true,
                  message: "Este campo es obligatorio",
                },
                maxLength: {
                  value: 3,
                  message: "Las siglas no pueden tener más de 3 letras",
                },
              })}
            />

            <p className="text-gray-600 text-xs italic">Siglas del piloto</p>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="siglas"
            >
              Twitter
            </label>
            {errors.usuario && (
              <span className="text-red-500 text-xs italic">
                {errors.usuario.message as string}
              </span>
            )}
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded 
                                     p-2.5 mb-1 leading-tight focus:outline-none focus:bg-white"
              id="twitter"
              type="text"
              placeholder="Twitter"
              {...register("twitter", {
                required: {
                  value: true,
                  message: "Este campo es obligatorio",
                },
                maxLength: {
                  value: 15,
                  message:
                    "La cuenta de twitter del piloto no puede tener más de 15 caracteres",
                },
              })}
            />

            <p className="text-gray-600 text-xs italic">
              Cuenta de twitter del piloto
            </p>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="siglas"
            >
              Coche del piloto
            </label>
            {errors.usuario && (
              <span className="text-red-500 text-xs italic">
                {errors.usuario.message as string}
              </span>
            )}
            <select
              className=" block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded 
                                    p-2.5 mb-1 leading-tight focus:outline-none focus:bg-white"
              id="coche"
              {...register("coche", {
                required: {
                  value: true,
                  message: "Este campo es obligatorio",
                },
              })}
            >
              <option value="" disabled selected hidden>
                Seleccione el coche del piloto
              </option>
              <option value="Coche1">Coche</option>
            </select>

            <p className="text-gray-600 text-xs italic">
              Coche que utiliza el piloto
            </p>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="equipo"
            >
              Equipo del piloto
            </label>
            {errors.usuario && (
              <span className="text-red-500 text-xs italic">
                {errors.usuario.message as string}
              </span>
            )}
            <select
              className=" block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded 
                                    p-2.5 mb-1 leading-tight focus:outline-none focus:bg-white"
              id="equipo"
              {...register("equipo", {
                required: {
                  value: true,
                  message: "Este campo es obligatorio",
                },
              })}
            >
              <option value="" disabled selected hidden>
                Seleccione el equipo del piloto
              </option>
              <option value="Equipo1">Equipo</option>
            </select>

            <p className="text-gray-600 text-xs italic">
              Equipo al que pertenece el piloto
            </p>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="foto"
            >
              Foto
            </label>
            {errors.usuario && (
              <span className="text-red-500 text-xs italic">
                {errors.usuario.message as string}
              </span>
            )}
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded 
                                     p-2.5 mb-1 leading-tight focus:outline-none focus:bg-white"
              id="foto"
              type="file"
              placeholder=""
              {...register("foto", {
                required: {
                  value: true,
                  message: "Este campo es obligatorio",
                },
              })}
            />

            <p className="text-gray-600 text-xs italic">Foto del piloto</p>
          </div>
        </div>

        <div className="mb-5 text-sm font-medium text-red-600 hover:text-red-700">
          <a href="/Login/RecuperarContrasena">¿Has olvidado la contraseña?</a>
        </div>

        <div className="flex flex-wrap mb-6 items-center ">
          <div className="w-full px-3 flex justify-center">
            <button
              className="bg-red-500 hover:bg-red-700 mr-5 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Guardar
            </button>

            <Link href="/Users">
              <button className="border-2 border-gray-400 text-red-500 hover:text-red-700 hover:border-slate-600 uppercase text-xs xl:text-base font-bold py-2 px-4 rounded">
                Volver
              </button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormPiloto;
