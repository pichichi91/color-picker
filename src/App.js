import React, { useState } from "react"
import { Container, InfoBox } from "./components/Styles"
import ColorDisplay from "./components/ColorDisplay"
import Input from "./components/Input"
import { usePalette } from "./components/PaletteBuilder"
function App() {

  const [pixels, setPixels] = useState([])
  const [imageUrl, setImageUrl] = useState("https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Boca_Juniors_logo18.svg/1200px-Boca_Juniors_logo18.svg.png");
  const [isLoading, setIsLoading] = useState(false);
  const [showPercent, setShowPercent] = useState(false);

  usePalette(setPixels, imageUrl, setIsLoading)

  return (
    <Container>
      <h1>Color Picker</h1>
      <Input imageUrl={imageUrl} setImageUrl={setImageUrl} setIsLoading={setIsLoading} />
      {isLoading && <div>Loading... </div>}
      {!imageUrl && !isLoading && <InfoBox>
        <p>Do you want see the color palette of your own picture / logo? Just add the link above!</p>
        <p>Images that don't have <strong> 'Access-Control-Allow-Origin' </strong> headers might not be supported (yet)</p>

      </InfoBox>}

      <canvas style={{ marginTop: "3em" }} id="myCanvas" width="800" height="400"></canvas>
      { pixels.length > 0 && <ColorDisplay colors={pixels} showPercent={showPercent} setShowPercent={setShowPercent} />}

    </Container >
  );
}



export default App;
