import { useContext, useState } from "react";
import TextForIcon from "../../functions/TextForIcon";
import { newestList } from "../../functions/NewestList";
import { showCurrentPlaylist } from "../../functions/ShowCurrentPlaylist";
import CurrentList from "../../MusicContext/CurrentList";

const StopList = ({src, setSrc}) => {
    const { currentList, setCurrentList } = useContext(CurrentList);
    const [showText, SetShowText] = useState()
    const stopFunction = () => {
        setSrc({ name: "", src: [] });
        showCurrentPlaylist(setCurrentList);
    }

    return(
        <>
        <div className="text-container">
        <TextForIcon showText={showText} text={"Stop"}/>
        <button onMouseEnter={() => SetShowText("show-text")} onMouseLeave={() => SetShowText("")}className="button-style" onClick={stopFunction}><i className="fa-solid fa-stop"></i></button>
        </div>
        </>
    )
}

export default StopList;