import Loop from "./loop/Loop";
import Music from "./music/Music";
import Muted from "./muted/Muted";
import PlaybackRate from "./playbackRate/PlaybackRate";
import Playing from "./playing/Playing";
import ProgressBar from "./progress/ProgressBar";
import Volume from "./volume/Volume";

const Settings = ({
  playing,
  setIsPlaying,

  volume,
  setVolume, 

  loop,
  setLoop,

  muted,
  setMuted,

  plackbackRate,
  setPlaybackRate,

  src,
  setSrc,
}) => {
  return (
    <>
      <Playing playing={playing} setIsPlaying={setIsPlaying} src={src} setSrc={setSrc}/>
      <Loop loop={loop} setLoop={setLoop} />
      <Muted muted={muted} setMuted={setMuted} />
      <PlaybackRate plackbackRate={plackbackRate} setPlaybackRate={setPlaybackRate} />
      <Volume muted={muted} volume={volume} setVolume={setVolume} />
      <ProgressBar />
      <Music src={src} setSrc={setSrc} />
    </>
  );
};

export default Settings;
