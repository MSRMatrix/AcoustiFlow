import { useContext, useEffect } from "react";
import "./dialog.css";
import { newestList } from "../../functions/NewestList";
import DisplayTable from "../../MusicContext/DisplayTable";
import PlaylistContext from "../../MusicContext/PlaylistContext";
import ShowInput from "../../MusicContext/ShowInput";
import TakeMusic from "../../MusicContext/TakeMusic";
import { showCurrentPlaylist } from "../../functions/ShowCurrentPlaylist";
import CurrentList from "../../MusicContext/CurrentList";

const PlaylistChanger = ({ setIsOpen, src, setSrc, updateSrc}) => {
  const {displayTable, setDisplayTable} = useContext(DisplayTable)
  const {playlistContext, setPlaylistContext} = useContext(PlaylistContext)
  const {showInput, setShowInput} = useContext(ShowInput)
  const newStorage = Object.entries(localStorage);
  const {takeMusic, setTakeMusic} = useContext(TakeMusic);
  const { currentList, setCurrentList } = useContext(CurrentList);
  let allLists;
  const currentPlaylist = currentList[0]?.playlist

 if (newStorage) {
    const newList = newStorage.map((item) => item[0]);
    if(!playlistContext){
      allLists = newList;
    }
    else{
      allLists = newList.filter((item) => item !== playlistContext);
    }
  }

  const addToNewPlaylist = (playlist) => {
    const random = Object.values(takeMusic);
   const list = Object.entries(localStorage).filter((item) => item[0] === playlist);
    
   if(list[0][1].split(", ").includes(random[1])){
    alert("Lied existiert schon in dieser Playlist")
    return
   }
   
    if(list[0][1].split(", ").length >= 2){
       const newData =
      localStorage.getItem(playlist) +
      ", " +
      random[0].trim() +
      ", " +
      random[1].trim();

     localStorage.setItem(playlist, newData); 
     newestList(setDisplayTable, currentPlaylist)
    showCurrentPlaylist(setCurrentList, currentPlaylist);
     if(src.playlist === playlist){
      return updateSrc()
     }
     return
    }
    const newData =
      localStorage.getItem(playlist) +
      random[0].trim() +
      ", " +
      random[1].trim();

      localStorage.setItem(playlist, newData); 
    newestList(setDisplayTable, currentPlaylist)
    showCurrentPlaylist(setCurrentList, currentPlaylist);
    if(src.playlist === playlist){
      return updateSrc()
     }
     return
  };

  useEffect(() =>{
    newestList(setDisplayTable, currentPlaylist)
    showCurrentPlaylist(setCurrentList, currentPlaylist)
    setShowInput(false);
  },[])
  return (
    <dialog open>
      <div className="playlist-changer">
        Zur welchen Playlist soll dein Lied hinzugefügt werden?
        {allLists && allLists.map((item, key) => (
          <button onClick={() => addToNewPlaylist(item)} key={key}>
            {item}
          </button>
        ))}
        <button onClick={() => {setIsOpen(false), newestList(setDisplayTable, currentPlaylist)
    showCurrentPlaylist(setCurrentList, currentPlaylist);}}>Close</button>
      </div>
    </dialog>
  );
};

export { PlaylistChanger };
