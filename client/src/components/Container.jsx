import React from 'react'
import AnimatedGradientBorder from './AnimatedGradientBorder.jsx'
const Container = ({children}) => {
  return (<div className=" overflow-hidden  flex items-center  justify-center absolute z-50 rounded-2xl m-6 ">
    <AnimatedGradientBorder >
    <div className='max-w-sm  sm:min-w-md w-full flex flex-col justify-between items-center bg-gray-800 rounded-2xl'>

     {children}
    
    </div>
    </AnimatedGradientBorder>
  </div>)
}

export default Container
