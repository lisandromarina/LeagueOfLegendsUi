import React from "react"
import { Card, Button } from 'react-bootstrap';


function PlayerProfileComponent(props) {
    const {
        summoner,
        summonerDetail,
        champioMostUsed
    } = props
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={"http://ddragon.leagueoflegends.com/cdn/5.9.1/img/champion/Vayne.png"} />
            <Card.Body>
                <Card.Title>{summoner.name}</Card.Title>
                <Card.Text>
                    Level: {summoner.summonerLevel}
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    )
}

export default PlayerProfileComponent;