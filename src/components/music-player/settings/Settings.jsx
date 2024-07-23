import "./settings.css"
import Music from "./music/Music";


const Settings = ({
  src,
  setSrc,
}) => {
  
  return (
    <>
      <Music src={src} setSrc={setSrc} />
    </>
  );
};

export default Settings;
