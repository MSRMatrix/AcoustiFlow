import { useContext, useEffect } from "react";
import "./dialog.css";
import { newestList } from "../../functions/NewestList";
import DisplayTable from "../../MusicContext/DisplayTable";
import { displayStorage } from "../../functions/DisplayStorage";
import Storage from "../../MusicContext/Storage";
import PlaylistContext from "../../MusicContext/PlaylistContext";

const PlaylistChanger = ({ setIsOpen, src, setSrc, takeMusic, updateSrc }) => {
  const {displayTable, setDisplayTable} = useContext(DisplayTable)
  const { storage, setStorage } = useContext(Storage);
  const {playlistContext, setPlaylistContext} = useContext(PlaylistContext)
  const newStorage = Object.entries(localStorage);
  let allLists;
  let defaultList;

 if (newStorage) {
    const newList = newStorage.map((item) => item[0]);
    allLists = newList.filter((item) => item !== playlistContext);
    defaultList = newList.filter((item) => item === playlistContext);
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
     displayStorage(setStorage);
     newestList(setDisplayTable)
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
    displayStorage(setStorage);  
    newestList(setDisplayTable)
    if(src.playlist === playlist){
      return updateSrc()
     }
     return
  };

  useEffect(() =>{
    newestList(setDisplayTable)
  },[])
console.log(allLists);
    
  return (
    <dialog open>
      <div className="playlist-changer">
        Zur welchen Playlist soll dein Lied hinzugefügt werden?
        {allLists && allLists.map((item, key) => (
          <button onClick={() => addToNewPlaylist(item)} key={key}>
            {item}
          </button>
        ))}
        <button onClick={() => setIsOpen(false)}>Close</button>
      </div>
    </dialog>
  );
};

export { PlaylistChanger };
