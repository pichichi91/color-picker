import React, { useState, useEffect } from "react"
import { Container, InfoBox } from "./components/Styles"
import ColorDisplay from "./components/ColorDisplay"
import Input from "./components/Input"
import { usePalette } from "./components/PaletteBuilder"
function App() {

  const [pixels, setPixels] = useState([])

  const [imageUrl, setImageUrl] = useState("https://upload.wikimedia.org/wikipedia/de/thumb/a/aa/Fc_barcelona.svg/559px-Fc_barcelona.svg.png");
  usePalette(setPixels)



  return (
    <Container>
      <h1>Color Picker</h1>
      <Input imageUrl={imageUrl} setImageUrl={setImageUrl} />

      {!imageUrl && <InfoBox>
        <p>Do you want see the color palette of your own picture / logo? Just add the link above!</p>
        <p>Images that don't have <strong> 'Access-Control-Allow-Origin' </strong> headers might not be supported (yet)</p>

      </InfoBox>}

      <canvas style={{ marginTop: "3em" }} id="myCanvas" width="800" height="400"></canvas>
      { pixels.length > 0 && <ColorDisplay colors={pixels} />}

    </Container >
  );
}



export default App;
