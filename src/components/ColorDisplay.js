import React from 'react';
import { ToastContainer, toast } from 'react-toastify';

import { StyledColorWrapper, StyledColorDisplay, StyledColorBox, Info, PercentageBox, ToastWrapper } from "./Styles"
import { useSpring, animated } from 'react-spring'
import 'react-toastify/dist/ReactToastify.css';

export default function ColorDisplay({ colors }) {


    const animation = useSpring({ opacity: 1, from: { opacity: 0 } })

    const ToastMessage = ({ closeToast, toastProps, color }) => (
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

    return (
        <div style={{ width: "90%" }}>

            <animated.div style={animation}>
                <div>

                    <StyledColorBox >

                        <StyledColorWrapper >

                            {colors && colors.map((color, index) => {
                                return (
                                    <StyledColorDisplay key={index} color={color} onClick={onClickColor} >
                                        <div>
                                            <div>{color.hex}</div>
                                            <PercentageBox>{color.percentage} %</PercentageBox>

                                        </div>
                                    </StyledColorDisplay>
                                )
                            })}
                            <Info >  ... click on the color to copy it to the clipboard </Info >

                        </StyledColorWrapper>

                    </StyledColorBox>
                </div>
            </animated.div>
            <ToastWrapper>
                <ToastContainer />

            </ToastWrapper>
        </div>

    );
}