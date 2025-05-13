import { NavLink } from "react-router-dom";
import { useContext } from "react";
import CurrentList from "../../MusicContext/CurrentList";
import DisplayTable from "../../MusicContext/DisplayTable";
import "./lists.css"

const Lists = () => {
    const { displayTable } = useContext(DisplayTable);
    console.log(displayTable);
    
    return(
        <div className="lists">
            <h2>Playlists</h2>
            {displayTable.map((item, key) => <NavLink key={key} to={item.playlist}>{item.playlist}</NavLink>
            )}
        <NavLink className="back-link" to="/">
        Zurück
      </NavLink>
        </div>
    )
}

export default Lists;