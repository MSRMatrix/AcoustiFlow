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
  AutoScrollActivator,
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import NotUsedTables from "./notUsedTables/NotUsedTables";
import UsedTable from "./usedTable/UsedTable";
import PlayingSong from "../../../playingSong/PlayingSong";
// Drag and Drop Import

const Table = ({
  src,
  setSrc,
  fakeRouter,
  setFakeRouter,
  oldIndex,
  playbackRate,
  muted,
  time,
  setTime,
  duration,
  playerRef,
}) => {
  const [openDialog, setOpenDialog] = useState(
    { newPlaylist: false },
    { changeMusic: false },
    { newMusic: false }
  );
  const { takeMusic, setTakeMusic } = useContext(TakeMusic);
  const { displayTable, setDisplayTable } = useContext(DisplayTable);

  const { showInput, setShowInput } = useContext(ShowInput);
  const { currentSongIndex, setCurrentSongIndex } =
    useContext(CurrentSongIndex);
  const { currentList, setCurrentList } = useContext(CurrentList);

  const [drag, setDrag] = useState(false);
  const [listForDrop, setListForDrop] = useState(null);
  const [displaySongs, setDisplaySongs] = useState("");
  const [playingSong, setPlayingSong] = useState("");

  const updateAllLists = (playlist) => {
    newestList(setDisplayTable, playlist);
    showCurrentPlaylist(setCurrentList, playlist);
  };

  const handleDelete = (item, playlist) => {
    setShowInput(false);
    console.log(item);

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
      console.log(`Die Playlist "${playlist}" wurde erfolgreich gelöscht.`);
      updateAllLists(src.playlist);
    } else {
      console.log(`Die Löschung der Playlist "${playlist}" wurde abgebrochen.`);
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

  // Drag and Drop

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) {
      return;
    }

    const playlistToUpdate = listForDrop;

    const oldIndex = displayTable.findIndex(
      (item) => item.playlist === playlistToUpdate
    );

    const oldSongIndex = displayTable[oldIndex].songs.findIndex(
      (song) => song.src === active.id.split("-").slice(1).join("-")
    );

    const newIndex = displayTable.findIndex(
      (item) => item.playlist === playlistToUpdate
    );
    const newSongIndex = displayTable[newIndex].songs.findIndex(
      (song) => song.src === over.id.split("-").slice(1).join("-")
    );

    if (
      oldIndex !== -1 &&
      newIndex !== -1 &&
      oldSongIndex !== -1 &&
      newSongIndex !== -1
    ) {
      setDisplayTable((items) => {
        const updatedItems = [...items];
        updatedItems[oldIndex].songs = arrayMove(
          updatedItems[oldIndex].songs,
          oldSongIndex,
          newSongIndex
        );
        return updatedItems;
      });
    }
    const updatedList = displayTable
      .filter((list) => list.playlist === playlistToUpdate)[0]
      .songs.map((item) => `${item.name}, ${item.src}`)
      .join(", ");
    localStorage.setItem(playlistToUpdate, updatedList);
    setDrag(false);
  };

  // Drag and Drop

  useEffect(() => {
    updateAllLists(src.playlist);
  }, []);

  function returnFunction() {
    if (playingSong) {
      return setPlayingSong("");
    }
    if (displaySongs) {
      return setDisplaySongs("");
    }
    if (fakeRouter) {
      return setFakeRouter("");
    }
  }

  return (
    <div style={{ display: fakeRouter === "Lists" ? "block" : "none" }}>
      <div
        style={{
          display: fakeRouter === "Lists" && displaySongs && playingSong ? "block" : "none",
        }}
      >
        <PlayingSong
          src={src}
          oldIndex={oldIndex}
          playbackRate={playbackRate}
          muted={muted}
          time={time}
          setTime={setTime}
          duration={duration}
          playerRef={playerRef}
        />
      </div>

      {currentList && currentList.length > 0 ? (
        <UsedTable
          setOpenDialog={setOpenDialog}
          setTakeMusic={setTakeMusic}
          deletePlaylist={deletePlaylist}
          listFunction={listFunction}
          randomSequence={randomSequence}
          src={src}
          currentSongIndex={currentSongIndex}
          playMusic={playMusic}
          handleDelete={handleDelete}
          displaySongs={displaySongs}
          setDisplaySongs={setDisplaySongs}
          playingSong={playingSong}
          setPlayingSong={setPlayingSong}
        />
      ) : (
        <></>
      )}

      {openDialog.newMusic && (
        <PlaylistChanger
          setOpenDialog={setOpenDialog}
          src={src}
          setSrc={setSrc}
          updateSrc={updateSrc}
        />
      )}
      {openDialog.changeMusic && (
        <EditName
          setOpenDialog={setOpenDialog}
          src={src}
          setSrc={setSrc}
          updateSrc={updateSrc}
          takeMusic={takeMusic}
          updateAllLists={updateAllLists}
        />
      )}
      {openDialog.newPlaylist && (
        <ChangePlaylist
          setOpenDialog={setOpenDialog}
          updateAllLists={updateAllLists}
        />
      )}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >
        <div style={{ display: fakeRouter === "Lists" ? "block" : "none" }}>
          <NotUsedTables
            setDrag={setDrag}
            setOpenDialog={setOpenDialog}
            setTakeMusic={setTakeMusic}
            deletePlaylist={deletePlaylist}
            listFunction={listFunction}
            randomSequence={randomSequence}
            playMusic={playMusic}
            handleDelete={handleDelete}
            setListForDrop={setListForDrop}
            drag={drag}
            displaySongs={displaySongs}
            setDisplaySongs={setDisplaySongs}
            fakeRouter={fakeRouter}
            setFakeRouter={setFakeRouter}
            playingSong={playingSong}
            setPlayingSong={setPlayingSong}
          />
        </div>
        <div
          className="back-link"
          onClick={() => {
            returnFunction();
          }}
          style={{ display: fakeRouter ? "block" : "none" }}
        >
          Back
        </div>
      </DndContext>
    </div>
  );
};

export default Table;
