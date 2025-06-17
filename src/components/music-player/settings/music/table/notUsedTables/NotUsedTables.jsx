import { act, useContext, useState } from "react";
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
  setListForDrop,
  displaySongs,
  setDisplaySongs,
  fakeRouter,
  setFakeRouter,
  playingSong,
  setPlayingSong,
  action,
  setAction,
}) => {
  const { displayTable } = useContext(DisplayTable);
  const { setPlaylistContext } = useContext(PlaylistContext);
  

  return (
    <div className="main-div-from-not-used-list">
      <div className="not-used-playlists">
        {Array.isArray(displayTable) && displayTable.length > 0 ? (
          displayTable.map((item) => (
            <div
              className="not-used-list-div"
              style={{
                display:
                  fakeRouter === "Lists" && !displaySongs
                    ? "block"
                    : displaySongs === item.playlist
                    ? "block"
                    : "none",
              }}
              key={item.playlist}
              onClick={() => setDisplaySongs(item.playlist)}
              onMouseEnter={() => setListForDrop(item.playlist)}
              onTouchStart={() => setListForDrop(item.playlist)}
            >
              {!displaySongs ? (
                <p>{item.playlist}</p>
              ) : (
                <h1>{item.playlist}</h1>
              )}

              <h2
                style={{
                  display: displaySongs ? "block" : "none",
                }}
              >
                Mode: {action}
              </h2>
              <ul
                className="music-options"
                style={{
                  display: displaySongs ? "flex" : "none",
                }}
              >
                <li onClick={(e) => setAction(e.target.textContent)}>Play</li>
                <li onClick={(e) => setAction(e.target.textContent)}>Delete</li>
                <li onClick={(e) => setAction(e.target.textContent)}>Change</li>
                <li onClick={(e) => setAction(e.target.textContent)}>Rename</li>
                <li onClick={(e) => setAction(e.target.textContent)}>Drag</li>
              </ul>
              <div
                style={{
                  display: displaySongs === item.playlist ? "block" : "none",
                }}
              >
                <h2>List options</h2>
                <div className="list-options">
                  <IconButton
                    icon="fa-solid fa-pencil"
                    onClick={() => {
                      setOpenDialog({ newPlaylist: true });
                      setTakeMusic(item.playlist);
                    }}
                    text="Rename Playlist"
                  />
                  <IconButton
                    icon="fa-solid fa-trash"
                    onClick={() => {
                      deletePlaylist(item.playlist), setDisplaySongs("");
                    }}
                    text="Delete Playlist"
                    disabled={localStorage.length <= 1}
                  />
                  <IconButton
                    icon="fa-solid fa-play"
                    onClick={() => {
                      listFunction(item), setPlayingSong("play");
                    }}
                    text={`Play ${item.playlist} playlist`}
                    disabled={item.songs && item.songs.length < 1}
                  />
                  <IconButton
                    icon="fa-solid fa-shuffle"
                    onClick={() => {
                      randomSequence(item), setPlayingSong("play");
                    }}
                    text={`Shuffle ${item.playlist} playlist`}
                    disabled={item.songs && item.songs.length <= 1}
                  />
                </div>
              </div>

              <table
                style={{
                  display: displaySongs === item.playlist ? "block" : "none",
                }}
              >
                <thead>
                  <tr className="list-topics">
                    <th>Song</th>
                  </tr>
                </thead>
                {action === "Drag" ? (
                  <tbody className="tbody">
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
                              <p
                                onClick={() => {
                                  if (action === "Play") {
                                    playMusic(innerItem, item); setPlayingSong("play")
                                  } else if (action === "Delete") {
                                    handleDelete(innerItem, item.playlist);
                                  } else if (action === "Drag") {
                                    setTakeMusic(innerItem);
                                    setPlaylistContext(item.playlist);
                                    setOpenDialog({ newMusic: true });
                                  } else if (action === "Rename") {
                                    setTakeMusic({
                                      playlist: item.playlist,
                                      name: innerItem.name,
                                      src: innerItem.src,
                                    });
                                    setOpenDialog({ changeMusic: true });
                                  }
                                }}
                              >
                                {innerItem.name.length >= 40
                                  ? `${innerItem.name.slice(0, 40)}...`
                                  : innerItem.name}
                              </p>
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
        ) : (<></>
        )}
      </div>
    </div>
  );
};

export default NotUsedTables;
