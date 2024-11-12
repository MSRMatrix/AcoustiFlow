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
import "./music.css";

const Music = ({ src, setSrc, loop, setLoop }) => {
  const { displayTable, setDisplayTable } = useContext(DisplayTable);
  const { showInput, setShowInput } = useContext(ShowInput);
  const { takeMusic, setTakeMusic } = useContext(TakeMusic);
  const { currentList, setCurrentList } = useContext(CurrentList);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSrc([]);
    setCurrentList([]);

    setTimeout(() => {
      const newSrc = {
        src: e.target.elements.src.value,
      };
      setSrc(newSrc);
      titleFixer(newSrc);
      e.target.reset();
      setShowInput(true);
    }, 100);
  };

  const titleFixer = (newSrc) => {
    setTimeout(() => {
      if (!document.querySelector("iframe")?.title.split(",").join("")) {
        setShowInput(false);
        setSrc({
          name: "Unknown",
          src: newSrc.src,
        });
        return;
      }
      const title = document.querySelector("iframe").title.split(",").join("");

      if (title === "YouTube video player") {
        setTimeout(() => {
          const newTitle = document
            .querySelector("iframe")
            .title.split(",")
            .join("");
          const music = {
            name: newTitle,
            src: newSrc.src,
          };
          setSrc(music);
          newestList(setDisplayTable);
          showCurrentPlaylist(setCurrentList);
          return;
        }, 1000);
      } else {
        const newTitle = {
          name: title,
          src: newSrc.src,
        };
        setSrc(newTitle);
      }
      newestList(setDisplayTable);
      showCurrentPlaylist(setCurrentList);
    }, 1000);
  };

  const handleSaveMusic = () => {
    const newData = {
      name: src.name,
      src: src.src,
    };

    if (!src.name || !src.src) {
      alert("Diese Felder dürfen nicht leer sein!");
      return;
    }
    setTakeMusic(newData);
    newestList(setDisplayTable);
    setShowInput(false);
    setSrc({ name: "", src: [] });
  };

  const handleDeleteMusic = () => {
    setSrc({ name: "", src: [] });
    setShowInput(false);
    newestList(setDisplayTable);
    showCurrentPlaylist(setCurrentList);
    console.log(`Song was removed!`);
  };

  const handleNewPlaylist = (e) => {
    e.preventDefault();
    setShowInput(false);
    const newList = e.target.elements[0].value.trim();

    if (newList.length <= 0) {
      e.target.reset();
      return alert("Playlist should have a name!");
    }

    const list = Object.entries(localStorage).map((item) => item[0]);
    const checkIfThere = list.filter((item) => item === newList);

    if (newList.includes("-")) {
      alert("Playlist names cannot contain dashes (-).");
      e.target.reset();
      return;
    }

    if (checkIfThere.length >= 1) {
      alert("List already exists");
      e.target.reset();
      return;
    }
    if (newList) {
      localStorage.setItem(newList, "");
    }
    e.target.reset();
    if (currentList.length >= 1) {
      newestList(setDisplayTable, currentList[0].playlist);
      showCurrentPlaylist(setCurrentList, currentList[0].playlist);
    } else {
      newestList(setDisplayTable);
    }

    alert("New playlist created!");
  };

  useEffect(() => {
    newestList(setDisplayTable, src.playlist);
    showCurrentPlaylist(setCurrentList, src.playlist);
  }, []);
  

  return (
    <div className="music-component-div">
      {" "}
      {isOpen && (
        <PlaylistChanger setIsOpen={setIsOpen} src={src} setSrc={setSrc} />
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          name="src"
          required
          placeholder="Add new song"
          min={5}
        />
        <button type="submit">Play</button>
      </form>
      {showInput && (
        <div>
          <p>Do you want to save this song?</p>
          <div className="add-new-song">
            <input
              style={{
                boxShadow:
                  src.name && src.name.length > 60
                    ? "0px 0px 10px 10px red"
                    : "",
                transition: "0.5s ease-in-out",
              }}
              type="text"
              value={src.name}
              onChange={(e) => setSrc({ ...src, name: e.target.value })}
            />
            <div>
              <button
                onClick={() => {
                  if (src.name.length > 60) {
                    return alert(`Name should be shorter or equal to 60!`);
                  }
                  handleSaveMusic(), setIsOpen(true);
                }}
              >
                Yes
              </button>
              <button onClick={handleDeleteMusic}>No</button>
            </div>
          </div>

          <div>
            {src.name && src.name.length > 60 ? (
              <p style={{ color: "red" }}>
                Name shoud be shorter or equal to 60!
              </p>
            ) : (
              ""
            )}
            <p>{src.name && src.name.length}</p>
          </div>
        </div>
      )}
      <Table src={src} setSrc={setSrc} />
      <form onSubmit={handleNewPlaylist}>
        <input required type="text" placeholder="New Playlist" />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default Music;
