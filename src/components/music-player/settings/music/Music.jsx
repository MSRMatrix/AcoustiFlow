import { useState, useEffect, useContext } from "react";
import Table from "./table/Table";
import { newestList } from "../../functions/NewestList";
import DisplayTable from "../../MusicContext/DisplayTable";
import Storage from "../../MusicContext/Storage";
import { displayStorage } from "../../functions/DisplayStorage";
import { isMobile } from "react-device-detect";

const Music = ({ src, setSrc, setCurrentSongIndex }) => {
  const { displayTable, setDisplayTable } = useContext(DisplayTable);
  const { storage, setStorage } = useContext(Storage);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const newSrc = {
      src: e.target.elements.src.value,
    };
    setSrc(newSrc);
  
    let title = "YouTube video player";
  
    // Function to handle setting the title once the iframe is loaded
    const handleIframeLoad = () => {
      title = document.querySelector("iframe").title.split(",").join("");
      const newTitle = {
        name: title,
        src: newSrc.src,
      };
      setSrc(newTitle);
      e.target.reset();
    };
  
    // Add event listener to the iframe to handle its load event
    const iframe = document.querySelector("iframe");
    if (iframe) {
      iframe.onload = handleIframeLoad;
    }
  
    // If on a mobile device, wait for additional time before setting the title
    if (isMobile) {
      setTimeout(() => {
        if (title === "YouTube video player") {
          handleIframeLoad();
        }
      }, 3000);
    } else {
      // For non-mobile devices, use the handleIframeLoad function directly
      handleIframeLoad();
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
