import Image from 'next/image'
import VotacionesAbiertas from './components/VotacionesAbiertas'

export default function Home() {
  return (
    <div className='mt-[10px]'>
        
    <Image src='/F1_Banner.jpg' width={1920} height={100} alt='cover'/>

      <div className=' flex max-w-[1368px] mt-[30px] mx-auto justify-between'>

        <div className='ml-5 max-w-[40%]'>

          <h2 className='font-bold text-center text-3xl mx-5 text-black mb-5 underline'>Últimas Noticias</h2>

        </div>

        <div className='max-w-[40%] mr-5'>

          <h2 className='font-bold text-center text-3xl mx-5 text-black underline'>Votaciones Abiertas</h2>

          <VotacionesAbiertas/>

        </div>       
      </div>
    </div>    
  )
}
