import Loop from "./loop/Loop";
import Music from "./music/Music";
import Muted from "./muted/Muted";
import PlaybackRate from "./playbackRate/PlaybackRate";
import Playing from "./playing/Playing";
import Volume from "./volume/Volume";

const Settings = ({
  playing,
  setIsPlaying,

  setVolume,
  volume,

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
      <Playing playing={playing} setIsPlaying={setIsPlaying} />
      <Loop loop={loop} setLoop={setLoop} />
      <Muted muted={muted} setMuted={setMuted} />
      <PlaybackRate plackbackRate={plackbackRate} setPlaybackRate={setPlaybackRate} />
      <Volume volume={volume} setVolume={setVolume} />
      <Music src={src} setSrc={setSrc} />
    </>
  );
};

export default Settings;
