import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const ExportImport = () => {

  const [reload, setReload] = useState(false)

  useEffect(() => {
    setReload(false)
  },[reload])

  const handleDownload = () => {
    const data = JSON.stringify(localStorage, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "localStorage.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);
        if (typeof importedData === "object" && importedData !== null) {
          Object.keys(importedData).forEach((key) => {
            localStorage.setItem(key, importedData[key]);
          });
          alert("Daten erfolgreich importiert!");
          setReload(true)
         
        } else {
          alert("Die Datei enthält keine gültigen JSON-Daten.");
        }
      } catch (error) {
        alert("Fehler beim Importieren der Datei: " + error.message);
      }
    };
    reader.readAsText(file); 
    event.target.value = ""
  };

  const deleteStorage = () => {
    if(confirm("Möchtest du alle Daten löschen?")){
      localStorage.clear()
      alert("Daten erfolgreich gelöscht!")
      setReload(true)
      return
    }else{
      alert("Daten wurden nicht gelöscht!")
      return
    }
  }

  return (
    <>
      <h2>Alle Daten herunterladen</h2>
      <button onClick={handleDownload}>Download Daten</button>
      <h2>Daten importieren</h2>
      <input type="file" accept=".json" onChange={handleFileUpload} />
      <p>
        <b>Hinweis:</b> Der Import/Export wird in IE, Safari oder Opera Version 12 (und früher) nicht unterstützt.
      </p>
    <h2>Daten löschen</h2>
     {localStorage.length > 0 ? <button onClick={deleteStorage}>Löschen</button> : <p>Keine Daten zum löschen</p>}

     <NavLink to="/music-player">Zurück</NavLink>
    </>
  );
};

export default ExportImport;
