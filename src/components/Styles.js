import styled from "styled-components"



const StyledColorBox = styled.div`
  display: flex;
  justify-content: center;
`

const StyledColorWrapper = styled.div`
  display: flex;
  width: 80%;
  flex-wrap: wrap;
  flex-direction: row;
  padding-top: 2em;
  margin-top: 2em;
  border-top: 10px solid #8080802e;
  border-bottom: 10px solid #8080802e;
  justify-content: space-evenly;
  @media screen and (max-width: 768px) {
    width: 90%;
    flex-direction: column;
  }


`

const StyledColorDisplay = styled.div`
  background-color: ${(props) => props.color.hex};
  padding: 0.5em;
  border: 0px solid ${(props) => props.color.isDark ? "white" : "black"};
  margin-bottom: 1em;
  font-size: 1.2em;
  font-weight: bold;
  color:  ${(props) => props.color.isDark ? "white" : "black"};
  width: ${(props) => props.color.percentage * 0.9}%;
  min-width: 14%;

  @media screen and (max-width: 768px) {
    width: ${(props) => props.color.percentage * 1.5}%;
    max-width: 100%;
    min-width: 29%;

  }






  border-radius: 10px;
  :hover{
         box-shadow: 0px 1px 20px 0px ${(props) => props.color.hex};
  }
  cursor: pointer;
`

const StyledButton = styled.button`
  background: none;
  border: 3px solid black;
  margin-top: 1em;
  padding: 0.5em;
  width: auto;
  font-size: 2em;
  font-weight: bold;
  background-color: white;
  cursor: pointer;
  transition: all 0.5s;
  :hover{
         box-shadow: 0px 5px 20px 0px #0000009c;
  }
`

const Container = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

`

const Info = styled.div`
margin-top: 1em;
font-weight: bold;
color: grey;
margin-bottom: 1em;

`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 50%;

  @media screen and (max-width: 768px) {
    width: 90%;
  }

`

const StyledInput = styled.input`
font-size: 1em;
  border: none;
  border-bottom: 1px solid;
  background: none;
  padding-bottom: 0.3em;

  :focus {
  outline: 0;
}
`

const LoadedImage = styled.img`
  height: 20vmin;
  pointer-events: none;
  margin-top: 1em;
  display: none;

  @media screen and (max-width: 768px) {
    height: 30vmin;

}
`

const InfoBox = styled.div`

background-color: #3f51b529;
    margin: 2em;
    padding: 2em;
    box-sizing: border-box;
    border: 1px so;
    box-shadow: 10px 10px 0px 0px #000000ab;
    max-width: 400px;
`



const PercentageBox = styled.div`
font-size: 0.5em;
`

const ToastWrapper = styled.div`
    font-family: "Montserrat", sans-serif;
.Toastify__toast {
  border-radius: 12px;
    padding: 0.7em;
    min-height: 40px;
    font-size: 1.2em;
}
strong {
  color: #073D7A;
  
}
`

const Canvas = styled.div`
canvas {
  overflow: hidden;

}
  margin-top: 3em;
  width: 100%;
  height: 95%;
  overflow-x:hidden;


`


export { Canvas, ToastWrapper, PercentageBox, InfoBox, LoadedImage, StyledInput, StyledForm, StyledColorBox, StyledColorWrapper, StyledColorDisplay, StyledButton, Container, Info };