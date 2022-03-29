import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from  "../HomePage";
import Contact from "../Contact";

function RouterContainer() {
    return (
        <Routes>
            <Route path='/' element={<HomePage/>} />
            <Route path='/contact' element={<Contact/>} />
        </Routes>  
    );
}
  
export default RouterContainer;