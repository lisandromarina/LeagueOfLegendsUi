import React from "react"
import { Image, Container, Spinner } from 'react-bootstrap';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import LeagueDetailsCard from "./LeagueDetailsCards";
import HistoryMatch from "./HistoryMatch";

function PlayerProfileComponent(props) {
    const {
        isLoading,
        summoner,
        region,
        champioMostUsed,
    } = props

    return (
        <>
            {
                !isLoading ?

                    <Container>
                        <div className="row">
                            <Image
                                style={{ paddingBottom: "10px", textAlign: "center", color: "white", position: "relative" }}
                                variant="top"
                                fluid
                                src={`${process.env.PUBLIC_URL}/assets/champions/${champioMostUsed.name.replace(/\s/g, '')}.jpg`}
                                alt="image"
                                class="w-100 img-fluid"
                            />
                            <h1 style={{ position: "absolute", color: "white", left: "20%", top: "15%", width: "100%" }}>{summoner.name}</h1>
                            <h3 style={{ position: "absolute", color: "white", left: "20%", top: "25%", width: "100%" }}>Level: {summoner.summonerLevel}</h3>
                        </div>
                        <LeagueDetailsCard 
                            summoner={summoner} 
                            region={region}
                        />
                        <HistoryMatch class="text-white">
                            hola
                        </HistoryMatch>
                    </Container>
                    :
                    //If isLoading == true
                    <div class="row d-flex justify-content-center align-item-center h-100">
                        <Spinner animation="border" variant="info" />
                    </div>
            }
        </>
    )
}

export default PlayerProfileComponent;