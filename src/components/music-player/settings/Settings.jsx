import "./settings.css"
import Loop from "./loop/Loop";
import Music from "./music/Music";
import Muted from "./muted/Muted";
import Playing from "./playing/Playing";
import ProgressBar from "./progress/ProgressBar";
import Volume from "./volume/Volume";
import StopList from "./stopList/StopList";

const Settings = ({
  playing,
  setIsPlaying,

  volume,
  setVolume, 

  loop,
  setLoop,

  muted,
  setMuted,

  src,
  setSrc,

  time,
  setTime,

  duration,

  playerRef
}) => {
  
  return (
    <>
    <div className="timeline">
    <ProgressBar src={src} time={time} setTime={setTime} duration={duration} playerRef={playerRef}/>   
    </div>
      <Music src={src} setSrc={setSrc} />
    </>
  );
};

export default Settings;
