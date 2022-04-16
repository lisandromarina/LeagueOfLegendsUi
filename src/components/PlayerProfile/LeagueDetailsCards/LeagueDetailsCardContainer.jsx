import React, { useState, useEffect } from 'react';
import axios from 'axios';

import LeagueDetailsCardComponent from './LeagueDetailsCardComponent';

function LeagueDetailsCardContainer(props) {
    const {
        summoner,
        region
    } = props
    
    const [summonerAux, setSummonerAux] = useState({})
    const [isLoading, setLoading] = useState(true)
    const [summonerDetail, setSummonerDetail] = useState([])
    const [startFetchMaestry, setStartFetchMaestry] = useState(false)

    function calculateWinRatePorcent(oneLeague) {
        let totalGames = oneLeague.wins + oneLeague.losses;
        let porcent = oneLeague.wins / totalGames
        porcent = porcent * 100

        return Math.round(porcent).toFixed(1);
    }

    function verifayIsRanked(arrayOfLeagues, type) {
        const typeRankeds = ["RANKED_SOLO_5x5", "RANKED_FLEX_SR", "RANKED_TFT"]
        if (!arrayOfLeagues.some(oneLeague => oneLeague.queueType === typeRankeds[0]) && type === "lol") {
            arrayOfLeagues.push({ queueType: typeRankeds[0], tier: "UNRANKED", wins: 0, losses: 0 })
        }
        if (!arrayOfLeagues.some(oneLeague => oneLeague.queueType === typeRankeds[1]) && type === "lol") {
            arrayOfLeagues.push({ queueType: typeRankeds[1], tier: "UNRANKED", wins: 0, losses: 0 })
        }
        if (!arrayOfLeagues.some(oneLeague => oneLeague.queueType === typeRankeds[2]) && type === "tft") {
            arrayOfLeagues.push({ queueType: typeRankeds[2], tier: "UNRANKED", wins: 0, losses: 0 })
        }
    }

    async function fetchSummonerTft() {
        await axios.get(`https://${region}.${process.env.REACT_APP_DOMAIN}/tft/league/v1/entries/by-summoner/${summonerAux.id}?api_key=${process.env.REACT_APP_RIOT_KEY}`)
            .then(res => {
                if (res.data.length) {
                    setSummonerDetail([...summonerDetail, res.data[0]])
                }
                verifayIsRanked(summonerDetail, "tft")
                setStartFetchMaestry(!startFetchMaestry)
                setLoading(!isLoading)
            })
    }

    async function fetchSummonerDetail() {
        await axios.get(`https://${region}.${process.env.REACT_APP_DOMAIN}/lol/league/v4/entries/by-summoner/${summonerAux.id}?api_key=${process.env.REACT_APP_RIOT_KEY}`)
            .then(res => {
                verifayIsRanked(res.data, "lol")
                setSummonerDetail(res.data)
            })
    }
    
    useEffect(() => {
        setSummonerAux(summoner)
    }, []);

    useEffect(() => {
        if(JSON.stringify(summonerAux) !=='{}') fetchSummonerDetail()
    }, [summonerAux]);


    useEffect(() => {
        if (summonerDetail.length == 2) fetchSummonerTft()
    }, [summonerDetail]);


    return (
        <LeagueDetailsCardComponent 
            calculateWinRatePorcent={calculateWinRatePorcent}
            isLoading={isLoading}   
            summonerDetail={summonerDetail}
        />
    )
};

export default LeagueDetailsCardContainer;