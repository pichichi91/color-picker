import React from 'react';
import { InfoBox } from "./Styles"


const Info = () => {
    return (
        <InfoBox>
            <p>Do you want see the color palette of your own picture / logo? Just add the link above!</p>
            <p>Images that don't have <strong> 'Access-Control-Allow-Origin' </strong> headers might not be supported (yet)</p>

        </InfoBox>
    );
}

export { Info };