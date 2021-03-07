import React, { Component, useState, useEffect } from 'react';
import { StyledButton, StyledForm, StyledInput, LoadedImage } from "./Styles"

export default function Input({ load, getPalette, setPalette }) {

    const [imageUrl, setImageUrl] = useState("https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Boca_Juniors_logo18.svg/1200px-Boca_Juniors_logo18.svg.png");

    useEffect(() => {
        setPalette([])

        const img = document.querySelector('#logo');
        const retrievedPalette = getPalette(img);
        if (retrievedPalette !== undefined) {
            setPalette(retrievedPalette);
        }
        // eslint-disable-next-line
    }, [imageUrl])


    function onNewUrl(event) {
        event.preventDefault();
        setPalette([])
        load();
    }

    function onCreatePalette(event) {
        setImageUrl(event.target.value)
        setPalette([])
        load();
    }



    return (
        <StyledForm onSubmit={onNewUrl}>
            <StyledInput type="text" onLoad={load} value={imageUrl} onChange={onCreatePalette} />
            <div >
                {imageUrl && <LoadedImage id="logo" src={imageUrl} alt="logo" />}

            </div>

            <StyledButton> Generate Palette</StyledButton>
        </StyledForm>
    );
}