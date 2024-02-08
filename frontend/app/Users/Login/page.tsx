"use client";
import { useForm } from "react-hook-form";
import { useAuth } from "@/app/context/Auth.Context";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cabecera from "@/app/components/Cabecera";
import Link from "next/link";

export default function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { signin, isAuthenticated } = useAuth();
    const router = useRouter();

    const onSubmit = handleSubmit((data: any) => {
        try {
            const request = {
                username: data.username,
                password: data.password,
            };
            signin(request);
        } catch (err) {
            console.log(err);
        }
    });

    useEffect(() => {
        if (isAuthenticated) {
            router.push("/");
        }
    }, [isAuthenticated]);

    return (
        <div className="px-24  xl:px-96">
            <Cabecera
                titulo="Iniciar Sesión"
                subtitulo="Inicia sesión para acceder a la plataforma"
            />
            <form
                className="max-w-lg mx-auto mt-10 bg-gray-50 p-10 rounded-xl"
                onSubmit={onSubmit}
            >
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                        Nombre de usuario
                    </label>
                    {errors.username && (
                        <span className="text-red-500 text-xs italic">
                            {errors.username.message as string}
                        </span>
                    )}
                    <input
                        type="username"
                        id="username"
                        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500
                       focus:border-red-500 block w-full p-2.5 "
                        placeholder="name@example.com"
                        {...register("username", {
                            required: {
                                value: true,
                                message: "Este campo es obligatorio",
                            },
                            maxLength: {
                                value: 50,
                                message:
                                    "El Usuario no puede tener mas de 50 caracteres",
                            },
                        })}
                    />
                </div>
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                        Contraseña
                    </label>
                    {errors.password && (
                        <span className="text-red-500 text-xs italic">
                            {errors.password.message as string}
                        </span>
                    )}
                    <input
                        type="password"
                        id="password"
                        className="border border-gray-300 text-gray-900 text-sm rounded-lg 
                        block w-full p-2.5 "
                        placeholder="********"
                        {...register("password", {
                            required: {
                                value: true,
                                message: "Este campo es obligatorio",
                            },
                            maxLength: {
                                value: 50,
                                message:
                                    "La Contraseña no puede tener mas de 50 caracteres",
                            },
                            minLength: {
                                value: 5,
                                message:
                                    "La Contraseña no puede tener menos de 5 caracteres",
                            },
                        })}
                    />
                </div>
                <div className="flex items-start mb-6">
                    <div className="flex items-center h-5">
                        <input
                            id="remember"
                            type="checkbox"
                            className="w-4 h-4 border border-gray-300 rounded  focus:ring-3 accent-red-700"
                        />
                    </div>
                    <label className="ml-2 text-sm font-medium text-gray-900">
                        Recuérdame
                    </label>
                    <Link
                        href="/Users/Register"
                        className="text-sm font-bold text-sky-600 hover:text-sky-700 ms-10"
                    >
                        ¿No tienes cuenta?
                    </Link>
                </div>
                <button
                    type="submit"
                    className="bg-red-600 hover:bg-red-700 text-white font-bold  py-2 px-6 rounded-lg"
                >
                    Iniciar sesión
                </button>
            </form>
        </div>
    );
}
