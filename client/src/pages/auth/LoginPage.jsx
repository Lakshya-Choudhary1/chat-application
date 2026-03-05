import React, { useState } from 'react'
import Loading from '../util/Loading'
import { useAuthStore } from '../../store/useAuthStore.js'
import { Link } from 'react-router'
import Application from '../../components/Application.jsx'
import Container from '../../components/Container.jsx'

const LoginPage = () => {
  const {login,isLoggingUp} = useAuthStore()
  const [formData,setFormData] = useState({email:"",password:""})

  const handleChange = (e) =>{
    const {name,value} = e.target;
    setFormData(prev=>({
      ...prev,
      [name]:value
    }))
  }
  
  const handleSubmit = async(e)=>{
    e.preventDefault();
    await login(formData);
  }

  if(isLoggingUp){
    return <Loading/>
  }

  return (<Container>
    <Application/>

    <form
      onSubmit={handleSubmit}
      className="shadow-xl w-full p-6   flex flex-col gap-5"
    >
      <h2 className="text-2xl font-semibold text-center text-white">
        Log Account
      </h2>

      {/* Email */}
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm text-gray-300">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="example@email.com"
          className="px-4 py-2 rounded-lg bg-gray-900 text-white
                     border border-gray-700 focus:outline-none
                     focus:ring-2 focus:ring-amber-500"
          required
        />
      </div>

      {/* Password */}
      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="text-sm text-gray-300">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
          maxLength={12}
          minLength={6}
          className="px-4 py-2 rounded-lg bg-gray-900 text-white
                     border border-gray-700 focus:outline-none
                     focus:ring-2 focus:ring-amber-500"
          required
        />
      </div>

      {/* Submit Button */}
      <button
          type="submit"
          disabled={isLoggingUp}
          className="mt-4 bg-amber-500 hover:bg-amber-600
                     text-black font-semibold py-2 rounded-lg
                     transition duration-200"
        >
          {isLoggingUp ? "Logging up..." : "Login Up"}
        </button>

        <div className='flex justify-center'>
          <p className='text-primary-content'>Don't have an account? </p>
          <Link to={"/signup"} className='underline btn-success ml-2 text-blue-500'>SignUp</Link>
        </div>
    </form>
  </Container>)
}

export default LoginPage
