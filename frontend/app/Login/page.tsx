"use client";

import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const jsonLogin = { username, password };

  /*
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  */

  //Funcion para enviar los datos del login al server
  const handleSubmit = async () => {
    //console.log("Username: " + username);
    //console.log("Password: " + password);
    //console.log(jsonLogin);
    if (username != "" && password != "") {
      try {
        const res = await fetch("http://localhost:8080/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(jsonLogin),
          mode: "no-cors",
        }).then((response) => {
          response.json();
          console.log(response);
        });

        //const data = await res.json();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="mt-[100px]">
      <form className="mx-4 max-w-xs">
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Nombre de usuario
          </label>
          <input
            type="username"
            id="username"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@example.com"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-red-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-red-600 dark:ring-offset-red-800 dark:focus:ring-offset-red-800"
            />
          </div>
          <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Recuérdame
          </label>
        </div>
        <button
          type="submit"
          className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
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
