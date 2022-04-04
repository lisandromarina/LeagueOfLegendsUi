import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/Navbar"
import Router from "./components/Router"

function App() {
  return (
    <div className='bg-dark bg-gradient min-vh-100'>
      <Navbar />
      <div className='container'>
        <Router />
      </div>
    </div>
  );
}

export default App;

