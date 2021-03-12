import React from 'react';
import { StyledColorWrapper, StyledColorDisplay, StyledColorBox, Info, PercentageBox } from "./Styles"
import { useSpring, animated } from 'react-spring'

export default function ColorDisplay({ colors, }) {

    const animation = useSpring({ opacity: 1, from: { opacity: 0 } })

    return (
        <div style={{ width: "90%" }}>

            <animated.div style={animation}>
                <div>

                    <StyledColorBox >

                        <StyledColorWrapper >

                            {colors && colors.map((color, index) => {
                                return (
                                    <StyledColorDisplay key={index} color={color} onClick={(event) => navigator.clipboard.writeText(event.currentTarget.textContent)} >
                                        <div>
                                            <div>{color.hex}</div>
                                            <PercentageBox>{color.percentage} %</PercentageBox>

                                        </div>
                                    </StyledColorDisplay>
                                )
                            })}

                        </StyledColorWrapper>

                    </StyledColorBox>
                    <Info >  ... click on the color to copy it to the clipboard </Info >
                </div>
            </animated.div>
        </div>

    );
}