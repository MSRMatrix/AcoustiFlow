import { useContext } from "react";
import { newestList } from "../../functions/NewestList";
import { showCurrentPlaylist } from "../../functions/ShowCurrentPlaylist";
import CurrentList from "../../MusicContext/CurrentList";
import DisplayTable from "../../MusicContext/DisplayTable";
import IconButton from "../../functions/IconButton";
import Title from "../../MusicContext/Title";

const StopList = ({src, setSrc}) => {
    const { currentList, setCurrentList } = useContext(CurrentList);
    const { displayTable, setDisplayTable } = useContext(DisplayTable);
    const { title, setTitle } = useContext(Title);

    const stopFunction = () => {
        setSrc({ name: "", src: [] });
        setTitle("")
        showCurrentPlaylist(setCurrentList);
        newestList(setDisplayTable)
    }

    return(
        <div className="text-container" onClick={stopFunction}>
        <IconButton
        icon={"fa-solid fa-stop"}
        
        disabled={src.src && src.src.length > 0 ? false : true}
        text={"Stop"}
      />
        </div>
    )
}

export default StopList;