//Componente para mostrar el icono y nombre del usuario si ha iniciado sesión
//        <div>
//          <UserIcon name="Usuario" image="public/logo.png"></UserIcon>
//        </div>

import React from "react";

interface Props {
  name: string;
  image?: string;
}

const UserIcon = ({ name, image }: Props) => {
  return (
    <div className="flex items-center space-x-4">
      <img className="w-10 h-10 rounded-full" src={image} alt="" />
      <div className="font-medium dark:text-white">
        <div>{name}</div>
      </div>
    </div>
  );
};

export default UserIcon;
