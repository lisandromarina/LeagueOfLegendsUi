import React from 'react';
import { Card, Image, Container, Spinner, Row, Col } from 'react-bootstrap';
import { CircularProgressbar } from 'react-circular-progressbar';

function LeagueDetailsCardComponent(props) {
    const {
        summonerDetail,
        region,
        isLoading,
        calculateWinRatePorcent
    } = props;
    return (
        <div class="d-flex flex-sm-row flex-column mx-auto">
            <Row xs={1} md={3} className="g-3">
                {
                    !isLoading ?
                        summonerDetail.map(oneLeague => (
                            <Col>
                                <Card class="rounded " bg="dark" text="white">
                                    <Card.Body class="text-center d-flex flex-sm-column flex-row">
                                        <Card.Title class="mt-3 mb-3 ml-3 text-center align-middle">
                                            {
                                                oneLeague.queueType === "RANKED_SOLO_5x5"
                                                    ? "Ranked Solo/Q"
                                                    : oneLeague.queueType === "RANKED_FLEX_SR"
                                                        ? "Ranked Flex"
                                                        : "Ranked TFT"
                                            }
                                        </Card.Title>
                                        <div>
                                            <Image
                                                style={{ width: "30%" }}
                                                variant="top"
                                                fluid
                                                src={`${process.env.PUBLIC_URL}/assets/ranked-emblems/Emblem_${oneLeague.tier}.png`}
                                                alt="image"
                                                class="img-fluid justify-content-center" />

                                            <Card.Text class="mt-3 mb-3">
                                                {oneLeague.tier} {oneLeague.rank}
                                            </Card.Text>
                                        </div>
                                        <div className="d-flex flex-column justify-content-center align-items-center row">
                                            <div class="w-25">
                                                <CircularProgressbar

                                                    value={calculateWinRatePorcent(oneLeague)}
                                                    text={`${calculateWinRatePorcent(oneLeague)}%`}
                                                />
                                            </div>
                                            <Card.Text class="text-left d-xl-none mt-2"> Winrate </Card.Text>
                                            <Card.Text class="text-left mt-3 d-none d-md-block"> Wins: {oneLeague.wins} </Card.Text>
                                            <Card.Text class="text-left d-none d-md-block"> Losses: {oneLeague.losses} </Card.Text>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )) 
                        : 
                        <div class="row d-flex justify-content-center align-item-center h-100">
                            <Spinner animation="border" variant="info" />
                        </div>
                }
            </Row>
        </div>
    )
};

export default LeagueDetailsCardComponent;