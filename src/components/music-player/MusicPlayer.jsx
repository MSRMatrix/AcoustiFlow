import React, { useState } from "react";
import ReactPlayer from "react-player";
import "./musicPlayer.css";
import Settings from "./settings/Settings";

const src =
  "https://www.youtube.com/watch?v=C6PNc9KN50M&ab_channel=RewindMusic";

const MusicPlayer = () => {
  const [playing, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.05);
  const [loop, setLoop] = useState(false);
  const [muted, setMuted] = useState(false);
  const [plackbackRate, setPlaybackRate] = useState(1);
  return (
    <>
      <div className="player-container">
        <ReactPlayer
          url={src}
          controls
          playing={playing}
          volume={volume}
          loop={loop}
          muted={muted}
          playbackRate={plackbackRate}
        />
      </div>
      <Settings
        playing={playing}
        setIsPlaying={setIsPlaying}
        volume={volume}
        setVolume={setVolume}
        loop={loop}
        setLoop={setLoop}
        muted={muted}
        setMuted={setMuted}
        plackbackRate={plackbackRate}
        setPlaybackRate={setPlaybackRate}
      />
    </>
  );
};

export default MusicPlayer;
