import React from 'react';
import { StyledColorList, ToastWrapper } from "./Styles"
import { ToastContainer, toast } from 'react-toastify';
import styled from "styled-components"
const ToastMessage = ({ color }) => (
    <div>
        <strong>  {color}  </strong> copied to clipboard
    </div>
)

const onClickColor = (event) => {
    const color = event.currentTarget.textContent.substring(0, 7)
    navigator.clipboard.writeText(color)
    toast(<ToastMessage color={color} />, {
        position: "bottom-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    })

}

const Clubcolors = (colors) => {
    console.log(colors.colors.colors);
    return (
        <ColorBox >
            {colors.colors.colors && colors.colors.colors.map((colorItem) => {
                return <StyledColorList key={colorItem.hex} color={colorItem} onClick={onClickColor} >{colorItem.hex}</StyledColorList>
            })}
            <ToastWrapper>
                <ToastContainer />

            </ToastWrapper>
        </ColorBox>
    );

}

const ColorBox = styled.div`

    margin-top: 1em;
    width: 60%;
    display: flex;
    flex-wrap: wrap;

    @media screen and (max-width: 768px) {
        width: 30%;
        margin-top: 0em;
        flex-wrap: wrap;
    }

`

export { Clubcolors }; 