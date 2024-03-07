import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../components/Login';
import Signup from '../components/Signup';
// import Home from '../components/Home';


function MyRouter() {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      {/* <Route path="/home" element={<Home />}></Route> */}
      <Route path="/signup" element={<Signup />}></Route>

    </Routes>
  )
}

export default MyRouter