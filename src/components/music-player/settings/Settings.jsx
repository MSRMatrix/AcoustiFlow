import Loop from "./loop/Loop";
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
}) => {
  return (
    <>
      <Playing playing={playing} setIsPlaying={setIsPlaying} />
      <Loop loop={loop} setLoop={setLoop} />
      <Muted muted={muted} setMuted={setMuted} />
      <PlaybackRate
        plackbackRate={plackbackRate}
        setPlaybackRate={setPlaybackRate}
      />
      <Volume volume={volume} setVolume={setVolume} />
    </>
  );
};

export default Settings;
