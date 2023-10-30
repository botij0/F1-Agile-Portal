"use client"

import { useState } from 'react'
import Link from 'next/link'
import {AiOutlineMenu, AiOutlineClose} from 'react-icons/ai'

export function Navbar() {

    const [menuIcon, setMenuIcon] = useState(false)

    const handleSmallerScreenNavigation = () => {
      setMenuIcon(!menuIcon);
    }

    return (
      <header className='bg-red-600 text-[#FFFFFF] w-full ease-in duration-300 fixed top-0 left-0 z-10'>
        <nav className='max-w-[1800px] mx-auto h-[80px] flex justify-between items-center p-4'>

          <div>
            <Link href='/' className='' onClick={handleSmallerScreenNavigation}>
              <img src="logo.png" 
                className="h-8 mr-3" alt="F1 Logo" />
              <span className="font-extrabold text-3xl md:text-2xl xl:text-3xl uppercase self-center">f1-agile-portal</span>
            </Link>
          </div>

          {
            /* 
              ! ----------- Larger Screen navigation -----------
            */
          }
          
          <ul className='hidden md:flex uppercase font-semibold text-1xl lg:text-[20px] text-[#FFFFFF]'>

            <li className='mr-4 lg:mr-8 '>
              <Link href='/' className='hover:text-slate-400'>
                Inicio
              </Link>
            </li>

            <li className='mr-4 lg:mr-8'>
              <Link href='/Noticias' className='hover:text-slate-400'>
                Noticias
              </Link>
            </li>

            <li className='mr-4 lg:mr-8'>
              <Link href='/Votaciones' className='hover:text-slate-400'>
                Votaciones
              </Link>
            </li>

            <li className='mr-4 lg:mr-8'>
              <Link href='/Equipos' className='hover:text-slate-400'>
                Equipos
              </Link>
            </li>

            <li className='mr-4 lg:mr-8'>
              <Link href='/Circuitos' className='hover:text-slate-400'>
                Circuitos
              </Link>
            </li>

          </ul>

          <div className='hidden md:flex'>
            <div className='flex'>

              <Link href='/Login'>
                <button className='mr-5 bg-gray-100 text-slate-800 hover:bg-slate-800 hover:text-gray-100 rounded-2xl uppercase font-bold px-8 py-2'>
                  Iniciar Sesion
                </button>
              </Link>

              <Link href='/Register'>
                <button className='border-2 border-gray-100 text-white hover:text-slate-400 hover:border-slate-400 rounded-2xl uppercase font-bold px-8 py-2'>
                  Registrarse
                </button>
              </Link>

            </div>
          </div>

          {
            /* 
              ! ----------- Smaller Screen navigation -----------
              onClick change the icon
            */
          }

          <div onClick={handleSmallerScreenNavigation} className='flex md:hidden'>
              {menuIcon ? <AiOutlineClose className='text-3xl text-white' /> 
                        : <AiOutlineMenu className='text-3xl text-white' />}
          </div>

          {
            /* 
              ! ----------- Smaller Screens - Navbar-----------
            */
          }
          <div className={menuIcon ? 'md:hidden absolute top-[80px] right-0 bottom-0 left-0 flex justify-center items-center w-full h-screen bg-red-600 text-[#FFFFFF] ease-in duration-300 z-10' 
                                   : 'md:hidden absolute top-[80px] right-0 left-[-100%] flex justify-center items-center w-full h-screen bg-red-600 text-white text-center ease-in duration-300 '}>
            
            {
            /* 
              ! ----------- Smaller Screens - Navbar Links-----------
            */
            }
            <div className='w-full'>

              <ul className='uppercase font-bold text-2xl text-center'>

                <li onClick={handleSmallerScreenNavigation} className='py-5 hover:text-slate-400 cursor-pointer'>
                  <Link href="/">
                    Inicio
                  </Link>
                </li>

                <li onClick={handleSmallerScreenNavigation} className='py-5 hover:text-slate-400 cursor-pointer'>
                  <Link href="/Noticias">
                    Noticias
                  </Link>
                </li>

                <li onClick={handleSmallerScreenNavigation} className='py-5 hover:text-slate-400 cursor-pointer'>
                  <Link href="/Votaciones">
                    Votaciones
                  </Link>
                </li>

                <li onClick={handleSmallerScreenNavigation} className='py-5 hover:text-slate-400 cursor-pointer'>
                  <Link href="/Equipos">
                    Equipo
                  </Link>
                </li>

                <li onClick={handleSmallerScreenNavigation} className='py-5 hover:text-slate-400 cursor-pointer'>
                  <Link href="/Circuitos">
                    Circuitos
                  </Link>
                </li>

              </ul>

              <div className='flex flex-col justify-center items-center mt-16'>

                <Link href="/Login" onClick={handleSmallerScreenNavigation}>
                  <button className='bg-gray-100 text-slate-800 rounded-2xl uppsercase font-bold py-3 w-[250px] mb-5 hover:bg-slate-800 hover:text-gray-100'>
                    Iniciar Sesion
                  </button>
                </Link>

                <Link href="/Register" onClick={handleSmallerScreenNavigation}>
                  <button className='border-2 border-gray-100 text-white hover:text-slate-400 hover:border-slate-400 rounded-2xl uppsercase font-bold py-3 w-[250px] mb-5'>
                    Registrarse
                  </button>
                </Link>

              </div>

            </div>



          </div>


        </nav>


      </header>

  
  
  
    )
  }