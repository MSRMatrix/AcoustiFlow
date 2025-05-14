import { useParams, NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import DisplayTable from "../../../MusicContext/DisplayTable";
import CurrentList from "../../../MusicContext/CurrentList";


const Playlist = () => {
   const { playlist } = useParams(); 
    const { displayTable } = useContext(DisplayTable);
    const { currentList, setCurrentList } = useContext(CurrentList);
    const [test, setTest] = useState([])
    useEffect(() => {
        setTest([])
setTest(displayTable.find((item) => item.playlist === playlist))
// if(Array.isArray(test.songs) && test.songs.length > 0 ){
//    console.log(test.songs.map((item) => <p>{item.name}</p>)); 
// }

    },[])
    
    
    
    
 return (
    <div className="playlist">
      <h2>Aktuelle Playlist: {playlist}</h2>

      {/* Überprüfe, ob test.songs ein Array ist und Daten enthält */}
      {Array.isArray(test.songs) && test.songs.length > 0 ? (
        test.songs.map((item, index) => (
          <NavLink key={index} className="back-link" to={`/song/${item.name}`}>
            {item.name}
          </NavLink>
        ))
      ) : (
        <p>Keine Songs in dieser Playlist</p>  
      )}
      <NavLink className="back-link" to="/lists">
        Zurück
      </NavLink>
    </div>
  );
};

export default Playlist;
