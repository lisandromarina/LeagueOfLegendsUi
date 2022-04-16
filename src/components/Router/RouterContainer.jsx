import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from  "../HomePage";
import Contact from "../Contact";
import PlayerProfileContainer from '../PlayerProfile';
import TftContainer from '../Tft';

function RouterContainer() {
    return (
        <Routes>
            <Route path='/' element={<HomePage/>} />

            <Route exact path='/contact' element={<Contact/>} />

            <Route exact path='/Tft' element={<TftContainer/>} />

            <Route exact path='/summoner/:region/:summonerName' element={<PlayerProfileContainer/>} />
        </Routes>  
    );
}
  
export default RouterContainer;