import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'; 
import Register from '../views/register/Register';
import Home from '../views/home/Home';
import Login from '../views/login/Login';
import { Toaster } from 'react-hot-toast';
import Authenticate from '../components/Authenticate';

const AppRoutes = () => {
  return (
     <BrowserRouter>
       <Toaster position="top-center" reverseOrder={false} />
     <Routes>
        <Route path='/' element={<h1>home</h1>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/home' element={<Authenticate><Home/></Authenticate>}/>
        <Route path='/login' element={<Login/>}/>
     </Routes>
     </BrowserRouter>
  )
}

export default AppRoutes


