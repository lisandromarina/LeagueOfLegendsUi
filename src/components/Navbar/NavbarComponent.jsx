import React from 'react';
import { Container, Navbar, Nav, Form, FormControl, Button, NavDropdown } from 'react-bootstrap';

function NavbarComponent(props) {
    const {
        handleOnChange,
        handleOnClick,
        handleRegionOnSelect,
        keyRegion
    } = props;
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Nav className="me-auto">
                    <Navbar.Brand href="#home">Lol Stats</Navbar.Brand>
                </Nav>
                <Nav className="me-auto" >
                    <NavDropdown 
                        id="nav-dropdown" 
                        menuVariant="dark" 
                        title={keyRegion.label}  
                        onSelect={(eventKey, item) => handleRegionOnSelect(eventKey, item.target.text)
                    }>
                        <NavDropdown.Item eventKey="na1">Na</NavDropdown.Item>
                        <NavDropdown.Item eventKey="la1">Lan</NavDropdown.Item>
                        <NavDropdown.Item eventKey="la2">Las</NavDropdown.Item>
                        <NavDropdown.Item eventKey="br1">Br</NavDropdown.Item>
                        <NavDropdown.Item eventKey="eun1">Eun</NavDropdown.Item>
                        <NavDropdown.Item eventKey="euw1">Euw</NavDropdown.Item>
                        <NavDropdown.Item eventKey="jp1">Jap</NavDropdown.Item>
                        <NavDropdown.Item eventKey="kr">Kr</NavDropdown.Item>
                        <NavDropdown.Item eventKey="oc1">Oc</NavDropdown.Item>
                        <NavDropdown.Item eventKey="tr1">Tr</NavDropdown.Item>
                        <NavDropdown.Item eventKey="ru">Ru</NavDropdown.Item>
                    </NavDropdown>
                    <Form className="d-flex">
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="me-2 bg-dark text-light"
                            aria-label="Search"
                            onChange={event => handleOnChange(event.target.value)}

                        />
                        <Button variant="info" onClick={() => handleOnClick()}>Search</Button>
                    </Form>
                </Nav> 
            </Container>
        </Navbar>
    );
}

export default NavbarComponent;
