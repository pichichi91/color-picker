import styled from "styled-components"



const StyledColorBox = styled.div`
  display: flex;
  justify-content: center;
`

const StyledColorWrapper = styled.div`
  display: flex;
  width: 80%;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 3em;
  padding-top: 2em;

  border-top: 10px solid #8080802e;
  border-bottom: 10px solid #8080802e;

  @media screen and (max-width: 768px) {
    width: 90%;
  }

`

const StyledColorDisplay = styled.div`
  background-color: ${(props) => props.color.hex};
  padding: 1em;
  border: 0px solid ${(props) => props.color.isDark ? "white" : "black"};
  margin-bottom: 1em;
  margin-right: 1em;
  font-size: 1.3em;
  font-weight: bold;
  color:  ${(props) => props.color.isDark ? "white" : "black"};
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
  @media screen and (max-width: 768px) {
    height: 30vmin;

}
`

export { LoadedImage, StyledInput, StyledForm, StyledColorBox, StyledColorWrapper, StyledColorDisplay, StyledButton, Container, Info };