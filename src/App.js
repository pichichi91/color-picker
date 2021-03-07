import React, { useCallback, useEffect, useState } from "react"
import './App.css';
import ColorThief from '../node_modules/colorthief/dist/color-thief.mjs'


function App() {

  const [imageUrl, setImageUrl] = useState("https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Boca_Juniors_logo18.svg/1200px-Boca_Juniors_logo18.svg.png");
  const [palette, setPalette] = useState([]);
  const [colors, setColors] = useState([]);



  const colorThief = new ColorThief();



  function load() {
    const img = document.querySelector('#logo');
    if (img !== null) {

      img.setAttribute('crossOrigin', '');

      const retrievedPalette = colorThief.getPalette(img)
      if (retrievedPalette !== undefined) {
        console.log("retrievedPalette: " + retrievedPalette);
        setPalette(retrievedPalette);
      }
    }

  }


  const getPalette = useCallback((img) => {
    if (img != null) {
      img.setAttribute('crossOrigin', '');
      if (img.complete) {
        const retrievedPalette = colorThief.getPalette(img)
        if (retrievedPalette !== undefined) {
          console.log("getPalette: " + retrievedPalette);
          setPalette(retrievedPalette);
        }
      }
    }
  }, [colorThief])

  useEffect(() => {
    const img = document.querySelector('#logo');
    const retrievedPalette = getPalette(img);
    if (retrievedPalette !== undefined) {
      console.log("useEffect: " + retrievedPalette);
      setPalette(retrievedPalette);
    }

  }, [imageUrl])

  useEffect(() => {
    const colors = palette && palette.map((color) => {
      const decimalCode = color[0] * 65536 + color[1] * 256 + color[2];
      const heximalCode = "#" + decimalCode.toString(16).toUpperCase()
      return heximalCode
    })
    setColors(colors)
  }, [palette])


  return (
    <div className="App">
      <h1>Color Picker</h1>
      <form onSubmit={(event) => {
        event.preventDefault();
        load();
      }}>
        <input type="text" onLoad={load} value={imageUrl} onChange={(event) => {
          setImageUrl(event.target.value)
          setPalette([])
          load();

        }} />
        <button

        > Generate Palette</button>
      </form>

      { imageUrl && <img id="logo" className="App-logo" src={imageUrl} alt="logo" />}

      <div className="colorBox">
        <div className="colorWrapper">


          {colors && colors.map((color, index) => (
            <div className="colorDisplay" style={{ backgroundColor: color }}>
              {color}
            </div>
          ))}
        </div>
      </div>
    </div >
  );
}


export default App;
