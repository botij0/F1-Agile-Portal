"use client";

import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    //POST a API login
    if (username != "" && password != "") {
      const response = await axios.post("http://localhost:8080/auth/login", {
        username: username,
        password: password,
      });

      //guardamos en localstorage el token devuelto en el login
      localStorage.setItem("token", response.data.token);
    }
  };

  return (
    <div className="mt-[100px]">
      <form className="mx-4 max-w-xs">
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Nombre de usuario
          </label>
          <input
            type="username"
            id="username"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 "
            placeholder="name@example.com"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 "
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              value=""
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-red-300 accent-red-700"
            />
          </div>
          <label className="ml-2 text-sm font-medium text-gray-900">
            Recuérdame
          </label>
        </div>
        <button
          type="button"
          className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
          onClick={handleSubmit}
        >
          Iniciar sesión
        </button>
        <div className="py-6 text-sm font-medium text-red-600 hover:text-red-700">
          <a href="/Login/RecuperarContrasena">¿Has olvidado la contraseña?</a>
        </div>
      </form>
    </div>
  );
}
