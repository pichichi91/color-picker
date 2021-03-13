import React, { useState } from "react"
import { Container, Canvas } from "./components/Styles"
import ColorDisplay from "./components/ColorDisplay"
import Input from "./components/Input"
import { usePalette } from "./components/PaletteBuilder"
import { UpdateButton } from "./components/UpdateButton"
import { Clublist } from "./components/Clublist"
import { Info } from "./components/Info"

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

      {!imageUrl && !isLoading && <Info />}
      <Canvas imageUrl={imageUrl} >
        <canvas id="myCanvas" width="800" height="400"></canvas>
      </Canvas>
      { pixels.length > 0 && <ColorDisplay imageUrl={imageUrl} colors={pixels} showPercent={showPercent} setShowPercent={setShowPercent} />}
      { pixels.length > 0 && imageUrl && <UpdateButton imageUrl={imageUrl} pixels={pixels} />}

      <Clublist />
    </Container >
  );
}



export default App;
