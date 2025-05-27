import React, { useState } from 'react'
import Button from '../../components/Button'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUser } from '../../redux/features/user/user.feature'
import { useNavigate } from 'react-router-dom'
import { TiSocialLinkedin } from "react-icons/ti";
import { SlSocialInstagram } from "react-icons/sl";
import { SlSocialGithub } from "react-icons/sl";
import toast from 'react-hot-toast'


const Register = () => {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = async (e)=>{
       e.preventDefault();

       const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/register`,{
        username,
        email,
        password
       },{
        withCredentials: true
       })
console.log(import.meta.env.VITE_BACKEND_URL);
// Output: https://recipie-generator-app.onrender.com

       dispatch(setUser({
        username:response.data.user.username,
        email:response.data.user.email
       }))
        toast.success("Login successful!");

       navigate('/home')

    }

  return (
    <>
  <div className="flex justify-center items-center min-h-screen bg-black px-4">
  <form
    onSubmit={handleSubmit}
    className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md text-center"
  >
    <h1 className="text-2xl font-bold mb-6 gradient-text">Register Here</h1>


    <div className="flex justify-center gap-4 mb-6 opacity-50">
      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl"><a href="www.linkedin.com/in/vaibhav-chauhan-608627340"><TiSocialLinkedin />
</a></div>
      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl"><a href="https://www.instagram.com/krishna_85__/"><SlSocialInstagram /></a></div>
      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl"><a href="https://github.com/krishna-85/"><SlSocialGithub /></a></div>
    </div>

    <div className="relative mb-4">
      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
        <i className="fas fa-user" />
      </span>
      <input
        type="text"
        placeholder="Name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        className="w-full pl-10 pr-4 py-3 rounded-md bg-gray-100 focus:outline-none"
      />
    </div>

    <div className="relative mb-4">
      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
        <i className="fas fa-envelope" />
      </span>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full pl-10 pr-4 py-3 rounded-md bg-gray-100 focus:outline-none"
      />
    </div>

    <div className="relative mb-6">
      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
        <i className="fas fa-lock" />
      </span>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full pl-10 pr-4 py-3 rounded-md bg-gray-100 focus:outline-none"
      />
    </div>

    <Button/>
    <a className='text-lg' href="/login">Already a user? click to <span className=' text-blue-600 underline'>login</span></a>
  </form>
</div>


     </>
  )
}

export default Register
