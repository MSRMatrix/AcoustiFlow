import { useContext } from "react";
import IconButton from "../../../../functions/IconButton";
import CurrentList from "../../../../MusicContext/CurrentList";
import PlaylistContext from "../../../../MusicContext/PlaylistContext";

const UsedTable = ({
  setOpenChangePlaylistName,
  setTakeMusic,
  deletePlaylist,
  listFunction,
  randomSequence,
  src,
  currentSongIndex,
  playMusic,
  handleDelete,
  setIsOpen,
  setOpenEditWindow,
}) => {
  const { currentList, setCurrentList } = useContext(CurrentList);
  const { playlistContext, setPlaylistContext } = useContext(PlaylistContext);

  return (
    <div>
      {currentList.length > 0 ? (
        currentList.map((item) => (
          <div key={item.playlist} className="current-list">
            <h2>Current Playlist: {item.playlist}</h2>
            <h2>List options</h2>
            <div className="list-options">
              <IconButton
                icon="fa-solid fa-pencil"
                onClick={() => {
                  setOpenChangePlaylistName(true), setTakeMusic(item.playlist);
                }}
                text="Rename Playlist"
              />
              <IconButton
                icon="fa-solid fa-trash"
                onClick={() => deletePlaylist(item.playlist)}
                text="Delete Playlist"
              />
              <IconButton
                icon="fa-solid fa-play"
                onClick={() => listFunction(item)}
                text={`Play ${item.playlist} playlist`}
              />
              <IconButton
                icon="fa-solid fa-shuffle"
                onClick={() => randomSequence(item)}
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
                            ? "#2d41f5"
                            : "",
                        borderRadius: "10px",
                      }}
                    >
                      <td className="show-hidden-text">
                        <p className="hidden-text">
                          {innerItem.name.length > 60
                            ? `${innerItem.name.slice(0, 60)}...`
                            : innerItem.name}
                        </p>
                        {innerItem.name.length >= 60
                          ? `${innerItem.name.slice(0, 60)}...`
                          : innerItem.name}
                      </td>
                      <td className="music-options-drag">
                        <IconButton
                          icon="fa-solid fa-play"
                          onClick={() => playMusic(innerItem, item)}
                          text="Play"
                          disabled={
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
                              ? true
                              : false
                          }
                        />
                        <IconButton
                          icon="fa-solid fa-square-minus"
                          onClick={() => handleDelete(innerItem, item.playlist)}
                          text="Delete"
                          disabled={
                            src.src && src.src.length <= 1 ? true : false
                          }
                        />
                        <IconButton
                          icon="fa-solid fa-arrow-turn-up"
                          onClick={() => {
                            setTakeMusic(innerItem);
                            setPlaylistContext(item.playlist);
                            setIsOpen(true);
                          }}
                          text="Move"
                        />
                        <IconButton
                          icon="fa-solid fa-pencil"
                          onClick={() => {
                            setOpenEditWindow(true);
                            setTakeMusic({
                              playlist: item.playlist,
                              name: innerItem.name,
                              src: innerItem.src,
                            });
                          }}
                          text="Rename"
                        />
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
    </div>
  );
};

export default UsedTable;
