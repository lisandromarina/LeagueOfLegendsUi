import React, { useState } from 'react';
import NavbarComponent from "./NavbarComponent";

function NavbarContainer() {
    const [search, setSearch] = useState("");
    const [keyRegion, setKeyRegion] = useState(
        { 
            key: "la2",
            label: "Las"
        });

    //functions
    function handleOnChange(text) { 
        setSearch(text) 
    };

    function handleOnClick() {
        window.location.href=`/summoner/${keyRegion.key}/${search}`
    }

    function handleRegionOnSelect(eventKey, label) {
        setKeyRegion({...keyRegion, 
            key: eventKey,
            label: label
        });
    };

    //i call the view
    return (
        <NavbarComponent
            handleOnChange={handleOnChange}
            handleOnClick={handleOnClick}
            handleRegionOnSelect={handleRegionOnSelect}
            keyRegion={keyRegion}
        />
    );
}

export default NavbarContainer;