"use client";

import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { postRequest } from "@/app/(utils)/api";

const registerURL =
    process.env.REGISTER_URL || "http://localhost:8080/auth/signup";

const PERSON_NAME_REG_EX = /^[a-záéíóúñ.'-]+(?:\s[a-z.'-]+)*$/i;
const USERNAME_REG_EX = /^[a-z_][a-z0-9_]{1,19}$/i;
const EMAIL_REG_EX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,40}$/i;
//const PASSWORD_REG_EX = /^(?=.*[A-Z])(?=.*\d)[A-Z\d.]{8,32}$/i

const labelConfig = "block mb-2 text-sm font-medium text-white-900";
const fieldsConfig =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5";

export default function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();

    const onSubmit = handleSubmit((data: any) => {
        try {
            const request = {
                name: data.name,
                username: data.username,
                email: data.email,
                password: data.password1,
            };
            postRequest(registerURL, request).then((response) => {
                if (!response.data.success) {
                    toast.error(response.data.message);
                } else {
                    toast.success(response.data.message);
                    localStorage.setItem("token", response.data.token);
                    window.location.href = "/";
                }
            });
        } catch (err) {
            console.log(err);
        }
    });

    return (
        <div className="mt-[20px] text-black">
            <h2 className="text-black text-2xl w-[50%] m-auto">Crear Cuenta</h2>
            <hr className="border-black w-[50%] mb-5 m-auto" />
            <form className="mx-auto max-w-xs" onSubmit={onSubmit}>
                <div className="mb-6">
                    <label className={labelConfig}>
                        Nombre de visualización
                    </label>

                    {errors.name && (
                        <span className="text-red-500 text-xs italic">
                            {errors.name.message as string}
                        </span>
                    )}

                    <input
                        aria-label="Nombre de visualización"
                        type="text"
                        placeholder="Introduce tu nombre de visualización"
                        className={fieldsConfig}
                        {...register("name", {
                            required: {
                                value: true,
                                message: "Este campo es obligatorio",
                            },
                            maxLength: {
                                value: 50,
                                message:
                                    "El Nombre no puede tener mas de 50 caracteres",
                            },
                            pattern: {
                                value: PERSON_NAME_REG_EX,
                                message: "El Nombre no es valido",
                            },
                        })}
                    />
                </div>
                <div className="mb-6">
                    <label className={labelConfig}>Nombre de usuario</label>
                    {errors.username && (
                        <span className="text-red-500 text-xs italic">
                            {errors.username.message as string}
                        </span>
                    )}
                    <input
                        aria-label="Nombre de usuario"
                        type="text"
                        placeholder="Introduce tu nombre de usuario"
                        className={fieldsConfig}
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
                            pattern: {
                                value: USERNAME_REG_EX,
                                message: "El Usuario no es valido",
                            },
                        })}
                    />
                </div>
                <div className="mb-6">
                    <label className={labelConfig}>Correo Electrónico</label>

                    {errors.email && (
                        <span className="text-red-500 text-xs italic">
                            {errors.email.message as string}
                        </span>
                    )}
                    <input
                        aria-label="Email"
                        type="email"
                        placeholder="Introduce tu Email"
                        className={fieldsConfig}
                        {...register("email", {
                            required: {
                                value: true,
                                message: "Este campo es obligatorio",
                            },
                            maxLength: {
                                value: 256,
                                message:
                                    "El Email no puede tener mas de 256 caracteres",
                            },
                            pattern: {
                                value: EMAIL_REG_EX,
                                message: "El Email no es valido",
                            },
                        })}
                    />
                </div>
                <div className="mb-6">
                    <label className={labelConfig}>Contraseña</label>

                    {errors.password1 && (
                        <span className="text-red-500 text-xs italic">
                            {errors.password1.message as string}
                        </span>
                    )}
                    <input
                        aria-label="Contraseña"
                        type="password"
                        placeholder="Introduce tu contraseña"
                        className={fieldsConfig}
                        {...register("password1", {
                            required: {
                                value: true,
                                message: "Este campo es obligatorio",
                            },
                            maxLength: {
                                value: 50,
                                message:
                                    "La contraseña no puede tener mas de 50 caracteres",
                            },
                            minLength: {
                                value: 5,
                                message:
                                    "La Contraseña debe tener al menos 5 caracteres",
                            },
                        })}
                    />
                </div>
                <div className="mb-6">
                    <label className={labelConfig}>Confirmar contraseña</label>
                    {errors.password2 && (
                        <span className="text-red-500 text-xs italic">
                            {errors.password2.message as string}
                        </span>
                    )}
                    <input
                        aria-label="Confirmar contraseña"
                        type="password"
                        placeholder="Introduce tu contraseña de nuevo"
                        className={fieldsConfig}
                        {...register("password2", {
                            required: {
                                value: true,
                                message: "Este campo es obligatorio",
                            },
                            validate: (value) => {
                                if (value === watch("password1")) {
                                    return true;
                                } else {
                                    return "Las contraseñas no coinciden";
                                }
                            },
                        })}
                    />
                </div>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Registrarse
                </button>
            </form>
        </div>
    );
}
