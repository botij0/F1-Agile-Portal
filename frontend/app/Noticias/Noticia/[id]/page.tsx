"use client";

import axios from "axios";

const token = localStorage.getItem("token");
console.log(token);

//funcion para obtener el número de la noticia de la url
function urlId() {
  let tmp = window.location.href.slice(
    window.location.href.lastIndexOf("/"),
    window.location.href.length
  );
  return tmp.substring(1);
}

/*
function getNoticia(id: string) {
  const response = axios.get("http://localhost:8080/api/v1/noticias/" + id, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
}
*/

export default function Noticias() {
  return (
    <div className="mt-[100px]">
      <div>
        <h1 className="font-bold text-center uppercase text-3xl text-black">
          Titular {urlId()}
        </h1>
      </div>
      <div>
        <img src="/F1_Banner.jpg"></img>
      </div>
      <div>
        <p className="text-center text-black">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin laoreet
          ornare leo, sit amet maximus ante venenatis a. Nunc convallis sodales
          nibh vel mollis. Vivamus condimentum quis metus suscipit malesuada.
          Vestibulum consequat ultricies orci sit amet aliquet. Praesent a
          sapien pretium, malesuada justo ac, tempor augue. Nam tortor tellus,
          consequat sed tempus ac, tincidunt nec risus. Aliquam erat volutpat.
          Suspendisse potenti. Morbi eu tellus eu odio consectetur cursus nec id
          augue. Vivamus eleifend neque massa, et dictum enim placerat sit amet.
          Integer commodo metus facilisis justo lacinia ultrices vitae ut
          libero. Ut semper vel tellus vitae fermentum. Pellentesque eget arcu
          tellus. Maecenas a mi dignissim, commodo turpis nec, porta massa.
          Aliquam a enim lorem. Nulla quis condimentum est. Morbi pulvinar nunc
          imperdiet, fermentum dolor vel, tempor nisl. Curabitur ultricies dui
          non sapien rutrum accumsan. Phasellus non mauris mollis, ullamcorper
          erat sed, faucibus urna. Ut vel commodo risus, eget feugiat urna. Sed
          efficitur orci sed aliquam ullamcorper. Nulla lacus nunc, posuere vel
          maximus at, ultricies a nisl. Vivamus porta massa ac felis pulvinar
          accumsan. Nulla ornare nisi ac erat facilisis, in volutpat tortor
          ornare. In in nisl tempor, cursus diam ac, hendrerit ligula. Nunc
          gravida mi ac efficitur dapibus. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Proin vel dui at libero lacinia
          fermentum. Maecenas sodales in nulla ac luctus. Aliquam tempor sem vel
          massa auctor mollis. Phasellus mattis dolor sagittis est egestas,
          vitae gravida mi mollis. Integer efficitur odio ex, eget auctor felis
          gravida et. Donec pharetra non elit et facilisis. Nullam tempor, erat
          a rutrum sodales, ante risus ultrices leo, eget vehicula neque felis a
          nisi. In sed fermentum justo. Quisque id ante sollicitudin, ultrices
          purus vel, imperdiet libero. Duis eget velit eu nunc condimentum
          pharetra ac sed urna. Nam id diam varius nunc hendrerit sodales.
          Phasellus sed neque condimentum, aliquam dolor vitae, condimentum
          risus. Phasellus ligula ante, consequat tempus ante in, tristique
          maximus nisl. Vestibulum id egestas erat. Nam porttitor id enim ac
          ultrices. Sed leo enim, mattis sit amet neque nec, porttitor porta
          quam. Donec egestas mattis felis, in dignissim risus posuere a.
          Aliquam cursus ipsum eu tellus pharetra iaculis. Cras sagittis
          suscipit mi, a ultricies eros dapibus euismod. Nulla gravida
          ullamcorper ipsum, ac viverra velit sollicitudin id. Proin rutrum
          venenatis luctus. Nullam auctor pellentesque facilisis. Maecenas eget
          massa erat. Curabitur imperdiet, tellus eu gravida rhoncus, ligula
          sapien lobortis dolor, sed feugiat nisi ex vitae dui. Cras faucibus,
          ipsum non scelerisque eleifend, arcu libero fermentum sem, a faucibus
          sapien nibh sit amet mi. Nunc fringilla ultricies lectus eget
          vehicula. Nunc ut venenatis purus, ut suscipit libero. Duis sit amet
          diam sit amet quam maximus facilisis ut nec lacus. Duis tempus eu
          mauris et maximus. Duis faucibus pellentesque nibh. Fusce eu justo eu
          lorem tempor finibus. Suspendisse auctor ornare convallis.
        </p>
      </div>
    </div>
  );
}
