"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { getRequest, putRequest } from "@/app/(utils)/api";

const initialUser = { nombre: "", usuario: "", email: "", rol: "" };

const FormUser = () => {
  const [usuarios, setUsuarios] = React.useState(initialUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const params = useParams();
  const id = params.id;

  const onSubmit = handleSubmit((data: any) => {
    try {
      const request = {
        id: id,
        nombre: data.nombre,
        username: data.usuario,
        email: data.email,
        rol: data.rol,
      };
      putRequest("usuarios", request).then((response) => {
        if (!response.data.success) {
          toast.error(response.data.message);
        } else {
          toast.success(response.data.message, { duration: 4000 });
          window.location.href = "/Users";
        }
      });
    } catch (err) {
      console.log(err);
    }
  });

  if (id != undefined) {
    useEffect(() => {
      (async () => {
        try {
          const response = await getRequest("usuarios/" + id);

          setUsuarios(response.data.data);
          setValue("nombre", response.data.data.nombre);
          setValue("usuario", response.data.data.username);
          setValue("email", response.data.data.email);
          setValue("rol", response.data.data.rol);
        } catch (error) {
          console.log(error);
        }
      })();
    }, []);
  }

  return (
    <div className="container mx-auto my-8">
      <Toaster />
      <h2 className="text-black text-2xl">Editar Usuario</h2>
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

            <p className="text-gray-600 text-xs italic">Nombre personal</p>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="usuario"
            >
              Usuario
            </label>
            {errors.usuario && (
              <span className="text-red-500 text-xs italic">
                {errors.usuario.message as string}
              </span>
            )}
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded 
                                     p-2.5 mb-1 leading-tight focus:outline-none focus:bg-white"
              id="usuario"
              type="text"
              placeholder="Usuario"
              {...register("usuario", {
                required: {
                  value: true,
                  message: "Este campo es obligatorio",
                },
                maxLength: {
                  value: 50,
                  message: "El usuario no puede tener mas de 50 caracteres",
                },
              })}
            />

            <p className="text-gray-600 text-xs italic">Nombre de Usuario</p>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            {errors.email && (
              <span className="text-red-500 text-xs italic">
                {errors.email.message as string}
              </span>
            )}
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded 
                                     p-2.5 mb-1 leading-tight focus:outline-none focus:bg-white"
              id="email"
              type="email"
              placeholder="email@email.com"
              {...register("email", {
                required: {
                  value: true,
                  message: "Este campo es obligatorio",
                },
                maxLength: {
                  value: 256,
                  message: "El email no puede tener mas de 256 caracteres",
                },
              })}
            />

            <p className="text-gray-600 text-xs italic">Email</p>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="rol"
            >
              Rol
            </label>
            <select
              className=" block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded 
                                    p-2.5 mb-1 leading-tight focus:outline-none focus:bg-white"
              id="rol"
              {...register("rol", {
                required: {
                  value: true,
                  message: "Este campo es obligatorio",
                },
              })}
            >
              <option value="MIEMBRO">MIEMBRO</option>
              <option value="USUARIO">USUARIO</option>
              <option value="ADMIN">ADMIN</option>
            </select>

            <p className="text-gray-600 text-xs italic">Rol</p>
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

export default FormUser;
