'use client'

import { Circuito, Coche, Equipo, Piloto } from '@/app/logic/types'
import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'

const IMAGEN_BASE_URL = 'https://pxfvrkflonlookyusxtb.supabase.co/storage/v1/object/public/Images/'
const EQUIPO_BASE_URL = 'http://localhost:8080/api/v1/equipos/'

type DetallesResponse = {
  success: boolean
  message: string
  data: Equipo
}

function DetallesEquipo(params: { id?: string }): React.JSX.Element {
  const { id } = params
  const [requested, setRequested] = useState<boolean>(false)
  const [received, setReceived] = useState<boolean>(false)

  const [varLogo, setLogo] = useState<string>('')
  const [varNombre, setNombre] = useState<string>('')
  const [varTwitter, setTwitter] = useState<string>('')
  const [varCircuitos, setCircuitos] = useState<Circuito[]>([])
  const [varPilotos, setPilotos] = useState<Piloto[]>([])
  const [varCoches, setCoches] = useState<Coche[]>([])

  if (id && !requested) {
    setRequested(true)
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }
    axios
      .get<DetallesResponse>(EQUIPO_BASE_URL + id, { headers })
      .then((response) => {
        if (response.data.success) {
          const { logo, nombre, twitter, circuitos, pilotos, coches } = response.data.data
          setLogo(logo)
          setNombre(nombre)
          setTwitter(twitter)
          if (circuitos) setCircuitos(circuitos)
          if (pilotos) setPilotos(pilotos)
          if (coches) setCoches(coches)
          setReceived(true)
        }
      })
      .catch((error) => {
        toast.error(error.message)
        setRequested(false)
      })
  }

  return received ? (
    <div className='mt-[10px]'>
      <div className='2xl:flex mt-[30px] max-w-[90%] mx-auto'>
        <div className='mx-auto 2xl:me-5'>
          <h1 className='font-bold text-center text-3xl text-black mb-5 underline'>{varNombre}</h1>
        </div>

        <img src={IMAGEN_BASE_URL + varLogo} alt={'Cover'} width={100} height={100} className='mx-auto' />

        <div className='max-w-[900px] mx-auto 2xl:ms-5 mt-5 2xl:mt-0'>
          <p className='text-center text-xl text-black mb-2'>
            Twitter:{' '}
            <a href={`https://twitter.com/${varTwitter}`} target='_blank' rel='noopener noreferrer' className='text-blue-500'>
              @{varTwitter}
            </a>
          </p>
        </div>
      </div>

      <div className='max-w-[900px] mx-auto mt-5'>
        <h3 className='font-bold text-center text-2xl text-black mb-5 underline'>Circuitos</h3>
        <table className='w-full'>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Ciudad</th>
              <th>Longitud</th>
              <th>Vueltas</th>
            </tr>
          </thead>
          <tbody>
            {varCircuitos.map((circuito) => (
              <tr key={circuito.nombre}>
                <td className='text-center'>{circuito.nombre}</td>
                <td className='text-center'>{circuito.ciudad}</td>
                <td className='text-center'>{circuito.longitud}</td>
                <td className='text-center'>{circuito.numero_vueltas}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='max-w-[900px] mx-auto mt-5'>
        <h3 className='font-bold text-center text-2xl text-black mb-5 underline'>Pilotos</h3>
        <table className='w-full'>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Dorsal</th>
              <th>Twitter</th>
              <th>País</th>
            </tr>
          </thead>
          <tbody>
            {varPilotos.map((piloto) => (
              <tr key={piloto.nombre}>
                <td className='text-center'>{`${piloto.nombre} ${piloto.apellidos}`}</td>
                <td className='text-center'>{piloto.dorsal}</td>
                <td className='text-center'>{`@${piloto.twitter}`}</td>
                <td className='text-center'>{piloto.pais}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='max-w-[900px] mx-auto mt-5'>
        <h3 className='font-bold text-center text-2xl text-black mb-5 underline'>Coches</h3>
        <table className='w-full'>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Código</th>
              <th>Consumo</th>
              <th>ERS Curva Media</th>
              <th>ERS Curva Lenta</th>
              <th>ERS Curva Rápida</th>
            </tr>
          </thead>
          <tbody>
            {varCoches.map((coche) => (
              <tr key={coche.nombre}>
                <td className='text-center'>{coche.nombre}</td>
                <td className='text-center'>{coche.codigo}</td>
                <td className='text-center'>{coche.consumo}</td>
                <td className='text-center'>{coche.erscurvaMedia}</td>
                <td className='text-center'>{coche.erscurvaLenta}</td>
                <td className='text-center'>{coche.erscurvaRapida}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <></>
  )
}

export default DetallesEquipo
