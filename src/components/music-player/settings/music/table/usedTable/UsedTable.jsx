import { useContext, useState } from "react";
import IconButton from "../../../../functions/IconButton";
import CurrentList from "../../../../MusicContext/CurrentList";
import PlaylistContext from "../../../../MusicContext/PlaylistContext";

const UsedTable = ({
  setOpenDialog,
  setTakeMusic,
  deletePlaylist,
  listFunction,
  randomSequence,
  src,
  currentSongIndex,
  playMusic,
  handleDelete,
  displaySongs,
  setDisplaySongs,
  playingSong,
  setPlayingSong,
  action,
  setAction,
}) => {
  const { currentList, setCurrentList } = useContext(CurrentList);
  const { playlistContext, setPlaylistContext } = useContext(PlaylistContext);

  return (
    <div
      style={{
        display: !playingSong ? "block" : "none",
      }}
    >
      {currentList.length > 0 ? (
        currentList.map((item) => (
          <div
            key={item.playlist}
            className="current-list"
            style={{
              display:
                (!displaySongs && src.playlist === item.playlist) ||
                displaySongs === item.playlist
                  ? "block"
                  : "none",
            }}
          >
            {displaySongs !== item.playlist ? (
              <h2 onClick={() => setDisplaySongs(item.playlist)}>
                Current Playlist: {item.playlist}
              </h2>
            ) : (
              <h1>{item.playlist}</h1>
            )}

            <h1
              style={{
                display: displaySongs ? "block" : "none",
              }}
            >
              Mode: {action}
            </h1>
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
            </ul>

            <div
              style={{
                display:
                  currentList && displaySongs === item.playlist
                    ? "block"
                    : "none",
              }}
            >
              <h1>List options</h1>
              <div className="list-options">
                <IconButton
                  icon="fa-solid fa-pencil"
                  onClick={() => {
                    setOpenDialog({ newPlaylist: true }),
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
                />
                <IconButton
                  icon="fa-solid fa-shuffle"
                  onClick={() => {
                    randomSequence(item), setPlayingSong("play");
                  }}
                  text={`Shuffle ${item.playlist} playlist`}
                />
              </div>
              <table>
                <thead>
                  <tr className="list-topics-drag">
                    <th>Song</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                
                <tbody>
                  {item.songs.map((innerItem, key) =>
                    innerItem.name.length > 0 ? (
                      <tr
                        className="tr-class"
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
                              ? "#FFA500"
                              : "",
                          borderRadius: "10px",
                        }}
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
                                if (
                                  (src &&
                                    src.name &&
                                    src.name[currentSongIndex] ===
                                      innerItem.name &&
                                    src.src &&
                                    src.src[currentSongIndex] ===
                                      innerItem.src) ||
                                  (src &&
                                    src.name &&
                                    Array.isArray(src.name[currentSongIndex]) &&
                                    src.name[currentSongIndex].join(", ") ===
                                      innerItem.name &&
                                    src.src &&
                                    src.src[currentSongIndex] === innerItem.src)
                                ) {
                                  return setPlayingSong("play");
                                } else {setPlayingSong("play");
                                  playMusic(innerItem, item);
                                }
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
                            {innerItem.name.length >= 60
                              ? `${innerItem.name.slice(0, 60)}...`
                              : innerItem.name}
                          </p>
                        </td>
                      </tr>
                    ) : (
                      <tr key={key}>Keine Daten eingetragen</tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default UsedTable;
