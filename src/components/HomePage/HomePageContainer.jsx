import React, { useEffect } from 'react';
import axios from 'axios';
import HomePageComponent from "./HomePageComponent";

function HomePageContainer(){

    useEffect(() => {
        axios.get(`https://la2.api.riotgames.com/tft/summoner/v1/summoners/by-name/exoress?api_key=RGAPI-c8401e39-2b12-43b4-a778-ea8931241f3c`)
      .then(res => {
        console.log(res.data)
      })
      }, []);
    return(
        <HomePageComponent />
    );
}


export default HomePageContainer;