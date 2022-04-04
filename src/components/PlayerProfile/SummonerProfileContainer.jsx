import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import axios from 'axios';

import PlayerProfileComponent from "./SummonerProfileComponent";

function PlayerProfileContainer() {
    const [summoner, setSummoner] = useState({})
    const [championId, setChampionId] = useState()
    const [imageChampion, setImageChampion] = useState("")
    const [champioMostUsed, setChampionMostUsed] = useState({})

    const [summonerDetail, setSummonerDetail] = useState({})
    const { region, summonerName } = useParams()

    async function fetchChampion() {
        await axios.get(`http://ddragon.leagueoflegends.com/cdn/12.6.1/data/en_US/champion.json`)
            .then(res => {
                console.log("json")
                let arrayOfChampionsName = Object.values(res.data.data)
                let championMostUsed = arrayOfChampionsName.find(oneChampion => 
                    parseInt(oneChampion.key) === championId
                )
                setChampionMostUsed(championMostUsed)
            })
            console.log(champioMostUsed.image)
    }

    async function fetchSummoner() {
        await axios.get(`https://${region}.${process.env.REACT_APP_DOMAIN}/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${process.env.REACT_APP_RIOT_KEY}`)
            .then(res => {
                console.log("SUMMONER")
                console.log(res.data)
                setSummoner(res.data)
            })
    }

    async function fetchSummonerDetail() {
        await axios.get(`https://${region}.${process.env.REACT_APP_DOMAIN}/lol/league/v4/entries/by-summoner/${summoner.id}?api_key=${process.env.REACT_APP_RIOT_KEY}`)
            .then(res => {
                console.log("SUMMONER DETAIK")
                console.log(res.data)
                setSummonerDetail(res.data)
            })
    }

    async function findChampionMaestryByPoints(championsArray){
        let maxMaestry = -1;
        championsArray.forEach(oneChampion => {
            if(oneChampion.championPoints > maxMaestry){
                maxMaestry = oneChampion.championPoints
                setChampionId(oneChampion.championId)
            }
        })
        await fetchChampion()
    }

    async function fetchChampionsMaestry() {
        await axios.get(`https://${region}.${process.env.REACT_APP_DOMAIN}/lol/champion-mastery/v4/champion-masteries/by-summoner/${summoner.id}?api_key=${process.env.REACT_APP_RIOT_KEY}`)
            .then(res =>  {
                findChampionMaestryByPoints(res.data)
            })
    }

    async function fetchChampionImage() {
        await axios.get(`http://ddragon.leagueoflegends.com/cdn/5.9.1/img/champion/${champioMostUsed.image.full}`)
            .then(res =>  {
                setImageChampion(res.data)
            })
    }

    useEffect(() => {
        if (summonerName) fetchSummoner()
    }, []);

    useEffect(() => {
        if (JSON.stringify(summoner) !== JSON.stringify({})) fetchSummonerDetail()
    }, [summoner]);

    useEffect(() => {
        if (JSON.stringify(summonerDetail) !== JSON.stringify({})) fetchChampionsMaestry()
    }, [summonerDetail]);

    //useEffect(() => {
    //    if (JSON.stringify(champioMostUsed) !== JSON.stringify({})) fetchChampionImage()
    //}, [champioMostUsed]);

    return (
        <PlayerProfileComponent
            summoner={summoner}
            summonerDetail={summonerDetail}
            champioMostUsed={champioMostUsed}
        />
    )
}

export default PlayerProfileContainer;