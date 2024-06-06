import { useState, useEffect, useContext } from "react";
import Table from "./table/Table";
import { newestList } from "../../functions/NewestList";
import DisplayTable from "../../MusicContext/DisplayTable";
import Storage from "../../MusicContext/Storage";
import { displayStorage } from "../../functions/DisplayStorage";

const Music = ({ src, setSrc, setCurrentSongIndex }) => {
  const { displayTable, setDisplayTable } = useContext(DisplayTable);
  const { storage, setStorage } = useContext(Storage);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newSrc = {
      src: e.target.elements.src.value,
    };
    setSrc(newSrc);
    
    const iframe = document.querySelector("iframe");
    const isMobile = /Mobi|Android|iPhone|iPod|iPad|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile) {
        // Timeout für mobile Geräte
        setTimeout(() => {
            const title = iframe.title.split(",").join("");
            if (title !== "YouTube video player") {
                const newTitle = {
                    name: title,
                    src: newSrc.src,
                };
                setSrc(newTitle);
                e.target.reset();
            }
        }, 1000);
    } else {
        // Wenn es sich nicht um ein mobiles Gerät handelt, wird auf den onload-Event gewartet
        iframe.onload = () => {
            const title = iframe.title.split(",").join("");
            if (title !== "YouTube video player") {
                const newTitle = {
                    name: title,
                    src: newSrc.src,
                };
                setSrc(newTitle);
                e.target.reset();
            }
        };
    }
};

  const handleSaveMusic = () => {
    const storage = localStorage.getItem("your-music");
    const newData = `${src.name}, ${src.src}`;
    if (!src.name || !src.src) {
      alert("Diese Felder dürfen nicht leer sein!");
      return;
    }
    if (storage) {
      const existingData = storage.split(", ").map((item) => item.trim());
      if (existingData.includes(src.src)) {
        alert("Dieses Lied existiert schon!");
        setSrc([]);
        return;
      }
      const updatedData = `${storage}, ${newData.trim()}`;
      localStorage.setItem("your-music", updatedData);
    } else {
      localStorage.setItem("your-music", newData);
    }
    displayStorage(setStorage);
    setSrc([]);
  };

  const handleDeleteMusic = () => {
    setSrc([]);
    console.log(`Dieses Lied wurde entfernt!`);
  };

  const handleNewPlaylist = (e) => {
    e.preventDefault();
    const newList = e.target.elements[0].value.trim();
    const list = Object.entries(localStorage).map((item) => item[0])
    const checkIfThere = list.filter((item) => item === newList);

    if(checkIfThere.length >= 1){
      alert("List already exists")
      e.target.reset();
      return
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
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          name="src"
          required
          placeholder="Link zu deinem Lieblingssong"
        />
        <button type="submit">Abspielen</button>
      </form>

      {src.src && (
  <div>
    <p>Möchten Sie dieses Lied speichern?</p>
    <button onClick={handleSaveMusic}>Ja</button>
    
    <button onClick={handleDeleteMusic}>Nein</button>
    <input
      type="text"
      value={src.name}
      onChange={(e) => setSrc({ ...src, name: e.target.value })}
    />
  </div>
)}
      <Table setCurrentSongIndex={setCurrentSongIndex} src={src} setSrc={setSrc} />

      <form onSubmit={handleNewPlaylist}>
        <input type="text" placeholder="Neue Playlist erstellen" />
        <button type="submit">Erstellen</button>
      </form>
    </>
  );
};

export default Music;
