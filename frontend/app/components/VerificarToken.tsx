"use client";
import axios from "axios";
import { useEffect } from "react";

const VerificarToken = () => {
    useEffect(() => {
        //Obtenemos el Token del localStorage
        const token = localStorage.getItem("token");

        const getValidateToken = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8080/auth/verificarToken",
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + token,
                        },
                    }
                );
                const data = await response.data;
                if (data) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("nombre");
                }
            } catch (error) {
                console.log(error);
            }
        };

        if (token) {
            getValidateToken();
        }
    }, []);

    return <div></div>;
};

export default VerificarToken;
