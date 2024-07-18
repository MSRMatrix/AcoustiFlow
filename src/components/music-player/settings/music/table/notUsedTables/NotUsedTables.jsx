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
  setOpenChangePlaylistName,
  setTakeMusic,
  deletePlaylist,
  listFunction,
  randomSequence,
  playMusic,
  handleDelete,
  setIsOpen,
  setOpenEditWindow,
  setDrag,
  setListForDrop
}) => {
  const { displayTable } = useContext(DisplayTable);
  const { setPlaylistContext } = useContext(PlaylistContext);

  return (
    <div>
      <div className="not-used-playlists">
        {Array.isArray(displayTable) && displayTable.length > 0 ? (
          displayTable.map((item) => (
            <div key={item.playlist} onMouseEnter={() => setListForDrop(item.playlist)} onMouseLeave={() => setListForDrop(null)} >
              <h2>List name: {item.playlist}</h2>
              <h2>List options</h2>
              <div className="list-options">
                <IconButton
                  icon="fa-solid fa-pencil"
                  onClick={() => {
                    setOpenChangePlaylistName(true);
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
                  disabled={item.songs && item.songs.length < 1}
                />
                <IconButton
                  icon="fa-solid fa-shuffle"
                  onClick={() => randomSequence(item)}
                  text={`Shuffle ${item.playlist} playlist`}
                  disabled={item.songs && item.songs.length < 1}
                />
              </div>

              <table>
                <thead>
                  <tr>
                    <th>Song</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody onMouseEnter={() => setDrag(false)} onTouchEnd={() => setDrag(false)}>
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
                            <td
                              className="show-hidden-text"
                              onClick={() => (playMusic(innerItem, item))}
                            >
                              <p className="hidden-text">
                                {innerItem.name.length > 60
                                  ? `${innerItem.name.slice(0, 60)}...`
                                  : innerItem.name}
                              </p>
                              <p onMouseEnter={() => setDrag(false)}>
                                {innerItem.name.length >= 40
                                  ? `${innerItem.name.slice(0, 40)}...`
                                  : innerItem.name}
                              </p>
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
                              <td
                                onMouseEnter={() => setDrag(true)}
                                onMouseLeave={() => setDrag(false)}
                                onTouchStart={() => setDrag(true)}
                                onTouchEnd={() => setDrag(false)}
                                style={{ touchAction: "none" }}
                              >
                                <IconButton
                                  icon="fa-solid fa-arrow-right-arrow-left"
                                  text="Change place"
                                  disabled={
                                    innerItem.src.length < 1 ? true : false
                                  }
                                />
                              </td>
                            </td>
                          </SortableItem>
                        ) : (
                          <tr key={innerItem.src}>Keine Daten eingetragen</tr>
                        )
                      )}
                    </SortableContext>
                  ) : (
                    <tr>
                      <td colSpan="2">Keine Lieder in dieser Playlist</td>
                    </tr>
                  )}
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
