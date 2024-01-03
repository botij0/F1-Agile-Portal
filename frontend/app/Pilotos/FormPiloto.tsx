"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { getRequest, postRequest, putRequest } from "@/app/(utils)/api";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuid } from "uuid";
import Constantes from "@/app/(utils)/constantes";

const supabase = createClient(
  "https://pxfvrkflonlookyusxtb.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4ZnZya2Zsb25sb29reXVzeHRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgwODYyNTUsImV4cCI6MjAxMzY2MjI1NX0.I3v1fYevo3rzWOT8KvkIVDrZ0LbyvABN6YaynXIYE4I"
);

async function uploadImage(img: any) {
  let file = img;

  if (file == undefined) {
    return { path: imgPiloto };
  } else {
    const { data, error } = await supabase.storage
      .from("Images")
      .upload("" + uuid(), file);

    if (data) {
      return data;
    } else {
      return -1;
    }
  }
}

const initialPiloto = {
  nombre: "",
  apellidos: "",
  dorsal: 0,
  pais: "0",
  siglas: "",
  twitter: "",
  foto: "",
};
let imgPiloto = "";
let paisPiloto = "0";
const FormPiloto = () => {
  const [piloto, setPiloto] = React.useState(initialPiloto);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = handleSubmit((data: any) => {
    imgPiloto = piloto.foto;
    let img_Name = uploadImage(data.foto[0]);
    img_Name.then((value) => {
      if (value != -1) {
        console.log(value);
        if (id != undefined) {
          //Modificar piloto
          putRequest("pilotos/" + id, {
            nombre: data.nombre,
            apellidos: data.apellidos,
            dorsal: data.dorsal,
            pais: data.pais,
            siglas: data.siglas.toUpperCase(),
            twitter: data.twitter,
            foto: value.path,
            equipo_id: 102, //HARDCODEADO HASTA TENER ROLES Y PONER EL EQUIPO DEL RESPONSABLE
          })
            .then((data) => {
              toast.success(data.data.message, { duration: 4000 });
              window.location.href = "/Pilotos";
            })
            .catch((error) => {
              console.log(error);
              toast.error(error);
            });
        } else {
          //Nuevo piloto

          postRequest("pilotos", {
            nombre: data.nombre,
            apellidos: data.apellidos,
            dorsal: data.dorsal,
            pais: data.pais,
            siglas: data.siglas.toUpperCase(),
            twitter: data.twitter,
            foto: value.path,
            equipo_id: 102, //HARDCODEADO HASTA TENER ROLES Y PONER EL EQUIPO DEL RESPONSABLE
          })
            .then((data) => {
              toast.success(data.data.message, { duration: 4000 });
              window.location.href = "/Pilotos";
            })
            .catch((error) => {
              console.log(error);
              toast.error(error);
            });
        }
      }
    });
  });

  const params = useParams();
  const id = params.id;

  if (id != undefined) {
    useEffect(() => {
      (async () => {
        try {
          const response = await getRequest("pilotos/" + id);
          console.log(response.data.data);
          setPiloto(response.data.data);
          setValue("nombre", response.data.data.nombre);
          setValue("apellidos", response.data.data.apellidos);
          setValue("dorsal", response.data.data.dorsal);
          setValue("pais", response.data.data.pais);
          paisPiloto = response.data.data.pais;
          setValue("siglas", response.data.data.siglas);
          setValue("twitter", response.data.data.twitter);
          imgPiloto = response.data.data.foto;
        } catch (error) {
          console.log(error);
        }
      })();
    }, []);
  }

  return (
    <div className="container mx-auto my-8">
      <Toaster />
      <h2 className="text-black text-2xl">
        {id != undefined ? "Editar Piloto" : "Añadir Piloto"}
      </h2>
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
                  message: "El nombre no puede tener más de 50 caracteres",
                },
              })}
            />

            <p className="text-gray-600 text-xs italic">Nombre del piloto</p>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="apellidos"
            >
              Apellidos
            </label>
            {errors.apellidos && (
              <span className="text-red-500 text-xs italic">
                {errors.apellidos.message as string}
              </span>
            )}
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded 
                                     p-2.5 mb-1 leading-tight focus:outline-none focus:bg-white"
              id="apellidos"
              type="text"
              placeholder="Apellidos"
              {...register("apellidos", {
                required: {
                  value: true,
                  message: "Este campo es obligatorio",
                },
                maxLength: {
                  value: 50,
                  message: "Los apellidos no pueden tener más de 50 caracteres",
                },
              })}
            />

            <p className="text-gray-600 text-xs italic">Apellidos del piloto</p>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="dorsal"
            >
              Dorsal
            </label>
            {errors.dorsal && (
              <span className="text-red-500 text-xs italic">
                {errors.dorsal.message as string}
              </span>
            )}
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded 
                                     p-2.5 mb-1 leading-tight focus:outline-none focus:bg-white"
              id="dorsal"
              type="number"
              min="0"
              max="999"
              placeholder="Dorsal"
              {...register("dorsal", {
                required: {
                  value: true,
                  message: "Este campo es obligatorio",
                },
                maxLength: {
                  value: 3,
                  message: "El dorsal debe de estar entre 0 y 999",
                },
              })}
            />
            <p className="text-gray-600 text-xs italic">Dorsal del piloto</p>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="pais"
            >
              País
            </label>

            <select
              id="pais"
              className=" block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded 
                                    p-2.5 mb-1 leading-tight focus:outline-none focus:bg-white"
              defaultValue={piloto.pais}
              //value={piloto.pais}
              {...register("pais", {
                required: {
                  value: true,
                  message: "Este campo es obligatorio",
                },
              })}
            >
              <option value="af">Afghanistan</option>
              <option value="al">Albania</option>
              <option value="dz">Algeria</option>
              <option value="ad">Andorra</option>
              <option value="ao">Angola</option>
              <option value="ai">Anguilla</option>
              <option value="ag">Antigua and Barbuda</option>
              <option value="ar">Argentina</option>
              <option value="am">Armenia</option>
              <option value="aw">Aruba</option>
              <option value="au">Australia</option>
              <option value="at">Austria</option>
              <option value="az">Azerbaijan</option>
              <option value="bs">Bahamas</option>
              <option value="bh">Bahrain</option>
              <option value="bd">Bangladesh</option>
              <option value="bb">Barbados</option>
              <option value="by">Belarus</option>
              <option value="be">Belgium</option>
              <option value="bz">Belize</option>
              <option value="bj">Benin</option>
              <option value="bm">Bermuda</option>
              <option value="bt">Bhutan</option>
              <option value="bo">Bolivia</option>
              <option value="ba">Bosnia and Herzegovina</option>
              <option value="bw">Botswana</option>
              <option value="br">Brazil</option>
              <option value="bn">Brunei Darussalam</option>
              <option value="bg">Bulgaria</option>
              <option value="bf">Burkina Faso</option>
              <option value="bi">Burundi</option>
              <option value="kh">Cambodia</option>
              <option value="cm">Cameroon</option>
              <option value="ca">Canada</option>
              <option value="cv">Cape Verde</option>
              <option value="ky">Cayman Islands</option>
              <option value="cf">Central African Republic</option>
              <option value="td">Chad</option>
              <option value="cl">Chile</option>
              <option value="cn">China</option>
              <option value="co">Colombia</option>
              <option value="km">Comoros</option>
              <option value="cg">Congo</option>
              <option value="cd">Congo, The Democratic Republic of The</option>
              <option value="cr">Costa Rica</option>
              <option value="ci">Cote D'ivoire</option>
              <option value="hr">Croatia</option>
              <option value="cu">Cuba</option>
              <option value="cy">Cyprus</option>
              <option value="cz">Czech Republic</option>
              <option value="dk">Denmark</option>
              <option value="dj">Djibouti</option>
              <option value="dm">Dominica</option>
              <option value="DO">Dominican Republic</option>
              <option value="ec">Ecuador</option>
              <option value="eg">Egypt</option>
              <option value="sv">El Salvador</option>
              <option value="gq">Equatorial Guinea</option>
              <option value="er">Eritrea</option>
              <option value="ee">Estonia</option>
              <option value="et">Ethiopia</option>
              <option value="fk">Falkland Islands (Malvinas)</option>
              <option value="fo">Faroe Islands</option>
              <option value="fj">Fiji</option>
              <option value="fi">Finland</option>
              <option value="fr">France</option>
              <option value="gf">French Guiana</option>
              <option value="pf">French Polynesia</option>
              <option value="ga">Gabon</option>
              <option value="gm">Gambia</option>
              <option value="ge">Georgia</option>
              <option value="de">Germany</option>
              <option value="gh">Ghana</option>
              <option value="gi">Gibraltar</option>
              <option value="gr">Greece</option>
              <option value="gl">Greenland</option>
              <option value="gd">Grenada</option>
              <option value="gp">Guadeloupe</option>
              <option value="gu">Guam</option>
              <option value="gt">Guatemala</option>
              <option value="gg">Guernsey</option>
              <option value="gn">Guinea</option>
              <option value="gw">Guinea-bissau</option>
              <option value="gy">Guyana</option>
              <option value="ht">Haiti</option>
              <option value="va">Holy See (Vatican City State)</option>
              <option value="hn">Honduras</option>
              <option value="hk">Hong Kong</option>
              <option value="hu">Hungary</option>
              <option value="is">Iceland</option>
              <option value="in">India</option>
              <option value="id">Indonesia</option>
              <option value="ir">Iran, Islamic Republic of</option>
              <option value="iq">Iraq</option>
              <option value="ie">Ireland</option>
              <option value="im">Isle of Man</option>
              <option value="il">Israel</option>
              <option value="it">Italy</option>
              <option value="jm">Jamaica</option>
              <option value="jp">Japan</option>
              <option value="je">Jersey</option>
              <option value="jo">Jordan</option>
              <option value="kz">Kazakhstan</option>
              <option value="ke">Kenya</option>
              <option value="ki">Kiribati</option>
              <option value="kr">Korea, Republic of</option>
              <option value="kw">Kuwait</option>
              <option value="kg">Kyrgyzstan</option>
              <option value="la">Lao People's Democratic Republic</option>
              <option value="lv">Latvia</option>
              <option value="lb">Lebanon</option>
              <option value="ls">Lesotho</option>
              <option value="lr">Liberia</option>
              <option value="ly">Libyan Arab Jamahiriya</option>
              <option value="li">Liechtenstein</option>
              <option value="lt">Lithuania</option>
              <option value="lu">Luxembourg</option>
              <option value="mo">Macao</option>
              <option value="mk">
                Macedonia, The Former Yugoslav Republic of
              </option>
              <option value="mg">Madagascar</option>
              <option value="mw">Malawi</option>
              <option value="my">Malaysia</option>
              <option value="mv">Maldives</option>
              <option value="ml">Mali</option>
              <option value="mt">Malta</option>
              <option value="mh">Marshall Islands</option>
              <option value="mq">Martinique</option>
              <option value="mr">Mauritania</option>
              <option value="mu">Mauritius</option>
              <option value="yt">Mayotte</option>
              <option value="mx">Mexico</option>
              <option value="fm">Micronesia, Federated States of</option>
              <option value="md">Moldova, Republic of</option>
              <option value="mc">Monaco</option>
              <option value="mn">Mongolia</option>
              <option value="mr">Montenegro</option>
              <option value="ms">Montserrat</option>
              <option value="ma">Morocco</option>
              <option value="mz">Mozambique</option>
              <option value="mm">Myanmar</option>
              <option value="na">Namibia</option>
              <option value="nr">Nauru</option>
              <option value="np">Nepal</option>
              <option value="nl">Netherlands</option>
              <option value="nc">New Caledonia</option>
              <option value="nz">New Zealand</option>
              <option value="ni">Nicaragua</option>
              <option value="ne">Niger</option>
              <option value="ng">Nigeria</option>
              <option value="nu">Niue</option>
              <option value="nf">Norfolk Island</option>
              <option value="mp">Northern Mariana Islands</option>
              <option value="no">Norway</option>
              <option value="om">Oman</option>
              <option value="pk">Pakistan</option>
              <option value="pw">Palau</option>
              <option value="ps">Palestinian Territory, Occupied</option>
              <option value="pa">Panama</option>
              <option value="pg">Papua New Guinea</option>
              <option value="py">Paraguay</option>
              <option value="pe">Peru</option>
              <option value="ph">Philippines</option>
              <option value="pn">Pitcairn</option>
              <option value="pl">Poland</option>
              <option value="pt">Portugal</option>
              <option value="pr">Puerto Rico</option>
              <option value="qa">Qatar</option>
              <option value="re">Reunion</option>
              <option value="ro">Romania</option>
              <option value="ru">Russian Federation</option>
              <option value="rw">Rwanda</option>
              <option value="kn">Saint Kitts and Nevis</option>
              <option value="lc">Saint Lucia</option>
              <option value="pm">Saint Pierre and Miquelon</option>
              <option value="vc">Saint Vincent and The Grenadines</option>
              <option value="ws">Samoa</option>
              <option value="sm">San Marino</option>
              <option value="st">Sao Tome and Principe</option>
              <option value="sa">Saudi Arabia</option>
              <option value="sn">Senegal</option>
              <option value="rs">Serbia</option>
              <option value="sc">Seychelles</option>
              <option value="sl">Sierra Leone</option>
              <option value="sg">Singapore</option>
              <option value="sk">Slovakia</option>
              <option value="si">Slovenia</option>
              <option value="sb">Solomon Islands</option>
              <option value="so">Somalia</option>
              <option value="za">South Africa</option>
              <option value="ss">South Sudan</option>
              <option value="es">Spain</option>
              <option value="lk">Sri Lanka</option>
              <option value="sd">Sudan</option>
              <option value="sr">Suriname</option>
              <option value="sj">Svalbard and Jan Mayen</option>
              <option value="se">Sweden</option>
              <option value="se">Switzerland</option>
              <option value="sy">Syrian Arab Republic</option>
              <option value="tw">Taiwan</option>
              <option value="tj">Tajikistan</option>
              <option value="tz">Tanzania, United Republic of</option>
              <option value="th">Thailand</option>
              <option value="tl">Timor-leste</option>
              <option value="tg">Togo</option>
              <option value="tk">Tokelau</option>
              <option value="to">Tonga</option>
              <option value="tt">Trinidad and Tobago</option>
              <option value="tn">Tunisia</option>
              <option value="tr">Turkey</option>
              <option value="tm">Turkmenistan</option>
              <option value="tc">Turks and Caicos Islands</option>
              <option value="tv">Tuvalu</option>
              <option value="ug">Uganda</option>
              <option value="ua">Ukraine</option>
              <option value="ae">United Arab Emirates</option>
              <option value="gb">United Kingdom</option>
              <option value="us">United States</option>
              <option value="um">United States Minor Outlying Islands</option>
              <option value="uy">Uruguay</option>
              <option value="uz">Uzbekistan</option>
              <option value="vu">Vanuatu</option>
              <option value="ve">Venezuela</option>
              <option value="vn">Viet Nam</option>
              <option value="vg">Virgin Islands, British</option>
              <option value="vi">Virgin Islands, U.S.</option>
              <option value="wf">Wallis and Futuna</option>
              <option value="eh">Western Sahara</option>
              <option value="ye">Yemen</option>
              <option value="zm">Zambia</option>
              <option value="zw">Zimbabwe</option>
            </select>
            <p className="text-gray-600 text-xs italic">
              País de nacimiento del piloto
            </p>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="siglas"
            >
              Siglas
            </label>
            {errors.siglas && (
              <span className="text-red-500 text-xs italic">
                {errors.siglas.message as string}
              </span>
            )}
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded 
                                     p-2.5 mb-1 leading-tight focus:outline-none focus:bg-white uppercase"
              id="siglas"
              type="text"
              placeholder="AAA"
              size={3}
              {...register("siglas", {
                required: {
                  value: true,
                  message: "Este campo es obligatorio",
                },
                maxLength: {
                  value: 3,
                  message: "Las siglas no pueden tener más de 3 caracteres",
                },
              })}
            />
            <p className="text-gray-600 text-xs italic">Siglas del piloto</p>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="twitter"
            >
              Twitter
            </label>
            {errors.twitter && (
              <span className="text-red-500 text-xs italic">
                {errors.twitter.message as string}
              </span>
            )}
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded 
                                     p-2.5 mb-1 leading-tight focus:outline-none focus:bg-white"
              id="twitter"
              type="text"
              placeholder="Twitter"
              {...register("twitter", {
                required: {
                  value: true,
                  message: "Este campo es obligatorio",
                },
                maxLength: {
                  value: 15,
                  message:
                    "La cuenta de twitter del piloto no puede tener más de 15 caracteres",
                },
              })}
            />
            <p className="text-gray-600 text-xs italic">
              Cuenta de twitter del piloto
            </p>
          </div>
        </div>

        {/** 
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="coche"
            >
              Coche del piloto
            </label>
            {errors.usuario && (
              <span className="text-red-500 text-xs italic">
                {errors.usuario.message as string}
              </span>
            )}
            <select
              className=" block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded 
                                    p-2.5 mb-1 leading-tight focus:outline-none focus:bg-white"
              id="coche"
              {...register("coche", {
                required: {
                  value: true,
                  message: "Este campo es obligatorio",
                },
              })}
            >
              <option value="" disabled selected hidden>
                Seleccione el coche del piloto
              </option>
              <option value="Coche1">Coche</option>
            </select>

            <p className="text-gray-600 text-xs italic">
              Coche que utiliza el piloto
            </p>
          </div>
        </div>
        */}

        {/** 
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="equipo"
              >
                Equipo del piloto
              </label>
              {errors.usuario && (
                <span className="text-red-500 text-xs italic">
                  {errors.usuario.message as string}
                </span>
              )}
              <select
                className=" block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded 
                                    p-2.5 mb-1 leading-tight focus:outline-none focus:bg-white"
                id="equipo"
                {...register("equipo", {
                  required: {
                    value: true,
                    message: "Este campo es obligatorio",
                  },
                })}
              >
                <option value="" disabled selected hidden>
                  Seleccione el equipo del piloto
                </option>
                <option value="Equipo1">Equipo</option>
              </select>

              <p className="text-gray-600 text-xs italic">
                Equipo al que pertenece el piloto
              </p>
            </div>
          </div>
              */}

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="foto"
            >
              Foto
            </label>
            {errors.foto && (
              <span className="text-red-500 text-xs italic">
                {errors.foto.message as string}
              </span>
            )}
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded 
                                     p-2.5 mb-1 leading-tight focus:outline-none focus:bg-white"
              id="foto"
              type="file"
              placeholder=""
              accept="image/png, image/jpeg"
              {...register("foto", {
                required: {
                  value: id == undefined,
                  message: "Este campo es obligatorio",
                },
              })}
            />

            <p className="text-gray-600 text-xs italic">Foto del piloto</p>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6 w-16">
          {id != undefined ? (
            <img src={Constantes.IMAGE_BASE_URL + piloto.foto} />
          ) : (
            <p></p>
          )}
        </div>

        <div className="flex flex-wrap mb-6 items-center ">
          <div className="w-full px-3 flex justify-center">
            <button
              className="bg-red-500 hover:bg-red-700 mr-5 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Guardar
            </button>

            <Link href="/Pilotos">
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

export default FormPiloto;
