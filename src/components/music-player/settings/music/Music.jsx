import { useState, useEffect, useContext } from "react";
import Table from "./table/Table";
import { newestList } from "../../functions/NewestList";
import DisplayTable from "../../MusicContext/DisplayTable";
import { isMobile } from "react-device-detect";
import ShowInput from "../../MusicContext/ShowInput";
import TakeMusic from "../../MusicContext/TakeMusic";
import { PlaylistChanger } from "../dialog/Dialog";
import CurrentList from "../../MusicContext/CurrentList";
import { showCurrentPlaylist } from "../../functions/ShowCurrentPlaylist";

const Music = ({ src, setSrc }) => {
  const { displayTable, setDisplayTable } = useContext(DisplayTable);
  const {showInput, setShowInput} = useContext(ShowInput)
  const {takeMusic, setTakeMusic} = useContext(TakeMusic);
  const { currentList, setCurrentList } = useContext(CurrentList);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentList([])
    showCurrentPlaylist(setCurrentList, currentList)
    const newSrc = {
      src: e.target.elements.src.value,
    };
      setSrc(newSrc);
      titleFixer(newSrc)
    e.target.reset();
    setShowInput(true)
  };

  const titleFixer = (newSrc) => {
    setTimeout(() => {
      const title = document.querySelector("iframe").title.split(",").join("");
      if(title === "YouTube video player"){
        setTimeout(() => {
        const newTitle = document.querySelector("iframe").title.split(",").join("");
        const music = {
          name: newTitle,
          src: newSrc.src,
        };
        setSrc(music);
        return  
        }, 1000);
      }
      else{
        const newTitle = {
        name: title,
        src: newSrc.src,
      };
      setSrc(newTitle);
      }
      
    }, 1000);
  }

  const handleSaveMusic = () => {
    
    const storage = localStorage.getItem("your-music");
    const newData = {
      name: src.name, 
      src: src.src
    }
    if (!src.name || !src.src) {
      alert("Diese Felder dürfen nicht leer sein!");
      return;
    }
    if (storage) {
      
      setTakeMusic(newData)
    newestList(setDisplayTable);
    setShowInput(false);
    setSrc([]);
  }
  }
  const handleDeleteMusic = () => {
    setSrc([]);
    setShowInput(false);
    console.log(`Dieses Lied wurde entfernt!`);
  };

  const handleNewPlaylist = (e) => {
    e.preventDefault();
    setShowInput(false);
    const newList = e.target.elements[0].value.trim();
    const list = Object.entries(localStorage).map((item) => item[0]);
    const checkIfThere = list.filter((item) => item === newList);

    if (checkIfThere.length >= 1) {
      alert("List already exists");
      e.target.reset();
      return;
    }
    if (newList) {
      localStorage.setItem(newList, "");
      newestList(setDisplayTable);
    }
    e.target.reset();
    alert("Neue Playlist erstellt!");
  };

  useEffect(() => {
    newestList(setDisplayTable);
  }, []);

  return (
    <> {isOpen && (
        <PlaylistChanger
          setIsOpen={setIsOpen}
          src={src}
          setSrc={setSrc}
        />
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          name="src"
          required
          placeholder="Link zu deinem Lieblingssong"
        />
        <button type="submit">Abspielen</button>
      </form>

      {showInput && (
        <div>
          <p>Möchten Sie dieses Lied speichern?</p>
          <button onClick={() => {handleSaveMusic(), setIsOpen(true)}}>Ja</button>

          <button onClick={handleDeleteMusic}>Nein</button>
          <input
            type="text"
            value={src.name}
            onChange={(e) => setSrc({ ...src, name: e.target.value })}
          />
        </div>
      )}
      <Table
        src={src}
        setSrc={setSrc}
      />
 
      <form onSubmit={handleNewPlaylist}>
        <input type="text" placeholder="Neue Playlist erstellen" />
        <button type="submit">Erstellen</button>
      </form>
    </>
  );
};

export default Music;
