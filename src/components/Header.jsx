import React from "react"
import Logo from "../assets/fox-logo.svg"
import "./index.css"

export default function Header() {
    return (
        <header className="header">
            <img 
                src={Logo} 
                className="header--image"
            />
            <h2 className="header--title">Meme Generator</h2>
            <h4 className="header--project">React Course - Project 3</h4>
        </header>
    )
}