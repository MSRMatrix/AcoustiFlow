import { useContext, useState } from "react";
import TextForIcon from "../../functions/TextForIcon";
import { newestList } from "../../functions/NewestList";
import { showCurrentPlaylist } from "../../functions/ShowCurrentPlaylist";
import CurrentList from "../../MusicContext/CurrentList";
import DisplayTable from "../../MusicContext/DisplayTable";

const StopList = ({src, setSrc}) => {
    const { currentList, setCurrentList } = useContext(CurrentList);
    const { displayTable, setDisplayTable } = useContext(DisplayTable);
    const [showText, SetShowText] = useState()
    const stopFunction = () => {
        setSrc({ name: "", src: [] });
        showCurrentPlaylist(setCurrentList);
        newestList(setDisplayTable)
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