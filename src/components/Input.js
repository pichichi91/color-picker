import React from 'react';
import { StyledForm, StyledInput, LoadedImage } from "./Styles"

export default function Input({ load, imageUrl, setImageUrl }) {

    function onCreatePalette(event) {
        setImageUrl(event.target.value)
    }

    return (
        <StyledForm onSubmit={(event) => event.preventDefault()} >
            <StyledInput type="text" onLoad={load} value={imageUrl} onChange={onCreatePalette} />
            <div >
                {imageUrl && <LoadedImage id="logo" src={imageUrl} alt="logo" />}

            </div>

        </StyledForm>
    );
}