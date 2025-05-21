import "./settings.css"
import Music from "./music/Music";


const Settings = ({
  src,
  setSrc,fakeRouter, setFakeRouter, oldIndex, playbackRate, muted, time, setTime, duration, playerRef
}) => {
  
  return (
    <>
      <Music src={src} setSrc={setSrc} fakeRouter={fakeRouter} setFakeRouter={setFakeRouter}oldIndex={oldIndex} 
      playbackRate={playbackRate} 
      muted={muted} 
      time={time} 
      setTime={setTime} 
      duration={duration} 
      playerRef={playerRef}/>
    </>
  );
};

export default Settings;
