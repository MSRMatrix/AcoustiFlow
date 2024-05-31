import { useEffect, useState } from "react";
import "./table.css";
import { PlaylistChanger } from "../../dialog/Dialog";

const Table = ({ src, setSrc }) => {
  const [storage, setStorage] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [takeMusic, setTakeMusic] = useState([]);
  const [allPlaylists, setAllPlaylists] = useState([]);
  const [list, setlist] = useState([])

  useEffect(() => {
    displayStorage();
    const playlists = Object.entries(localStorage)
    .filter((item) => item[0] !== "your-music")
    .map((item) => {
      const songsArray = item[1].split(", ").reduce((acc, curr, index, array) => {
        if (index % 3 === 0) {
          const song = {
            name: array[index],
            band: array[index + 1],
            src: array[index + 2],
          };
          acc.push(song);
        }
        return acc;
      }, []);
      return { playlist: item[0], songs: songsArray };
    });
  setAllPlaylists(playlists);
  }, []);

  const displayStorage = () => {
    if (localStorage.getItem("your-music")) {
      const storageData = localStorage.getItem("your-music").split(", ");
      const organizedData = [];
      for (let i = 0; i < storageData.length; i += 3) {
        const name = storageData[i];
        const band = storageData[i + 1];
        const src = storageData[i + 2];

        organizedData.push({ name, band, src });
      }
      setStorage(organizedData);
    }
  };

  const handleDelete = (item) => {
    const storedData = localStorage.getItem("your-music");
    if (storedData) {
      const parsedData = storedData.split(", ");
      const updatedData = [];
      for (let i = 0; i < parsedData.length; i += 3) {
        if (parsedData[i] !== item.name || parsedData[i + 1] !== item.band || parsedData[i + 2] !== item.src) {
          updatedData.push(parsedData[i], parsedData[i + 1], parsedData[i + 2]);
        }
      }
      localStorage.setItem("your-music", updatedData.join(", "));
      displayStorage();
    }
  };

  const listFunction = (list) => {
    setSrc({src: list.songs.map((item) => item.src.split(","))})
  }

  const deletePlaylist = (playlist) => {
    const list = playlist
    console.log(list);
    if(confirm(`Do you want to delete ${list}?`)){
      localStorage.removeItem(list)
      alert(`${list} was sucessfully deleted`)
    } else{
      alert(`You stopped the delete of ${list}`)
    }
  }
  
  const randomSequence = (list) => {
    const arrayList = list.songs.map((item) => item.src);
    console.log("Original arrayList:", arrayList);
    
    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };
    
    const randomSequence = shuffleArray(arrayList);
    const finalArray = randomSequence.map((item) => [item])
    setSrc({src: finalArray})
  }


  return (
    <>
      <table className="default-table">
        <thead>
          <tr>
            <th>Song</th>
            <th>Band</th>
            <th>Actions</th>
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
                  <button onClick={() => {
                    setTakeMusic(item);
                    setIsOpen(true);
                  }}>Verschieben</button>
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
      {isOpen && <PlaylistChanger takeMusic={takeMusic} setIsOpen={setIsOpen} src={src} setSrc={setSrc} />}

       {allPlaylists ? allPlaylists.map((item) => (
     <> <h2>{item.playlist}</h2>
     <button onClick={() => deletePlaylist(item.playlist)}>Delete List</button>
     <button onClick={() =>listFunction(item)}>Play the list</button>
     <button onClick={() => randomSequence(item)}>Random Sequence</button>
  <table>
        <thead>
          <tr>
            <th>Song</th>
            <th>Band</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {item.songs.map((innerItem, key) => (
          innerItem.name.length > 0 ? (<tr key={innerItem.src}>
              <td>{innerItem.name}</td>
              <td>{innerItem.band}</td>
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
          </tr>) : <tr key={key}>Keine Daten eingetragen</tr>
        ))}
        </tbody>
      </table> </>)) : <p>Sie haben noch keine Liste angelegt!</p>} 
    </>
  );
};

export default Table;
