import React from "react"
import Logo from "../assets/fox-logo.svg"
import "./index.css"

export default function Header() {
    return (
        <header className="header">
            <div id="header-left">
                <img 
                    src={Logo} 
                    className="header--image"
                />
                <h2 className="header--title">Meme Generator</h2>
            </div>
            <div id="header-right">
                <h4 className="header--project">made by r2</h4>
            </div>
        </header>
    )
}