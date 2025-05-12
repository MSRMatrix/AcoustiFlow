import { useContext, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import DisplayTable from "../MusicContext/DisplayTable";
import IconButton from "../functions/IconButton";
import "./data.css";

const ExportImport = () => {
  const { displayTable, setDisplayTable } = useContext(DisplayTable);
  const [reload, setReload] = useState(false);
  const [fileName, setFileName] = useState("No file chosen");
  const fileInputRef = useRef(null);

  useEffect(() => {
    setReload(false);
  }, [reload]);

  const handleDownload = () => {
    const dataName = prompt("Type in the data name:");

    if (!dataName || dataName.trim().length <= 0) {
      alert("Download canceled. Please provide a valid file name.");
      return;
    }

    const data = JSON.stringify(localStorage, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = dataName || "localStorage.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);
        if (typeof importedData === "object" && importedData !== null) {
          Object.keys(importedData).forEach((key) => {
            localStorage.setItem(key, importedData[key]);
          });
          alert("Daten erfolgreich importiert!");
          setReload(true);
        } else {
          alert("Die Datei enthält keine gültigen JSON-Daten.");
        }
      } catch (error) {
        alert("Fehler beim Importieren der Datei: " + error.message);
      }
    };
    reader.readAsText(file);
    event.target.value = "";
  };

  const deleteStorage = () => {
    if (confirm("Are you sure you want to delete all data?")) {
      localStorage.clear();
      setDisplayTable([]);
      alert("Data successfully deleted!");
      setReload(true);
    } else {
      alert("Data was not deleted.");
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="data">
      <h1>Data settings</h1>
      <div
        className="data-div"
        onClick={handleDownload}
        disabled={localStorage.length <= 0}
      >
        <h2>Download data</h2>
      </div>

      <div className="data-div" onClick={triggerFileInput}>
        <h2>Import data</h2>
        <span>{fileName.length > 20 ? fileName.slice(0, 19) : fileName}</span>

        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept=".json"
          onChange={handleFileUpload}
        />
      </div>

      <div
        className="data-div"
        onClick={deleteStorage}
        disabled={localStorage.length <= 0}
      >
        <h2>Delete data</h2>
      </div>
      <NavLink className="back-link" to="/">
        Zurück
      </NavLink>
      <p>
        <b>Notice:</b> The import/export feature is not supported in IE, Safari,
        or Opera version 12 (and earlier).
      </p>
    </div>
  );
};

export default ExportImport;

// return (
//   <div className="data">
//     <div>

//     <h2>Download data</h2>
//     <IconButton
//       icon="fa-solid fa-download"
//       onClick={handleDownload}
//       disabled={localStorage.length <= 0}
//       text="Download"
//     />
// </div>
// <div>

//     <h2>Import data</h2>
//     <IconButton
//       icon="fa-solid fa-upload"
//       onClick={triggerFileInput}
//       text="Upload"
//     />
//     <span>{fileName}</span>
//     <input
//       type="file"
//       ref={fileInputRef}
//       style={{ display: "none" }}
//       accept=".json"
//       onChange={handleFileUpload}
//     />
// </div>
// <div>
// <h2>Delete data</h2>
//     <IconButton
//       icon="fa-solid fa-trash-can"
//       onClick={deleteStorage}
//       disabled={localStorage.length <= 0}
//       text="Delete"
//     />
// </div>

//     <p>
//       <b>Notice:</b> The import/export feature is not supported in IE, Safari,
//       or Opera version 12 (and earlier).
//     </p>
//     <NavLink to="/">Zurück</NavLink>
//   </div>
// );
