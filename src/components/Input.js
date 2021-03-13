import React from 'react';
import { StyledForm, StyledInput, LoadedImage } from "./Styles"

export default function Input({ load, imageUrl, setImageUrl, setIsLoading }) {

    function onCreatePalette(event) {
        setImageUrl(event.target.value)
        setIsLoading(true)
    }

    return (
        <StyledForm onSubmit={(event) => event.preventDefault()} >
            <StyledInput type="text" onLoad={load} value={imageUrl} onChange={onCreatePalette} placeholder="Add URL to image (Wikipedia works best at the moment)" />
            <div >
                {imageUrl && <LoadedImage id="logo" src={imageUrl} alt="logo" />}

            </div>

        </StyledForm>
    );
}