import React from 'react';
// import Sidebar from './components/Sidebar';
import './App.css';
import {Routes, Route } from "react-router-dom";
import Login from './components/Login'
import Register from './components/Register';
import Movies from './components/Movies';
import Home from './components/Home';
import Trending from './components/Trending';
import Series from './components/Series';
import Search from './components/Search';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/trending' element={<Trending />} />
        <Route path='/series' element={<Series />} />
        <Route path='/search' element={<Search />} />
      </Routes>
    </div>
  );
} 

export default App;
