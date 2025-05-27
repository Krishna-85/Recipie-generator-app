import React, { useState } from 'react';
import Button from '../../components/Button';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/features/user/user.feature';
import { useNavigate } from 'react-router-dom';
import { TiSocialLinkedin } from "react-icons/ti";
import { SlSocialInstagram, SlSocialGithub } from "react-icons/sl";
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `https://recipie-generator-app.onrender.com/api/v1/user/login`,
        { email, password },
        { withCredentials: true }
      );

      dispatch(setUser({
        username: response.data.user.username,
        email: response.data.user.email,
      }));

      toast.success("Login successful!");
      navigate('/home');
    } catch (error) {
      console.log("Login error:", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md text-center"
      >
        <h1 className="text-2xl font-bold mb-6 gradient-text">Login Here</h1>

        <div className="flex justify-center gap-4 mb-6 opacity-50">
          <a href="https://www.linkedin.com/in/vaibhav-chauhan-608627340" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl">
            <TiSocialLinkedin />
          </a>
          <a href="https://www.instagram.com/krishna_85__/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl">
            <SlSocialInstagram />
          </a>
          <a href="https://github.com/krishna-85/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl">
            <SlSocialGithub />
          </a>
        </div>

        <div className="relative mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-md bg-gray-100 focus:outline-none"
          />
        </div>

        <div className="relative mb-6">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-md bg-gray-100 focus:outline-none"
          />
        </div>

        <Button type="submit" text="Login" />
        <p className='text-lg mt-4'>
          Not a user?{' '}
          <a className='text-blue-600 underline' href="/register">Register</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
