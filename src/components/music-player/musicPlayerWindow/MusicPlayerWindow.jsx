import { useState } from "react";
import Settings from "../settings/Settings";
import ExportImport from "../data/Data";
import Tutorial from "../../tutorial/Tutorial";

const MusicPlayerWindow = ({src,setSrc}) => {

  const [fakeRouter, setFakeRouter] = useState("")

  return (
    <div >
    <div className="home-window" style={{display: !fakeRouter ? "block" : "none"}}>
      
      <h1>Menu</h1>
      <ul>
      <li onClick={(e) => setFakeRouter(e.target.innerText)}>Lists</li>
      <li onClick={(e) => setFakeRouter(e.target.innerText)}>Add new List</li>
      <li onClick={(e) => setFakeRouter(e.target.innerText)}>Add new Music</li>
      <li onClick={(e) => setFakeRouter(e.target.innerText)}>Tutorial</li>
      <li onClick={(e) => setFakeRouter(e.target.innerText)}>Import/export data</li>
      <li onClick={(e) => setFakeRouter(e.target.innerText)}>Settings</li>  
      </ul>
      </div>
       <Settings src={src} setSrc={setSrc} fakeRouter={fakeRouter} setFakeRouter={setFakeRouter}/>
       <ExportImport fakeRouter={fakeRouter} setFakeRouter={setFakeRouter}/>
       <Tutorial fakeRouter={fakeRouter} setFakeRouter={setFakeRouter}/>
    </div>
  );
};

export default MusicPlayerWindow;
