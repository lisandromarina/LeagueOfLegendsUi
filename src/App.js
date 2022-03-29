import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/Navbar"
import Router from "./components/Router"

function App() {
  return (
    <div>
      <Navbar />
      <Router />
    </div>
  );
}

export default App;

