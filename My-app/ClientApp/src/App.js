import React from 'react';
import './custom.css'; // your custom styles
import { Route, Routes } from 'react-router-dom';
import { Counter } from "./components/Counter";
import { Home } from './components/Home';
import SignUp from './Account/SignUp';
import Header from './components/Header';

export default function App() {


  return (
    <>
    
      <Routes>
        
        <Route path="/counter" element={<Counter />}></Route>
        <Route path="/" element={<Home />}></Route>
        {/* <Route path="/sai" element={<Sai />}></Route> */}
       < Route path="/signup" element={<SignUp/>} />
      </Routes>
    </>
  );
}