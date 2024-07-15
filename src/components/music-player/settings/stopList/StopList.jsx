import { useContext } from "react";
import { newestList } from "../../functions/NewestList";
import { showCurrentPlaylist } from "../../functions/ShowCurrentPlaylist";
import CurrentList from "../../MusicContext/CurrentList";
import DisplayTable from "../../MusicContext/DisplayTable";
import IconButton from "../../functions/IconButton";

const StopList = ({src, setSrc}) => {
    const { currentList, setCurrentList } = useContext(CurrentList);
    const { displayTable, setDisplayTable } = useContext(DisplayTable);
    const stopFunction = () => {
        setSrc({ name: "", src: [] });
        showCurrentPlaylist(setCurrentList);
        newestList(setDisplayTable)
    }

    return(
        <>
        <div className="text-container">
        <IconButton
        icon={"fa-solid fa-stop"}
        onClick={stopFunction}
        disabled={src.src && src.src.length > 0 ? false : true}
        text={"Stop"}
      />
        </div>
        </>
    )
}

export default StopList;