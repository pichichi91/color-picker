import React from 'react';
import { StyledColorWrapper, StyledColorDisplay, StyledColorBox, Info } from "./Styles"
import { useSpring, animated } from 'react-spring'

export default function ColorDisplay({ colors }) {

    const animation = useSpring({ opacity: 1, from: { opacity: 0 } })

    return (
        <animated.div style={animation}>
            <StyledColorBox className="colorBox">

                <StyledColorWrapper className="colorWrapper">

                    {colors && colors.map((color, index) => {

                        console.log(color)
                        return (

                            <StyledColorDisplay key={index} color={color} onClick={(event) => navigator.clipboard.writeText(event.currentTarget.textContent)} >

                                {color.hex}
                            </StyledColorDisplay>
                        )
                    })}

                </StyledColorWrapper>

            </StyledColorBox>
            <Info >  ... click on the color to copy it to the clipboard </Info >

        </animated.div>
    );
}