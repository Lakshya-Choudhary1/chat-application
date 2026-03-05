import React from 'react'
import forbiddenLogo from "../../assets/forbidden.png"
import { useNavigate } from 'react-router';

const ForbiddenPage = () => {
  const Navigate = useNavigate();

  return (
    <div className=' absolute z-50 w-screen h-screen flex flex-col  justify-center abso items-center'>

      <div className='flex flex-col justify-center items-center gap-6'>

        <img  
          src={forbiddenLogo} 
          alt='forbiddenLogo'  
          className='w-48 h-auto object-contain sm:w-48 md:w-64 lg:w-80  duration-150 hover:scale-105 '
        />
        
        <p  
          className=" text-[#CC1983]  font-semibold sm:text-3xl ">
          Access Denied
        </p>

        <button 
          onClick={()=>Navigate('/')}
          className='btn btn-primary bg-[#CC1983] border-0 text-amber-50'>GO HOME
        </button>

      </div>

    </div>
  )
}

export default ForbiddenPage
