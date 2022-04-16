import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import axios from 'axios';

import PlayerProfileComponent from "./SummonerProfileComponent";

function PlayerProfileContainer() {
    const [summoner, setSummoner] = useState()
    const [championId, setChampionId] = useState()
    const [champioMostUsed, setChampionMostUsed] = useState({})
    const [isLoading, setLoading] = useState(true)
    const [startFetchMaestry, setStartFetchMaestry] = useState(false)


    const { region, summonerName } = useParams()


    async function fetchChampion() {
        await axios.get(`http://ddragon.leagueoflegends.com/cdn/12.6.1/data/en_US/champion.json`)
            .then(res => {
                let arrayOfChampionsName = Object.values(res.data.data)

                const championMostUsedd = arrayOfChampionsName.find(oneChampion => (oneChampion.key == championId))
                setChampionMostUsed(championMostUsedd)
                setLoading(false)
            })
    }

    async function fetchSummoner() {
        await axios.get(`https://${region}.${process.env.REACT_APP_DOMAIN}/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${process.env.REACT_APP_RIOT_KEY}`)
            .then(res => {
                setSummoner(res.data)
            })
    }

    async function findChampionMaestryByPoints(championsArray) {
        let maxMaestry = -1;
        let champion
        championsArray.forEach(oneChampion => {
            if (oneChampion.championPoints > maxMaestry) {
                maxMaestry = oneChampion.championPoints
                champion = oneChampion.championId
            }
        })
        setChampionId(champion)
    }

    async function fetchChampionsMaestry() {
        await axios.get(`https://${region}.${process.env.REACT_APP_DOMAIN}/lol/champion-mastery/v4/champion-masteries/by-summoner/${summoner.id}?api_key=${process.env.REACT_APP_RIOT_KEY}`)
            .then(res => {
                findChampionMaestryByPoints(res.data)
            })
    }


    useEffect(() => {
        if (summonerName) fetchSummoner()
    }, []);

    useEffect(() => {
        if (summoner) fetchChampionsMaestry()
    }, [summoner]);

    useEffect(() => {
        if (championId) fetchChampion()
    }, [championId]);

    return (
        <PlayerProfileComponent
            isLoading={isLoading}
            region={region}
            summoner={summoner}
            champioMostUsed={champioMostUsed}
        />
    )
}

export default PlayerProfileContainer;