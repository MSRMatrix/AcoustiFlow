import { useContext } from "react";
import IconButton from "../../../../functions/IconButton";
import DisplayTable from "../../../../MusicContext/DisplayTable";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import PlaylistContext from "../../../../MusicContext/PlaylistContext";

const NotUsedTables = ({
  setOpenChangePlaylistName,
  setTakeMusic,
  deletePlaylist,
  listFunction,
  randomSequence,
  playMusic,
  handleDelete,
  setIsOpen,
  setOpenEditWindow,
  changeIndex,
}) => {
  const { displayTable, setDisplayTable } = useContext(DisplayTable);
  const { playlistContext, setPlaylistContext } = useContext(PlaylistContext);

  return (
    <div>
      <div className="not-used-playlists">
        {displayTable.length > 0 ? (
          displayTable.map((item) => (
            <div key={item.playlist}>
              <h2>List name: {item.playlist}</h2>
              <h2>List options</h2>
              <div className="list-options">
                <IconButton
                  icon="fa-solid fa-pencil"
                  onClick={() => {
                    setOpenChangePlaylistName(true),
                      setTakeMusic(item.playlist);
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
                  disabled={item.songs && item.songs.length < 1 ? true : false}
                />
                <IconButton
                  icon="fa-solid fa-shuffle"
                  onClick={() => randomSequence(item)}
                  text={`Shuffle ${item.playlist} playlist`}
                  disabled={item.songs && item.songs.length < 1 ? true : false}
                />
              </div>

              <table>
                <thead>
                  <tr>
                    <th>Song</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <SortableContext
                    items={item.songs}
                    strategy={verticalListSortingStrategy}
                  >
                    {item.songs.map((innerItem, key) =>
                      innerItem.name.length > 0 ? (
                        <tr key={innerItem.src}>
                          <td
                            className="show-hidden-text"
                            onClick={() => playMusic(innerItem, item)}
                          >
                            <p className="hidden-text">
                              {innerItem.name.length > 60
                                ? `${innerItem.name.slice(0, 60)}...`
                                : innerItem.name}
                            </p>
                            {innerItem.name.length >= 40
                              ? `${innerItem.name.slice(0, 40)}...`
                              : innerItem.name}
                          </td>
                          <td className="music-options">
                            <IconButton
                              icon="fa-solid fa-square-minus"
                              onClick={() =>
                                handleDelete(innerItem, item.playlist)
                              }
                              text="Delete"
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
                            <IconButton
                              icon="fa-solid fa-arrow-right-arrow-left"
                              onClick={() => {
                                changeIndex(
                                  item.playlist,
                                  innerItem.name,
                                  innerItem.src
                                );
                              }}
                              text="Change place"
                              disabled={item.songs.length > 1 ? false : true}
                            />
                          </td>
                        </tr>
                      ) : (
                        <tr key={key}>Keine Daten eingetragen</tr>
                      )
                    )}
                  </SortableContext>
                </tbody>
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
