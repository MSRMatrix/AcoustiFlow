import { useContext, useEffect, useState } from "react";
import { ChangePlaylist, EditName, PlaylistChanger } from "../../dialog/Dialog";
import { newestList } from "../../../functions/NewestList";
import DisplayTable from "../../../MusicContext/DisplayTable";
import ShowInput from "../../../MusicContext/ShowInput";
import CurrentSongIndex from "../../../MusicContext/CurrentSongIndex";
import { showCurrentPlaylist } from "../../../functions/ShowCurrentPlaylist";
import CurrentList from "../../../MusicContext/CurrentList";
import TakeMusic from "../../../MusicContext/TakeMusic";
import "./table.css";

// Drag and Drop Import
import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import NotUsedTables from "./notUsedTables/NotUsedTables";
import UsedTable from "./usedTable/UsedTable";
// Drag and Drop Import

const Table = ({ src, setSrc }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openEditWindow, setOpenEditWindow] = useState(false);
  const [openChangePlaylistName, setOpenChangePlaylistName] = useState(false);
  const { takeMusic, setTakeMusic } = useContext(TakeMusic);
  const { displayTable, setDisplayTable } = useContext(DisplayTable);

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
          updateAllLists(src.playlist);
          return;
        }
        if (parsedData[i] !== item.name || parsedData[i + 1] !== item.src) {
          updatedData.push(parsedData[i], parsedData[i + 1]);
        }
      }
      localStorage.setItem(playlist, updatedData.join(", "));
      updateAllLists(src.playlist);
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

  const changeIndex = (playlist, name, src) => {
    const storedData = localStorage.getItem(playlist).split(", ");
    const indexFromSongName = storedData.indexOf(name);
    const indexFromSong = storedData.indexOf(src);

    if (indexFromSongName !== -1 && indexFromSong !== -1) {
      const startIndex = Math.min(indexFromSong, indexFromSongName);
      const endIndex = Math.max(indexFromSong, indexFromSongName) + 1;

      storedData.splice(startIndex, endIndex - startIndex);

      console.log(storedData);

      const playingList = currentList[0]?.playlist;
      if (playlist === playingList) {
        newestList(setDisplayTable, playingList);
        return showCurrentPlaylist(setCurrentList, playingList);
      }
      newestList(setDisplayTable, playingList);
      showCurrentPlaylist(setCurrentList, playingList);
    } else {
      console.error(`Song ${name} or ${src} not found in playlist ${playlist}`);
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    console.log(event);
    const { active, over } = event;

    if (active.id === over.id) return;
    
    
    setDisplayTable((items) => {
      const oldIndex = items.findIndex((item) => item.src === active.id);
      const newIndex = items.findIndex((item) => item.src === over.id);
      return arrayMove(items, oldIndex, newIndex);
    });
  };

  useEffect(() => {
    updateAllLists(src.playlist);
  }, []);

  return (
    <>
      <div className="list-in-use">
        <UsedTable
          setOpenChangePlaylistName={setOpenChangePlaylistName}
          setTakeMusic={setTakeMusic}
          deletePlaylist={deletePlaylist}
          listFunction={listFunction}
          randomSequence={randomSequence}
          src={src}
          currentSongIndex={currentSongIndex}
          playMusic={playMusic}
          handleDelete={handleDelete}
          setIsOpen={setIsOpen}
          setOpenEditWindow={setOpenEditWindow}
        />
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
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >
        <NotUsedTables
          setOpenChangePlaylistName={setOpenChangePlaylistName}
          setTakeMusic={setTakeMusic}
          deletePlaylist={deletePlaylist}
          listFunction={listFunction}
          randomSequence={randomSequence}
          playMusic={playMusic}
          handleDelete={handleDelete}
          setIsOpen={setIsOpen}
          setOpenEditWindow={setOpenEditWindow}
          changeIndex={changeIndex}
        />
      </DndContext>
    </>
  );
};

export default Table;
