import "./settings.css"
import Music from "./music/Music";


const Settings = ({
  src,
  setSrc,fakeRouter, setFakeRouter
}) => {
  
  return (
    <>
      <Music src={src} setSrc={setSrc} fakeRouter={fakeRouter} setFakeRouter={setFakeRouter}/>
    </>
  );
};

export default Settings;
