import React, { useCallback, useEffect, useState } from "react"
import ColorThief from '../node_modules/colorthief/dist/color-thief.mjs'
import { Container } from "./components/Styles"
import ColorDisplay from "./components/ColorDisplay"
import Input from "./components/Input"

function App() {
  const [palette, setPalette] = useState([]);
  const [colors, setColors] = useState([]);

  // eslint-disable-next-line
  const colorThief = new ColorThief();



  function load() {
    const img = document.querySelector('#logo');
    if (img !== null) {

      img.setAttribute('crossOrigin', '');
      console.log(img)
      if (img.width > 0 && img.height > 0) {
        try {
          const retrievedPalette = colorThief.getPalette(img)
          if (retrievedPalette !== undefined) {
            setPalette(retrievedPalette);
          }
        } catch (error) {
          console.log(error);
        }


      }

    }

  }


  const getPalette = useCallback((img) => {
    if (img != null) {
      img.setAttribute('crossOrigin', '');
      if (img.complete) {
        const retrievedPalette = colorThief.getPalette(img)
        if (retrievedPalette !== undefined) {
          setPalette(retrievedPalette);
        }
      }
    }
  }, [colorThief])



  useEffect(() => {
    const colors = palette && palette.map((color) => {

      const [red, green, blue] = color

      const decimalCode = red * 65536 + green * 256 + blue;
      const heximalCode = "#" + decimalCode.toString(16).toUpperCase().padStart(6, "0")


      const luma = Math.sqrt(
        0.299 * (red * red) +
        0.587 * (green * green) +
        0.114 * (blue * blue)
      ); // per ITU-R BT.709c


      const isDark = luma < 70;



      return { red: red, green: green, blue: blue, hex: heximalCode, luma: luma, isDark: isDark }
    })
    setColors(colors)
  }, [palette])


  return (
    <Container>
      <h1>Color Picker</h1>
      <Input load={load} setPalette={setPalette} getPalette={getPalette} />
      { palette.length > 0 && <ColorDisplay colors={colors} />}

    </Container >
  );
}



export default App;
