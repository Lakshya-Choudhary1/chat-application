import React, { useState, useEffect } from 'react'
import { useNavigate ,Link} from "react-router-dom"
import { useAuthStore } from '../../store/useAuthStore'
import Loading from '../util/Loading'
import Container from '../../components/Container'
import Application from '../../components/Application'

const SignupPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: ""
  })

  const { signup, isSigningUp, authUser } = useAuthStore()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await signup(formData)
  }

  useEffect(() => {
    if (authUser && !isSigningUp) {
      navigate("/")
    }
  }, [authUser, navigate,isSigningUp])

  if (isSigningUp) {
    return <Loading />
  }

 return (<Container>
  <Application />
  <form
        onSubmit={handleSubmit}
        className="w-full bg-gray-800 rounded-2xl shadow-xl p-4 sm:p-6 flex flex-col gap-5"
      >
        <h2 className="text-2xl font-bold text-center text-white">
          Create Account
        </h2>

        {/* Full Name */}
        <div className="flex flex-col gap-1">
          <label htmlFor="fullName" className="text-sm text-gray-300">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="John Doe"
            className="px-4 py-2 rounded-lg bg-gray-900 text-white
                       border border-gray-700 focus:outline-none
                       focus:ring-2 focus:ring-amber-500"
            required
          />
        </div>

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
          disabled={isSigningUp}
          className="mt-4 bg-amber-500 hover:bg-amber-600
                     text-black font-semibold py-2 rounded-lg
                     transition duration-200"
        >
          {isSigningUp ? "Signing up..." : "Sign Up"}
        </button>

        {/* nav to login */}
        <div className='flex justify-center'>
          <p className='text-primary-content'>Already have an account? </p>
          <Link to={"/login"} className='underline btn-success ml-2 text-blue-500'>LogIn</Link>
        </div>
      </form>
 </Container>
);
}

export default SignupPage;