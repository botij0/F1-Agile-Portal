import axios from "axios";
import Constantes from "./constantes";

export function getRequest(path: string) {
    const token = localStorage.getItem("token");
    return axios.get(Constantes.API_URL + path, {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
    });
}

export function getRequestPaginada(
    path: string,
    currentPage: number,
    elementosPorPagina: number
) {
    const token = localStorage.getItem("token");
    return axios.get(Constantes.API_URL + path, {
        params: {
            page: currentPage, // página deseada
            size: elementosPorPagina, // cantidad de elementos por página
        },
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export function postRequest(path: string, data: any) {
    const token = localStorage.getItem("token");
    return axios.post(Constantes.API_URL + path, data, {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
    });
}

export function putRequest(path: string, data: any) {
    const token = localStorage.getItem("token");
    return axios.put(Constantes.API_URL + path, data, {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
    });
}

export function deleteRequest(path: string) {
    const token = localStorage.getItem("token");
    return axios.delete(Constantes.API_URL + path, {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
    });
}

export function postRequestTokenless(path: string, data: any) {
    return axios.post(Constantes.API_URL + path, data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export function getRequestTokenless(path: string) {
    return axios.get(Constantes.API_URL + path, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export function putRequestTokenless(path: string, data: any) {
    return axios.put(Constantes.API_URL + path, data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export function deleteRequestTokenless(path: string) {
    return axios.delete(Constantes.API_URL + path, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export function registerRequest(data: any) {
    return axios.post("http://localhost:8080/auth/signup", data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export function loginRequest(data: any) {
    return axios.post("http://localhost:8080/auth/login", data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export function verifyTokenRequest(token: any, data: any) {
    return axios.post("http://localhost:8080/auth/verificarToken", data, {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
    });
}
