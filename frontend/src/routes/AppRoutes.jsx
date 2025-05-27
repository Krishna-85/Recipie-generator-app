import React from 'react'
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'; 
import Register from '../views/register/Register';
import Home from '../views/home/Home';
import Login from '../views/login/Login';
import { Toaster } from 'react-hot-toast';
import Authenticate from '../components/Authenticate';
import NotFound from '../components/NotFound';

const AppRoutes = () => {
  return (
     <BrowserRouter>
       <Toaster position="top-center" reverseOrder={false} />
     <Routes>
        <Route path='/' element={<Navigate to="/register" replace />}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/home' element={<Authenticate><Home/></Authenticate>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='*' element={<NotFound/>}/>

     </Routes>
     </BrowserRouter>
  )
}

export default AppRoutes


