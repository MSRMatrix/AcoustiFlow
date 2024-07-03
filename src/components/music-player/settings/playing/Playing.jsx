import { useState } from "react";
import TextForIcon from "../../functions/TextForIcon";

const Playing = ({playing, setIsPlaying, src, setSrc}) => {
    const [showText, SetShowText] = useState()
    const playFunction = () => {
        if(src.src){
           setIsPlaying((prevMod) => !prevMod) 
        }
    }

    return(
        <>
        <div className="text-container">
        <TextForIcon showText={showText} text={!playing ? "Play" : "Pause"}/>
        <button onMouseEnter={() => SetShowText("show-text")} onMouseLeave={() => SetShowText("")} className="button-style" onClick={playFunction}>{playing && src.src ? <i className="fa-solid fa-pause"></i> : <i className="fa-solid fa-play"></i>}</button>
        </div>
        </>
    )
}

export default Playing;