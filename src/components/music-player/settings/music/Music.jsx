import { useState, useEffect, useContext } from "react";
import Table from "./table/Table";
import { newestList } from "../../functions/NewestList";
import DisplayTable from "../../MusicContext/DisplayTable";
import Storage from "../../MusicContext/Storage";
import { displayStorage } from "../../functions/DisplayStorage";

const Music = ({ src, setSrc }) => {
  const { displayTable, setDisplayTable } = useContext(DisplayTable);
  const { storage, setStorage } = useContext(Storage);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    
    const newSrc = {
      src: e.target.elements.src.value,
    };
    setSrc(newSrc);
    setTimeout(() => { 
        const title = document.querySelector("iframe").title.split(",").join("")
        if(title === "Youtube video player"){
          setTimeout(() => {
            const newTitle = {
              name: title,
              src: newSrc.src,
            };
           return setSrc(newTitle);
          }, 2000);
        }
        const newTitle = {
            name: title,
            src: newSrc.src,
          };
          setSrc(newTitle);
          console.log(src.src);
          
    }, 1000);
    e.target.reset()
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
      <Table src={src} setSrc={setSrc} />

      <form onSubmit={handleNewPlaylist}>
        <input type="text" placeholder="Neue Playlist erstellen" />
        <button type="submit">Erstellen</button>
      </form>
    </>
  );
};

export default Music;
