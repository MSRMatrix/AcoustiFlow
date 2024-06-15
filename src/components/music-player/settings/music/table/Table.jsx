import { useContext, useEffect, useState } from "react";
import "./table.css";
import { ChangePlaylist, EditName, PlaylistChanger } from "../../dialog/Dialog";
import { newestList } from "../../../functions/NewestList";
import DisplayTable from "../../../MusicContext/DisplayTable";
import PlaylistContext from "../../../MusicContext/PlaylistContext";
import ShowInput from "../../../MusicContext/ShowInput";
import CurrentSongIndex from "../../../MusicContext/CurrentSongIndex";
import { showCurrentPlaylist } from "../../../functions/ShowCurrentPlaylist";
import CurrentList from "../../../MusicContext/CurrentList";
import TakeMusic from "../../../MusicContext/TakeMusic";

const Table = ({ src, setSrc }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openEditWindow, setOpenEditWindow] = useState(false);
  const [openChangePlaylistName, setOpenChangePlaylistName] = useState(false);
  const { takeMusic, setTakeMusic } = useContext(TakeMusic);
  const { displayTable, setDisplayTable } = useContext(DisplayTable);

  const { playlistContext, setPlaylistContext } = useContext(PlaylistContext);
  const { showInput, setShowInput } = useContext(ShowInput);
  const { currentSongIndex, setCurrentSongIndex } =
    useContext(CurrentSongIndex);
  const { currentList, setCurrentList } = useContext(CurrentList);

  const updateAllLists = (playlist) => {
    newestList(setDisplayTable, playlist);
    showCurrentPlaylist(setCurrentList, playlist);
  };

  const handleDelete = (item, playlist) => {
    setShowInput(false);
    const storedData = localStorage.getItem(playlist);
    if (storedData) {
      const parsedData = storedData.split(", ");
      const updatedData = [];
      for (let i = 0; i < parsedData.length; i += 2) {
        if (parsedData.length <= 2) {
          localStorage.setItem(playlist, "");
          updateAllLists(playMusic);
          return;
        }
        if (parsedData[i] !== item.name || parsedData[i + 1] !== item.src) {
          updatedData.push(parsedData[i], parsedData[i + 1]);
        }
      }
      localStorage.setItem(playlist, updatedData.join(", "));
      updateAllLists(playMusic);
    }
    if (playlist === src.playlist) {
      updateSrc();
    }
  };

  const listFunction = async (list) => {
    setShowInput(false);
    setSrc([]);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSrc({
      playlist: list.playlist,
      name: list.songs.map((item) => item.name.split(",")),
      src: list.songs.map((item) => item.src),
    });
    updateAllLists(list.playlist);
  };

  const deletePlaylist = (playlist) => {
    setShowInput(false);
    if (confirm(`Möchten Sie die Playlist "${playlist}" löschen?`)) {
      localStorage.removeItem(playlist);
      if (playlist === src.playlist) {
        updateAllLists(playlist);
        setSrc([]);
      }
      alert(`Die Playlist "${playlist}" wurde erfolgreich gelöscht.`);
      updateAllLists(src.playlist);
    } else {
      alert(`Die Löschung der Playlist "${playlist}" wurde abgebrochen.`);
    }
  };

  const randomSequence = async (list) => {
    setSrc([]);
    setShowInput(false);
    const arrayList = list.songs.map((item) => ({
      name: item.name,
      src: item.src,
    }));

    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    const shuffledArray = shuffleArray(arrayList);
    const name = shuffledArray.map((item) => item.name.split(","));
    const srcUrls = shuffledArray.map((item) => item.src);
    setCurrentSongIndex(0);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSrc({
      playlist: list.playlist,
      name: name,
      src: srcUrls,
    });
    updateAllLists(list.playlist);
  };

  const playMusic = async (music, list) => {
    setSrc([]);
    setShowInput(false);
    if (list) {
      const playlistName = list.playlist;
      const songs = list.songs;
      const musicIndex = songs.findIndex((item) => item.name === music.name);
      if (musicIndex === -1) {
        console.error("Selected music not found in the list");
        return;
      }
      const arrayList = songs
        .slice(musicIndex)
        .concat(songs.slice(0, musicIndex));
      const updatedList = {
        playlist: playlistName,
        songs: arrayList,
      };
      setCurrentSongIndex(0);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSrc({
        playlist: list.playlist,
        name: updatedList.songs.map((item) => item.name),
        src: updatedList.songs.map((item) => item.src),
      });

      updateAllLists(list.playlist);
    }
  };

  const updateSrc = () => {
    setShowInput(false);
    const list = localStorage.getItem(src.playlist).split(", ");
    const names = [];
    const url = [];
    for (let i = 0; i < list.length; i += 2) {
      names.push(list[i]);
      url.push(list[i + 1]);
    }
    setSrc({
      playlist: src.playlist,
      name: names,
      src: url,
    });
    updateAllLists(src.playlist);
  };

  useEffect(() => {
    updateAllLists();
  }, []);

  return (
    <>
      {currentList.length > 0 ? (
        currentList.map((item) => (
          <div key={item.playlist} className="current-list">
            <h2>Current Playlist: {item.playlist}</h2>
            <button
              onClick={() => {
                setOpenChangePlaylistName(true), setTakeMusic(item.playlist);
              }}
            >
              Change Name
            </button>
            <button onClick={() => deletePlaylist(item.playlist)}>
              Delete List
            </button>
            <button onClick={() => listFunction(item)}>
              Play
            </button>
            <button onClick={() => randomSequence(item)}>
            <i className="fa-solid fa-shuffle"></i>
            </button>
            <table>
              <thead>
                <tr>
                  <th>Song</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {item.songs.map((innerItem, key) =>
                  innerItem.name.length > 0 ? (
                    <tr
                      key={innerItem.src}
                      style={{
                        background:
                          (src &&
                            src.name &&
                            src.name[currentSongIndex] === innerItem.name &&
                            src.src &&
                            src.src[currentSongIndex] === innerItem.src) ||
                          (src &&
                            src.name &&
                            Array.isArray(src.name[currentSongIndex]) &&
                            src.name[currentSongIndex].join(", ") ===
                              innerItem.name &&
                            src.src &&
                            src.src[currentSongIndex] === innerItem.src)
                            ? "red"
                            : "",
                      }}
                    >
                      <td onClick={() => playMusic(innerItem, item)}>
                        {innerItem.name}
                      </td>
                      <td>
                        <button
                          onClick={() => handleDelete(innerItem, item.playlist)}
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => {
                            setTakeMusic(innerItem);
                            setPlaylistContext(item.playlist);
                            setIsOpen(true);
                          }}
                        >
                          Verschieben
                        </button>
                        <button
                          onClick={() => {
                            setOpenEditWindow(true);
                            setTakeMusic({
                              playlist: item.playlist,
                              name: innerItem.name,
                              src: innerItem.src,
                            });
                          }}
                        >
                          Rename
                        </button>
                      </td>
                    </tr>
                  ) : (
                    <tr key={key}>Keine Daten eingetragen</tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        ))
      ) : (
        <></>
      )}
      {isOpen && (
        <PlaylistChanger
          setIsOpen={setIsOpen}
          src={src}
          setSrc={setSrc}
          updateSrc={updateSrc}
        />
      )}
      {openEditWindow && (
        <EditName
          setOpenEditWindow={setOpenEditWindow}
          src={src}
          setSrc={setSrc}
          updateSrc={updateSrc}
          takeMusic={takeMusic}
          updateAllLists={updateAllLists}
        />
      )}
      {openChangePlaylistName && (
        <ChangePlaylist
          setOpenChangePlaylistName={setOpenChangePlaylistName}
          updateAllLists={updateAllLists}
        />
      )}

      {displayTable.length > 0 ? (
        displayTable.map((item) => (
          <div key={item.playlist}>
            <h2>{item.playlist}</h2>
            <button
              onClick={() => {
                setOpenChangePlaylistName(true), setTakeMusic(item.playlist);
              }}
            >
              Change Name
            </button>
            <button onClick={() => deletePlaylist(item.playlist)}>
              Delete Playlist
            </button>
            <button onClick={() => listFunction(item)}>
              Play
            </button>
            <button onClick={() => randomSequence(item)}>
              <i className="fa-solid fa-shuffle"></i>
            </button>
            <table>
              <thead>
                <tr>
                  <th>Song</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {item.songs.map((innerItem, key) =>
                  innerItem.name.length > 0 ? (
                    <tr key={innerItem.src}>
                      <td onClick={() => playMusic(innerItem, item)}>
                        {innerItem.name}
                      </td>
                      <td>
                        <button
                          onClick={() => handleDelete(innerItem, item.playlist)}
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => {
                            setTakeMusic(innerItem);
                            setPlaylistContext(item.playlist);
                            setIsOpen(true);
                          }}
                        >
                          Verschieben
                        </button>
                        <button
                          onClick={() => {
                            setOpenEditWindow(true);
                            setTakeMusic({
                              playlist: item.playlist,
                              name: innerItem.name,
                              src: innerItem.src,
                            });
                          }}
                        >
                          Rename
                        </button>
                      </td>
                    </tr>
                  ) : (
                    <tr key={key}>Keine Daten eingetragen</tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        ))
      ) : (
        <p>No Playlist there!</p>
      )}
    </>
  );
};

export default Table;
