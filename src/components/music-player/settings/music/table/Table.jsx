import { useEffect, useState } from "react";
import "./table.css";
import { PlaylistChanger } from "../../dialog/Dialog";

const Table = ({ src, setSrc }) => {
  const [storage, setStorage] = useState([]);
  const [isOpen, setIsOpen] = useState(false)
  const [takeMusic, setTakeMusic] = useState([])
  const [allPlaylists, setAllPlaylists] = useState(Object.entries(localStorage).filter((item) => item[0] !== "your-music"))
console.log(allPlaylists.map((item) => item[1].split(", ")));


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

  useEffect(() => {
    displayStorage();
  }, []);

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
              <tr key={index} onClick={() => setTakeMusic(item)}>
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
                  <button onClick={() => setIsOpen((prevMode) => !prevMode)}>Verschieben</button>
                  {isOpen ? <PlaylistChanger takeMusic={takeMusic} setIsOpen={setIsOpen} src={src} setSrc={setSrc}/> : <></>}
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

    {/* {allPlaylists ?  (allPlaylists.map((item) => 
      <>
    <h2>{item[0]}</h2>
    <table>
        <thead>
          <th>Song</th>
          <th>Band</th>
          <th>Actions</th>
        </thead>
        <tbody>
          <tr>
            <td>{item[1].split()}</td>
          </tr>
        </tbody>
      </table>
      </>) ): (<></>)} */}
    </>
  );
};

export default Table;
