import React, { useCallback, useRef } from "react"
import { toPng } from 'html-to-image'
import "./index.css"

export default function Meme() {
  const [meme, setMeme] = React.useState ({
    topText:"",
    bottomText:"",
    randomImage: "http://i.imgflip.com/1bij.jpg",
    memeLink:""
  })

  const [allMemes, setAllMemes] = React.useState([])

  React.useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then(res => res.json())
      .then(data => setAllMemes(data.data.memes))
  }, [])

  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemes.length)
    const url = allMemes[randomNumber].url
    setMeme(prevMeme => ({
        ...prevMeme,
        randomImage: url
    }))
  }

  function getMemeLink() {
    setMeme(prevMeme => ({
      ...prevMeme,
      randomImage: meme.memeLink
    }))
  }

  function handleChange(event) {
    const {name, value} = event.target
    setMeme(prevMeme => ({
      ...prevMeme,
      [name]:value
    }))
  }

  // Font section, set meme font name

  const [fontName, setFontName] = React.useState("Lilita One, Impact")

  
  function fontLilita () {
    setFontName("Lilita One, Impact")
    console.log("font is Lilita One")
  }
  
  function fontGaegu () {
    setFontName("Gaegu, Comic Sans, sans-serif")
    console.log("font is Gaegu")
  }

  // Font section, set meme font size

  const [fontSizing, setFontSizing] = React.useState(36)

  function fontDown () {
    setFontSizing(prevFontSizing => prevFontSizing - 2)
    console.log(fontSizing)
  }
  
  function fontReset () {
    setFontSizing(36)
    console.log(fontSizing)
  }

  function fontUp () {
    setFontSizing(prevFontSizing => prevFontSizing + 2)
    console.log(fontSizing)
  }

  // HTML-to-image code, Download meme

  const ref = useRef(null)

  const htmlToImageConvert = useCallback(() => {
    if (ref.current === null) {
      return
    }
    
    toPng(ref.current, { cacheBust: false, })
      .then((dataUrl) => {
        const link = document.createElement("a")
        link.download = "meme-by-r2.png"
        link.href = dataUrl
        link.click()
      })
  }, [ref])

  // Return section

  return (
    <main>
      <div className="form">
        <input 
          type="text" 
          className="form--input"
          placeholder="Top Text" 
          onChange={handleChange}
          name="topText"
          value={meme.topText}
        />
        <input 
          type="text" 
          className="form--input"
          placeholder="Bottom Text"
          onChange={handleChange}
          name="bottomText"
          value={meme.bottomText}
        />
        <div className="button-container">
          <button 
            className="form--button"
            onClick={getMemeImage}
          >
            Random Meme
          </button>
          <button 
            className="form--button"
            onClick={getMemeLink}
          >
            Meme From URL
          </button>
          <input 
          type="url" 
          className="form--url"
          placeholder="Image URL" 
          onChange={handleChange}
          name="memeLink"
          value={meme.memeLink}
          />
        </div>
      </div>
      <div id="font-section">
        <div id="font-container">
          <h2>Font</h2>
          <button 
            className="form--button"
            onClick={fontLilita}
          >
            Lilita
          </button>
          <button 
            className="form--button"
            onClick={fontGaegu}
          >
            Gaegu
          </button>
        </div>
        <div id="size-container">
          <h2>Size {fontSizing}</h2>
          <button 
            className="form--button"
            onClick={fontDown}
          >
            -
          </button>
          <button 
            className="form--button"
            onClick={fontReset}
          >
            Reset
          </button>
          <button 
            className="form--button"
            onClick={fontUp}
          >
            +
          </button>
        </div>
      </div>
      <div id="meme-section">
        <div className="empty-div"></div>
        <div id="meme-button-container">
          <div className="meme" ref={ref} style={{fontSize: (fontSizing), fontFamily: (fontName)}}>
            <img src={meme.randomImage} className="meme--image"  />
            <p className="meme--text top">{meme.topText}</p>
            <p className="meme--text bottom">{meme.bottomText}</p>
          </div>
          <div id="download-container">
            <button 
              id="download--button"
              className="form--button"
              onClick={htmlToImageConvert}
            >
              Download Meme
            </button>
          </div>
        </div>
        <div className="empty-div"></div>
      </div>
    </main>
  )
}