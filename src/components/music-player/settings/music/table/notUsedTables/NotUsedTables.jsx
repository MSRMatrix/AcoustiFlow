import { useContext, useState } from "react";
import IconButton from "../../../../functions/IconButton";
import DisplayTable from "../../../../MusicContext/DisplayTable";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import PlaylistContext from "../../../../MusicContext/PlaylistContext";
import { SortableItem } from "../sortableItem/SortableItem";

const NotUsedTables = ({
  setOpenDialog,
  setTakeMusic,
  deletePlaylist,
  listFunction,
  randomSequence,
  playMusic,
  handleDelete,
  setListForDrop,displaySongs, setDisplaySongs, fakeRouter, setFakeRouter, playingSong,
  setPlayingSong
}) => {
  const { displayTable } = useContext(DisplayTable);
  const { setPlaylistContext } = useContext(PlaylistContext);
  const [action, setAction] = useState("Play");

  return (
    <div className="main-div-from-not-used-list">
      <select className="choose-options" onChange={(e) => setAction(e.target.value)} value={action}>
        <option value="Play">Play</option>
        <option value="Delete">Delete</option>
        <option value="Change">Change</option>
        <option value="Rename">Rename</option>
        <option value="Drag">Drag</option>
      </select>

      <div className="not-used-playlists"><h1>List Name</h1>
        {Array.isArray(displayTable) && displayTable.length > 0 ? (
          displayTable.map((item) => (
            <div
              className="not-used-list-div" style={{display: fakeRouter === "Lists" && !displaySongs ? "block" : displaySongs === item.playlist ? "block" : "none"}}
              key={item.playlist}
              onClick={() => setDisplaySongs(item.playlist)}
              onMouseEnter={() => setListForDrop(item.playlist)}
              onTouchStart={() => setListForDrop(item.playlist)}
            >
              
              <p>{item.playlist}</p>
              <div style={{display: displaySongs === item.playlist ? "block" : "none"}}>
               <h2>List options</h2>
              <div className="list-options">
                <IconButton
                  icon="fa-solid fa-pencil"
                  onClick={() => {
                    setOpenDialog({newPlaylist: true});
                    setTakeMusic(item.playlist);
                  }}
                  text="Rename Playlist"
                />
                <IconButton
                  icon="fa-solid fa-trash"
                  onClick={() => {deletePlaylist(item.playlist), setDisplaySongs("")}}
                  text="Delete Playlist"
                />
                <IconButton
                  icon="fa-solid fa-play"
                  onClick={() => {listFunction(item),setPlayingSong("play")}}
                  text={`Play ${item.playlist} playlist`}
                  disabled={item.songs && item.songs.length < 1}
                />
                <IconButton
                  icon="fa-solid fa-shuffle"
                  onClick={() => {randomSequence(item),setPlayingSong("play")}}
                  text={`Shuffle ${item.playlist} playlist`}
                  disabled={item.songs && item.songs.length < 1}
                />
              </div>  
              </div>
             

              <table style={{display: displaySongs === item.playlist ? "block" : "none"}}>
                <thead>
                  <tr className="list-topics">
                    <th>Song</th>
                  </tr>
                </thead>
                {action === "Drag" ? (
                  <tbody>
                    {Array.isArray(item.songs) && item.songs.length > 0 ? (
                      <SortableContext
                        items={item.songs.map(
                          (song) => `${item.playlist}-${song.src}`
                        )}
                        strategy={verticalListSortingStrategy}
                      >
                        {item.songs.map((innerItem) =>
                          innerItem.name.length > 0 ? (
                            <SortableItem
                              key={`${item.playlist}-${innerItem.src}`}
                              id={`${item.playlist}-${innerItem.src}`}
                            >
                              <td className="drag-drop">
                                {/* <p className="hidden-text">
                                  {innerItem.name.length > 60
                                    ? `${innerItem.name.slice(0, 60)}...`
                                    : innerItem.name}
                                </p> */}
                                <p>
                                  {innerItem.name.length >= 40
                                    ? `${innerItem.name.slice(0, 40)}...`
                                    : innerItem.name}
                                </p>
                              </td>
                            </SortableItem>
                          ) : (
                            <tr key={innerItem.src}>
                              <td colSpan="2">Keine Daten eingetragen</td>
                            </tr>
                          )
                        )}
                      </SortableContext>
                    ) : (
                      <tr>
                        <td colSpan="2">Keine Lieder in dieser Playlist</td>
                      </tr>
                    )}
                  </tbody>
                ) : (
                  <tbody>
                    {Array.isArray(item.songs) && item.songs.length > 0 ? (
                      item.songs.map((innerItem) =>
                        innerItem.name.length > 0 ? (
                          <tr
                            key={`${item.playlist}-${innerItem.src}`}
                            id={`${item.playlist}-${innerItem.src}`}
                          >
                            <td className="show-hidden-text">
                              {/* <p className="hidden-text">
                                {innerItem.name.length > 60
                                  ? `${innerItem.name.slice(0, 60)}...`
                                  : innerItem.name}
                              </p> */}
                              <p>
                                {innerItem.name.length >= 40
                                  ? `${innerItem.name.slice(0, 40)}...`
                                  : innerItem.name}
                              </p>
                            </td>
                            <td className="music-options">
                              {action === "Play" ? (
                                <IconButton
                                  icon="fa-solid fa-play"
                                  onClick={() => {playMusic(innerItem, item),setPlayingSong("play")}}
                                  text="Play"
                                />
                              ) : null}

                              {action === "Delete" ? (
                                <IconButton
                                  icon="fa-solid fa-square-minus"
                                  onClick={() =>
                                    handleDelete(innerItem, item.playlist)
                                  }
                                  text="Delete"
                                />
                              ) : null}

                              {action === "Change" ? (
                                <IconButton
                                  icon="fa-solid fa-arrow-turn-up"
                                  onClick={() => {
                                    setTakeMusic(innerItem);
                                    setPlaylistContext(item.playlist);
                                    setOpenDialog({newMusic: true});
                                  }}
                                  text="Move"
                                />
                              ) : null}

                              {action === "Rename" ? (
                                <IconButton
                                  icon="fa-solid fa-pencil"
                                  onClick={() => {
                                    setOpenDialog({changeMusic: true});
                                    setTakeMusic({
                                      playlist: item.playlist,
                                      name: innerItem.name,
                                      src: innerItem.src,
                                    });
                                  }}
                                  text="Rename"
                                />
                              ) : null}
                            </td>
                          </tr>
                        ) : (
                          <tr key={innerItem.src}>
                            <td colSpan="2">Keine Daten eingetragen</td>
                          </tr>
                        )
                      )
                    ) : (
                      <tr>
                        <td colSpan="2">Keine Lieder in dieser Playlist</td>
                      </tr>
                    )}
                  </tbody>
                )}
              </table>
             
            </div>
          ))
        ) : (
          <p>No Playlist there!</p>
        )}
      </div>
    </div>
  );
};

export default NotUsedTables;
