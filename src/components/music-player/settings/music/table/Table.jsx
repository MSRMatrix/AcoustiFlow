import { useContext, useEffect, useState } from "react";
import "./table.css";
import { PlaylistChanger } from "../../dialog/Dialog";
import { newestList } from "../../../functions/NewestList";
import DisplayTable from "../../../MusicContext/DisplayTable";
import { displayStorage } from "../../../functions/DisplayStorage";
import Storage from "../../../MusicContext/Storage";

const Table = ({ src, setSrc }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [takeMusic, setTakeMusic] = useState([]);
  const {displayTable, setDisplayTable} = useContext(DisplayTable)
  const {storage, setStorage} = useContext(Storage)

  useEffect(() => {
    displayStorage(setStorage);
    newestList(setDisplayTable);
  }, []);

  const handleDelete = (item) => {
    const storedData = localStorage.getItem("your-music");
    
    if (storedData) {
      const parsedData = storedData.split(", ");
      const updatedData = [];
      for (let i = 0; i < parsedData.length; i += 3) {
        if(parsedData.length <= 3){
         localStorage.setItem("your-music", "")
         setStorage([])
         return
        }
        if (
          parsedData[i] !== item.name ||
          parsedData[i + 1] !== item.band ||
          parsedData[i + 2] !== item.src
        ) {
          updatedData.push(parsedData[i], parsedData[i + 1], parsedData[i + 2]);
        }
        
      }
      localStorage.setItem("your-music", updatedData.join(", "));
      displayStorage(setStorage);
    }
  };

  const listFunction = (list) => {
    setSrc({ src: list.songs.map((item) => item.src.split(",")) });
  };

  const deletePlaylist = (playlist) => {
    if (confirm(`Möchten Sie die Playlist "${playlist}" löschen?`)) {
      localStorage.removeItem(playlist);
      alert(`Die Playlist "${playlist}" wurde erfolgreich gelöscht.`);
      newestList(setDisplayTable);
    } else {
      alert(`Die Löschung der Playlist "${playlist}" wurde abgebrochen.`);
    }
  };

  const randomSequence = (list) => {
    const arrayList = list.songs.map((item) => item.src);
    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    const randomSequence = shuffleArray(arrayList);
    const finalArray = randomSequence.map((item) => [item]);
    setSrc({ src: finalArray });
  };

  return (
    <>
      <table className="default-table">
        <thead>
          <tr>
            <th>Song</th>
            <th>Band</th>
            <th>Aktionen</th>
          </tr>
        </thead>
        <tbody>
          {storage.length > 0 ? (
            storage.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.band}</td>
                <td>
                  <button
                    onClick={() =>
                      setSrc({
                        src: item.src,
                        name: item.name,
                        band: item.band,
                      })
                    }
                  >
                    Abspielen
                  </button>
                  <button onClick={() => handleDelete(item)}>Löschen</button>
                  <button
                    onClick={() => {
                      setTakeMusic(item);
                      setIsOpen(true);
                    }}
                  >
                    Verschieben
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">Du hast noch keine Daten gespeichert!</td>
            </tr>
          )}
        </tbody>
      </table>

      {isOpen && (
        <PlaylistChanger
          takeMusic={takeMusic}
          setIsOpen={setIsOpen}
          src={src}
          setSrc={setSrc}
        />
      )}

      {displayTable.length > 0 ? (
        displayTable.map((item) => (
          <div key={item.playlist}>
            <h2>{item.playlist}</h2>
            <button onClick={() => deletePlaylist(item.playlist)}>
              Playlist löschen
            </button>
            <button onClick={() => listFunction(item)}>
              Playlist abspielen
            </button>
            <button onClick={() => randomSequence(item)}>
              Zufällige Reihenfolge
            </button>
            <table>
              <thead>
                <tr>
                  <th>Song</th>
                  <th>Band</th>
                  <th>Aktionen</th>
                </tr>
              </thead>
              <tbody>
                {item.songs.map((innerItem, key) =>
                  innerItem.name.length > 0 ? (
                    <tr key={innerItem.src}>
                      <td>{innerItem.name}</td>
                      <td>{innerItem.band}</td>
                      <td>
                        <button
                          onClick={() =>
                            setSrc({
                              src: innerItem.src,
                              name: innerItem.name,
                              band: innerItem.band,
                            })
                          }
                        >
                          Abspielen
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
        <p>Sie haben noch keine Liste angelegt!</p>
      )}
    </>
  );
};

export default Table;
