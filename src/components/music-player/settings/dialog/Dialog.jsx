import { useContext, useEffect } from "react";
import "./dialog.css";
import { newestList } from "../../functions/NewestList";
import DisplayTable from "../../MusicContext/DisplayTable";
import PlaylistContext from "../../MusicContext/PlaylistContext";
import ShowInput from "../../MusicContext/ShowInput";
import TakeMusic from "../../MusicContext/TakeMusic";
import { showCurrentPlaylist } from "../../functions/ShowCurrentPlaylist";
import CurrentList from "../../MusicContext/CurrentList";

const PlaylistChanger = ({ setIsOpen, src, setSrc, updateSrc }) => {
  const { displayTable, setDisplayTable } = useContext(DisplayTable);
  const { playlistContext, setPlaylistContext } = useContext(PlaylistContext);
  const { showInput, setShowInput } = useContext(ShowInput);
  const newStorage = Object.entries(localStorage);
  const { takeMusic, setTakeMusic } = useContext(TakeMusic);
  const { currentList, setCurrentList } = useContext(CurrentList);
  let allLists;
  const currentPlaylist = currentList[0]?.playlist;

  if (newStorage) {
    const newList = newStorage.map((item) => item[0]);
    if (!playlistContext) {
      allLists = newList;
    } else {
      allLists = newList.filter((item) => item !== playlistContext);
    }
  }

  const addToNewPlaylist = (playlist) => {
    const random = Object.values(takeMusic);
    const list = Object.entries(localStorage).filter(
      (item) => item[0] === playlist
    );

    if (list[0][1].split(", ").includes(random[1])) {
      alert("Lied existiert schon in dieser Playlist");
      return;
    }

    if (list[0][1].split(", ").length >= 2) {
      const newData =
        localStorage.getItem(playlist) +
        ", " +
        random[0].trim() +
        ", " +
        random[1].trim();

      localStorage.setItem(playlist, newData);
      newestList(setDisplayTable, currentPlaylist);
      showCurrentPlaylist(setCurrentList, currentPlaylist);
      if (src.playlist === playlist) {
        return updateSrc();
      }
      return;
    }
    const newData =
      localStorage.getItem(playlist) +
      random[0].trim() +
      ", " +
      random[1].trim();

    localStorage.setItem(playlist, newData);
    newestList(setDisplayTable, currentPlaylist);
    showCurrentPlaylist(setCurrentList, currentPlaylist);
    if (src.playlist === playlist) {
      return updateSrc();
    }
    return;
  };

  useEffect(() => {
    newestList(setDisplayTable, currentPlaylist);
    showCurrentPlaylist(setCurrentList, currentPlaylist);
    setShowInput(false);
  }, []);
  return (
    <dialog open>
      <div className="playlist-changer">
        Zur welchen Playlist soll "{takeMusic.name}" hinzugefügt werden?
        {allLists &&
          allLists.map((item, key) => (
            <button onClick={() => addToNewPlaylist(item)} key={key}>
              {item}
            </button>
          ))}
        <button
          onClick={() => {
            setIsOpen(false), newestList(setDisplayTable, currentPlaylist);
            showCurrentPlaylist(setCurrentList, currentPlaylist);
          }}
        >
          Close
        </button>
      </div>
    </dialog>
  );
};



const EditName = ({ setOpenEditWindow, takeMusic, updateSrc, updateAllLists, src }) => {
  const { displayTable, setDisplayTable } = useContext(DisplayTable);
  const { currentList, setCurrentList } = useContext(CurrentList);
  const currentPlaylist = currentList[0]?.playlist;
  const oldMusic = takeMusic;

  const changeMusic = (e) => {
    e.preventDefault();
    const formObject = new FormData(e.target);
    const formData = {};
    formObject.forEach((value, key) => {
      formData[key] = value;
    });

    const playlist = oldMusic.playlist;
    const item = formData;
    delete item.playlist;

    const storedData = localStorage.getItem(playlist);
    
    if(!item.name || !item.url){
      return alert("inputs are empty")
    }

    if(storedData.includes(item.url)){
      return alert("Music already exists!")
    }

    if (storedData) {
      const parsedData = storedData.split(", ");
      
      const nameIndex = parsedData.indexOf(oldMusic.name);
      const srcIndex = parsedData.indexOf(oldMusic.src);

      if (nameIndex !== -1 && srcIndex !== -1 && nameIndex + 1 === srcIndex) {
        parsedData.splice(nameIndex, 2, item.name, item.url);
      } else {
        console.log("Alte Musikdaten wurden nicht wie erwartet gefunden.");
      }

      localStorage.setItem(playlist, parsedData.join(", "));
      updateAllLists();
      newestList(setDisplayTable, currentPlaylist);
    showCurrentPlaylist(setCurrentList, currentPlaylist);
      if (playlist === src.playlist) {
        updateSrc();
      }
      setOpenEditWindow(false)
    }
  };

  useEffect(() => {
    newestList(setDisplayTable, currentPlaylist);
    showCurrentPlaylist(setCurrentList, currentPlaylist);
  }, []);

  return (
    <dialog open>
      <form action="" onSubmit={changeMusic}>
        <legend>Name</legend>
        <input defaultValue={takeMusic.name} name="name" type="text" required/>
        <legend>Url</legend>
        <input defaultValue={takeMusic.src} name="url" type="url" required/>
        <button onSubmit={changeMusic} type="submit">
          Change
        </button>
      </form>

      <button onClick={() => setOpenEditWindow(false)}>close</button>
    </dialog>
  );
};

const ChangePlaylist = ({setOpenChangePlaylistName, updateAllLists}) => {
  const { currentList, setCurrentList } = useContext(CurrentList);
  const { takeMusic, setTakeMusic } = useContext(TakeMusic);
  const { displayTable, setDisplayTable } = useContext(DisplayTable);
  const currentPlaylist = currentList[0]?.playlist;
  const renamePlaylist = (e) => {
    e.preventDefault()

    const oldList = localStorage.getItem(takeMusic);
  
    const formObject = new FormData(e.target);
    const formData = {};
    formObject.forEach((value, key) => {
      formData[key] = value;
    });
    const newName = formData.playlist
    if(localStorage.getItem(newName)){
       return alert(`${newName} already exists!`)
     }
    
     if (oldList === null) {
       console.error(`Playlist "${takeMusic}" does not exist.`);
       return;
     }
  
     localStorage.setItem(newName, oldList);
     localStorage.removeItem(takeMusic);
     console.log(currentPlaylist);
     console.log(takeMusic);
     
     alert("Playlist was renamed!")
     if(takeMusic === currentPlaylist){
       updateAllLists(newName);
     }
     else{
      newestList(setDisplayTable, currentPlaylist);
    showCurrentPlaylist(setCurrentList, currentPlaylist);
     }
     setOpenChangePlaylistName(false)
     
  }


  return(
  <dialog open>
  <form action="" onSubmit={renamePlaylist}>
        <legend>New Playlistname</legend>
        <input defaultValue={takeMusic} name="playlist" type="text" required/>
        <button onSubmit type="submit">
          Change
        </button>
      </form>

      <button onClick={() => setOpenChangePlaylistName(false)}>close</button>
  </dialog>
)
}

export { PlaylistChanger, EditName, ChangePlaylist };
