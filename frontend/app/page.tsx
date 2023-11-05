import Image from 'next/image'
import Link from 'next/link'
import VotacionesAbiertas from './components/VotacionesAbiertas'

export default function Home() {
  return (
    <div className='mt-[10px]'>
        
      <Image src='/F1_Banner.jpg' width={1920} height={100} alt='cover'/>

      <div className=' md:flex max-w-[1368px] mt-[30px] mx-auto justify-between'>

        <div className='md:ml-5 m-3 md:max-w-[40%] max-w-[100%]'>

          <h2 className='font-bold text-center text-3xl mx-5 text-black mb-5 underline'>Últimas Noticias</h2>

        </div>

        <div className='md:max-w-[40%] max-w-[100%] md:mr-5 m-3'>

          <h2 className='font-bold text-center text-3xl mx-5 text-black underline'>Votaciones Abiertas</h2>

          <VotacionesAbiertas/>

        </div>       
      </div>
    </div>    
  )
}
