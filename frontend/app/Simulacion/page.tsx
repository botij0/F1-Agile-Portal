"use client";
import React, { useEffect, useState } from "react";
import Cabecera from "../components/Cabecera";
import InputSelectField from "../components/InputSelectField";
import InputButton from "../components/InputButton";
import InputTextField from "../components/InputTextField";
import Loading from "../components/Loading";
import { useForm } from "react-hook-form";
import { getRequest, postRequest, putRequest } from "@/app/(utils)/api";
import toast, { Toaster } from "react-hot-toast";

export default function Simulacion() {
    const [loading, setLoading] = useState(false);
    const [coches, setCoches] = useState<any[]>([]);
    const [circuitos, setCircuitos] = useState<any[]>([]);
    const tiposConduccion: string[] = ["Ahorrador", "Normal", "Deportivo"];

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm();

    const getCoches = async () => {
        try {
            setLoading(true);
            const response = await getRequest("coches");
            const data = await response.data;
            if (data.success == true) {
                const responseJson = data;
                const coches = responseJson.data;

                setCoches(coches);
                setLoading(false);
            } else {
                toast.error("Error al cargar los coches");
            }
        } catch (error) {
            toast.error("Error al cargar los coches");
        }
    };

    const getCircuitos = async () => {
        try {
            setLoading(true);
            const response = await getRequest("circuitos");
            const data = await response.data;
            if (data.success == true) {
                const responseJson = data;
                const circuitos = responseJson.data;

                setCircuitos(circuitos);
                setLoading(false);
            } else {
                toast.error("Error al cargar los circuitos");
            }
        } catch (error) {
            toast.error("Error al cargar los circuitos");
        }
    };

    useEffect(() => {
        getCoches();
        getCircuitos();
    }, []);

    return (
        <div className="max-w-[90%] mx-auto">
            <div>
                <Cabecera
                    titulo="Herramientas de simulación"
                    subtitulo="Seleccione un coche y un circuito"
                />
            </div>

            <div className="my-4">
                <div className="my-1">
                    <InputSelectField
                        label="Coche"
                        register={register}
                        name="coche"
                        errors={errors}
                        loading={loading}
                        options={coches}
                    />
                </div>
                <div className="my-1">
                    <InputSelectField
                        label="Circuito"
                        register={register}
                        name="circuito"
                        errors={errors}
                        loading={loading}
                        options={circuitos}
                    />
                </div>
            </div>
            <hr></hr>
            <div style={{ display: "flex" }}>
                <div>
                    <div>
                        <h1 className="text-xl  mt-5 font-bold">
                            Gasto de combustible
                        </h1>
                        <p className="text-xs text-gray-500 my-1">
                            Cantidad de combustible gastada en litros
                        </p>
                        <div>
                            <div className="my-3">
                                <label className="block mb-1 text-sm font-medium text-gray-900">
                                    En cada vuelta:
                                </label>
                                <input
                                    disabled={true}
                                    type="number"
                                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500
                                    focus:border-red-500 block p-2.5 "
                                />
                            </div>
                            <div className="my-3">
                                <label className="block mb-1 text-sm font-medium text-gray-900">
                                    Para todo el circuito:
                                </label>
                                <input
                                    disabled={true}
                                    type="number"
                                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500
                                    focus:border-red-500 block p-2.5 "
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="ml-20">
                    <div>
                        <h1 className="text-xl  mt-5 font-bold">
                            Cálculo de ERS (Energy Recovery System)
                        </h1>
                        <p className="text-xs text-gray-500 my-1">
                            Sistema de recuperación de energía en frenadas que
                            se almacena en una batería.
                        </p>
                        <div>
                            <div className="my-3">
                                <label className="block mb-1 text-sm font-medium text-gray-900">
                                    Tipo de conducción
                                </label>

                                <select
                                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500
                                    focus:border-red-500 block p-2.5 "
                                >
                                    <option value="">
                                        Selecciona una opción
                                    </option>
                                    <option key={0} value={0}>
                                        Ahorrador (+5%)
                                    </option>
                                    <option key={0} value={0}>
                                        Normal (-25%)
                                    </option>
                                    <option key={0} value={0}>
                                        Deportivo (-60%)
                                    </option>
                                </select>
                            </div>

                            <div style={{ display: "flex" }}>
                                <div className="my-3">
                                    <label className="block mb-1 text-sm font-medium text-gray-900">
                                        Ganancia del sistema por vuelta (kWh):
                                    </label>
                                    <input
                                        disabled={true}
                                        type="number"
                                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500
                                    focus:border-red-500 block p-2.5 w-72"
                                    />
                                </div>
                                <div className="my-3 ml-8">
                                    <label className="block mb-1 text-sm font-medium text-gray-900">
                                        Número de vueltas necesarias para cargar
                                        la batería:
                                    </label>
                                    <input
                                        disabled={true}
                                        type="number"
                                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500
                                    focus:border-red-500 block p-2.5 w-96"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="my-5">
                <InputButton label="Calcular" loading={loading} />
            </div>
        </div>
    );
}
